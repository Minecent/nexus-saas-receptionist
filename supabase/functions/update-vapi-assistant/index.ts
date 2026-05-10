import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const VAPI_API = 'https://api.vapi.ai'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type' } })
  }

  try {
    const vapiKey = Deno.env.get('VAPI_API_KEY')
    if (!vapiKey) throw new Error('VAPI_API_KEY not set')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { user_id } = await req.json()
    if (!user_id) return new Response(JSON.stringify({ error: 'user_id required' }), { status: 400 })

    const { data: config } = await supabase
      .from('agent_config')
      .select('*')
      .eq('user_id', user_id)
      .single()

    if (!config?.vapi_assistant_id) {
      return new Response(JSON.stringify({ skipped: 'no assistant yet' }), { status: 200 })
    }

    const systemPrompt = buildSystemPrompt(config)

    const voice = resolveVoice(config.selected_voice_id as string | null)

    const n8nUrl = Deno.env.get('N8N_CALL_TOOLS_URL') ?? ''

    const res = await fetch(`${VAPI_API}/assistant/${config.vapi_assistant_id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${vapiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${config.business_name ?? 'NEXUS'} — ${config.agent_name ?? 'AVA'}`,
        model: {
          provider: 'openai',
          model: 'gpt-4o-mini',
          systemPrompt,
          tools: buildTools(n8nUrl),
        },
        voice,
        firstMessage: config.agent_greeting || `Thank you for calling ${config.business_name ?? 'us'}. How can I help you today?`,
        serverUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/vapi-webhook`,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Vapi PATCH failed: ${err}`)
    }

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('[update-vapi-assistant]', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})

function buildTools(n8nUrl: string) {
  if (!n8nUrl) return []
  const server = { url: n8nUrl }
  return [
    {
      type: 'function', server,
      function: {
        name: 'book_appointment',
        description: 'Book an appointment or service request for the caller — creates a calendar event',
        parameters: {
          type: 'object',
          properties: {
            caller_name:    { type: 'string', description: 'Full name of the caller' },
            caller_phone:   { type: 'string', description: 'Phone number of the caller' },
            caller_email:   { type: 'string', description: 'Email address of the caller (if provided)' },
            preferred_time: { type: 'string', description: "ISO 8601 timestamp in the caller's local timezone. Format: YYYY-MM-DDTHH:MM:SS±HH:MM. Example: 2026-05-11T14:00:00-05:00. You MUST convert relative phrases ('tomorrow', 'next Monday', 'in two days', 'this Friday morning') into a concrete ISO timestamp using today's date as reference. If the caller is ambiguous about date or AM/PM, ask a clarifying question before calling this tool." },
            service_type:   { type: 'string', description: 'Type of service or appointment requested' },
            notes:          { type: 'string', description: 'Any additional notes or special requests' },
          },
          required: ['caller_name', 'preferred_time'],
        },
      },
    },
    {
      type: 'function', server,
      function: {
        name: 'check_availability',
        description: 'Check whether a specific date and time is available for an appointment',
        parameters: {
          type: 'object',
          properties: {
            requested_time: { type: 'string', description: 'ISO 8601 timestamp to check (YYYY-MM-DDTHH:MM:SS±HH:MM). Convert any relative date references into a concrete timestamp before calling this tool.' },
          },
          required: ['requested_time'],
        },
      },
    },
    {
      type: 'function', server,
      function: {
        name: 'cancel_appointment',
        description: 'Cancel an existing appointment for the caller',
        parameters: {
          type: 'object',
          properties: {
            caller_phone: { type: 'string', description: 'Phone number of the caller whose appointment should be cancelled' },
          },
          required: ['caller_phone'],
        },
      },
    },
    {
      type: 'function', server,
      function: {
        name: 'reschedule_appointment',
        description: 'Reschedule an existing appointment to a new date and time',
        parameters: {
          type: 'object',
          properties: {
            caller_phone:       { type: 'string', description: 'Phone number of the caller whose appointment should be rescheduled' },
            new_requested_time: { type: 'string', description: 'ISO 8601 timestamp for the new appointment time (YYYY-MM-DDTHH:MM:SS±HH:MM). Convert any relative date references into a concrete timestamp before calling this tool.' },
          },
          required: ['caller_phone', 'new_requested_time'],
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
            reason:       { type: 'string', description: 'Reason for the callback request' },
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

// Maps our UI voice IDs to OpenAI TTS voices (always available, no credentials needed)
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

function buildSystemPrompt(config: Record<string, unknown>): string {
  const name = (config.agent_name as string) ?? 'AVA'
  const business = (config.business_name as string) ?? 'this business'
  const industry = (config.business_industry as string) ?? ''
  const personality = (config.agent_personality as string) ?? 'Professional and friendly'
  const instructions = (config.agent_instructions as string) ?? ''
  const services = (config.services_offered as string) ?? ''
  const hours = config.business_hours ? JSON.stringify(config.business_hours) : null
  const tz = (config.timezone as string) ?? 'America/New_York'
  const apptDuration = (config.appointment_duration_minutes as number) ?? 30

  return [
    `You are ${name}, the AI receptionist for ${business}${industry ? ` (${industry})` : ''}.`,
    `Personality: ${personality}.`,
    instructions ? `Instructions: ${instructions}` : '',
    services ? `Services offered: ${services}` : '',
    hours ? `Business hours (${tz}): ${hours}` : '',
    `Standard appointment duration: ${apptDuration} minutes.`,
    'Keep responses concise and professional. Never reveal that you are an AI unless directly asked.',
    'If you cannot help with something, offer to take a message or connect to a team member.',
    '',
    'TOOL USAGE RULES — follow exactly:',
    '- Use check_availability before booking to confirm the slot is free.',
    '- Before calling book_appointment, collect: full name, phone number, preferred date/time, and service type. Always include caller_name, caller_phone, preferred_time, and service_type.',
    '- Before calling take_message, collect the caller full name and their message. Always include caller_name and message.',
    '- Before calling request_callback, collect the caller full name and phone number. Always include caller_name and caller_phone.',
    '- Before calling cancel_appointment or reschedule_appointment, confirm the caller phone number.',
    '- Never call a tool with empty or missing required fields. Ask the caller for missing information first.',
    '- Always include caller_phone in every tool call if the caller has provided it.',
    '',
    'DATE/TIME HANDLING — critical:',
    '- Always convert relative date references ("tomorrow at 3pm", "next Monday morning", "this Friday") to a specific ISO 8601 timestamp before calling any tool.',
    `- Business timezone: ${tz}. Use this when converting relative times to absolute timestamps.`,
    '- If the caller does not specify AM or PM, ask for clarification before booking.',
    '- Never pass vague strings like "tomorrow" or "next week" as timestamp values — always resolve to YYYY-MM-DDTHH:MM:SS±HH:MM.',
  ].filter(Boolean).join('\n')
}
