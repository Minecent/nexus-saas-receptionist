import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = data.claims.sub

  const body = await request.json().catch(() => null)
  const usageId = body?.usageId
  if (!usageId) {
    return NextResponse.json({ error: 'Missing usageId' }, { status: 400 })
  }

  const durationSeconds = Math.max(0, Math.round(Number(body?.durationSeconds) || 0))
  const transcript = typeof body?.transcript === 'string' ? body.transcript : null
  const summary = typeof body?.summary === 'string' ? body.summary : null

  const { error } = await supabase
    .from('test_call_usage')
    .update({
      duration_seconds: durationSeconds,
      ended_at: new Date().toISOString(),
      transcript,
      summary,
    })
    .eq('id', usageId)
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json({ error: 'Failed to record test call' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
