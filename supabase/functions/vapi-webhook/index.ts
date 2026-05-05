import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type' } })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const body = await req.json()
    const msg = body?.message
    if (!msg) return ok()

    const type: string = msg.type
    const call = msg.call ?? msg

    // Only process end-of-call reports and status updates
    if (!['end-of-call-report', 'call.ended', 'status-update'].includes(type)) return ok()

    const vapiCallId: string = call.id
    const assistantId: string = call.assistantId

    if (!vapiCallId || !assistantId) return ok()

    // Look up which customer owns this assistant
    const { data: config } = await supabase
      .from('agent_config')
      .select('user_id')
      .eq('vapi_assistant_id', assistantId)
      .single()

    if (!config?.user_id) {
      console.warn('[vapi-webhook] unknown assistantId', assistantId)
      return ok()
    }

    const userId = config.user_id

    // Parse call data
    const callerNumber: string | null = call.customer?.number ?? null
    const startedAt: string | null = call.startedAt ?? null
    const endedAt: string | null = call.endedAt ?? null
    const durationSeconds: number = msg.durationSeconds ?? call.durationSeconds ?? 0
    const transcript: string | null = call.transcript ?? msg.transcript ?? null
    const summary: string | null = call.summary ?? msg.summary ?? null
    const recordingUrl: string | null = call.recordingUrl ?? null
    const endedReason: string = msg.endedReason ?? call.endedReason ?? 'unknown'
    const costCents: number = Math.round((call.cost ?? call.costBreakdown?.total ?? 0) * 100)

    // Map ended reason to status
    const status = mapStatus(endedReason)

    // Upsert call record
    const { error } = await supabase
      .from('calls')
      .upsert({
        user_id: userId,
        vapi_call_id: vapiCallId,
        caller_number: callerNumber,
        duration_seconds: durationSeconds,
        status,
        transcript,
        summary,
        recording_url: recordingUrl,
        event_type: type,
        cost_cents: costCents,
        started_at: startedAt,
        ended_at: endedAt,
        metadata: { ended_reason: endedReason, assistant_id: assistantId },
      }, { onConflict: 'vapi_call_id' })

    if (error) console.error('[vapi-webhook] upsert error', error)

    // Forward to Zapier sub-workflow if n8n URL is set
    const n8nUrl = Deno.env.get('N8N_ZAPIER_WEBHOOK_URL')
    if (n8nUrl && status !== 'in_progress') {
      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: status === 'missed' ? 'missed_call' : type === 'end-of-call-report' ? 'call_completed' : type,
          user_id: userId,
          timestamp: endedAt ?? new Date().toISOString(),
          data: { caller_number: callerNumber, duration_seconds: durationSeconds, summary, status },
        }),
      }).catch(() => {})
    }

    return ok()
  } catch (err) {
    console.error('[vapi-webhook]', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})

function mapStatus(reason: string): string {
  if (['customer-did-not-answer', 'no-answer', 'missed'].includes(reason)) return 'missed'
  if (['call-transferred', 'transfer'].includes(reason)) return 'transferred'
  if (['voicemail'].includes(reason)) return 'voicemail'
  if (['customer-ended-call', 'assistant-ended-call', 'completed'].includes(reason)) return 'completed'
  return 'completed'
}

function ok() {
  return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })
}
