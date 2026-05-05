import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const VAPI_API = 'https://api.vapi.ai'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type' } })
  }

  try {
    const vapiKey = Deno.env.get('VAPI_API_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    if (!vapiKey) throw new Error('VAPI_API_KEY not set')

    const { user_id } = await req.json()
    if (!user_id) return new Response(JSON.stringify({ error: 'user_id required' }), { status: 400 })

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Load customer config
    const { data: config, error: configErr } = await supabase
      .from('agent_config')
      .select('*')
      .eq('user_id', user_id)
      .single()

    if (configErr || !config) {
      return new Response(JSON.stringify({ error: 'agent_config not found' }), { status: 404 })
    }

    // Mark as provisioning
    await supabase
      .from('agent_config')
      .update({ provisioning_status: 'provisioning' })
      .eq('user_id', user_id)

    // Build system prompt from their settings
    const systemPrompt = buildSystemPrompt(config)
    const voice = resolveVoice(config.selected_voice_id as string | null)

    // Create Vapi assistant
    const assistantRes = await fetch(`${VAPI_API}/assistant`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${vapiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${config.business_name ?? 'NEXUS'} — ${config.agent_name ?? 'AVA'}`,
        model: {
          provider: 'openai',
          model: 'gpt-4o-mini',
          systemPrompt,
          tools: buildTools(Deno.env.get('N8N_CALL_TOOLS_URL') ?? ''),
        },
        voice,
        firstMessage: config.agent_greeting || `Thank you for calling ${config.business_name ?? 'us'}. How can I help you today?`,
        endCallMessage: 'Thank you for calling. Have a great day!',
        transcriber: { provider: 'deepgram', model: 'nova-2', language: 'en' },
        serverUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/vapi-webhook`,
      }),
    })

    if (!assistantRes.ok) {
      const err = await assistantRes.text()
      throw new Error(`Vapi assistant creation failed: ${err}`)
    }

    const assistant = await assistantRes.json()

    // Buy a phone number and link to assistant
    const phoneRes = await fetch(`${VAPI_API}/phone-number/buy`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${vapiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'twilio',
        areaCode: '415',   // default area code — can be made configurable
        assistantId: assistant.id,
        name: `${config.business_name ?? 'NEXUS'} main line`,
      }),
    })

    let phoneNumber: string | null = null
    let phoneNumberId: string | null = null

    if (phoneRes.ok) {
      const phone = await phoneRes.json()
      phoneNumber = phone.number
      phoneNumberId = phone.id
    }
    // Phone number provisioning failure is non-fatal — number can be assigned manually

    // Save back to Supabase
    await supabase
      .from('agent_config')
      .update({
        vapi_assistant_id: assistant.id,
        vapi_phone_number_id: phoneNumberId,
        phone_number: phoneNumber,
        provisioning_status: phoneNumber ? 'active' : 'assistant_ready',
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user_id)

    return new Response(JSON.stringify({
      success: true,
      assistant_id: assistant.id,
      phone_number: phoneNumber,
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[provision-vapi]', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})

const VOICE_MAP: Record<string, string> = {
  roger: 'onyx',
  josh: 'echo',
  larry: 'fable',
  lexi: 'nova',
  belle: 'shimmer',
  sami: 'alloy',
  sky: 'alloy',
  sarah: 'shimmer',
  marcus: 'fable',
  olivia: 'nova',
  james: 'onyx',
  alex: 'echo',
}

function resolveVoice(voiceId: string | null) {
  const openaiVoice = voiceId ? (VOICE_MAP[voiceId] ?? 'alloy') : 'alloy'
  return { provider: 'openai', voiceId: openaiVoice }
}

function buildTools(n8nUrl: string) {
  if (!n8nUrl) return []
  const server = { url: n8nUrl }
  return [
    {
      type: 'function', server,
      function: {
        name: 'book_appointment',
        description: 'Book an appointment or service request for the caller',
        parameters: {
          type: 'object',
          properties: {
            caller_name:    { type: 'string', description: 'Full name of the caller' },
            caller_phone:   { type: 'string', description: 'Phone number of the caller' },
            preferred_time: { type: 'string', description: 'Preferred date and time for the appointment' },
            service_type:   { type: 'string', description: 'Type of service or appointment requested' },
          },
          required: ['caller_name', 'preferred_time'],
        },
      },
    },
    {
      type: 'function', server,
      function: {
        name: 'take_message',
        description: 'Take a message from the caller to pass on to the business',
        parameters: {
          type: 'object',
          properties: {
            caller_name:  { type: 'string', description: 'Full name of the caller' },
            caller_phone: { type: 'string', description: 'Phone number of the caller' },
            message:      { type: 'string', description: 'The message to pass on' },
          },
          required: ['caller_name', 'message'],
        },
      },
    },
    {
      type: 'function', server,
      function: {
        name: 'request_callback',
        description: 'Log a callback request when the caller wants to be called back',
        parameters: {
          type: 'object',
          properties: {
            caller_name:  { type: 'string', description: 'Full name of the caller' },
            caller_phone: { type: 'string', description: 'Phone number to call back' },
          },
          required: ['caller_name'],
        },
      },
    },
    {
      type: 'function', server,
      function: {
        name: 'check_hours',
        description: 'Check the business opening hours',
        parameters: { type: 'object', properties: {}, required: [] },
      },
    },
  ]
}

function buildSystemPrompt(config: Record<string, unknown>): string {
  const name = (config.agent_name as string) ?? 'AVA'
  const business = (config.business_name as string) ?? 'this business'
  const industry = (config.business_industry as string) ?? ''
  const personality = (config.agent_personality as string) ?? 'Professional and friendly'
  const instructions = (config.agent_instructions as string) ?? ''
  const hours = config.business_hours ? JSON.stringify(config.business_hours) : null
  const tz = (config.timezone as string) ?? 'America/New_York'

  return [
    `You are ${name}, the AI receptionist for ${business}${industry ? ` (${industry})` : ''}.`,
    `Personality: ${personality}.`,
    instructions ? `Instructions: ${instructions}` : '',
    hours ? `Business hours (${tz}): ${hours}` : '',
    'Keep responses concise and professional. Never reveal that you are an AI unless directly asked.',
    'If you cannot help with something, offer to take a message or connect to a team member.',
    '',
    'TOOL USAGE RULES — follow exactly:',
    '- Before calling book_appointment, you MUST collect: full name, preferred date/time, and reason/service. Always include caller_name, preferred_time, and service_type in the tool call arguments.',
    '- Before calling take_message, collect the caller full name and their message. Always include caller_name and message in the arguments.',
    '- Before calling request_callback, collect the caller full name and phone number. Always include caller_name and caller_phone in the arguments.',
    '- Never call a tool with empty or missing required fields. Ask the caller for missing information before calling the tool.',
    '- Always include caller_phone in every tool call if the caller has provided it.',
  ].filter(Boolean).join('\n')
}
