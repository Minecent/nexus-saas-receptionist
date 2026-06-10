import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { TEST_CALL_LIMITS, DEFAULT_TEST_CALL_LIMITS } from '@/lib/config'

export async function POST() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = data.claims.sub

  const { data: config } = await supabase
    .from('agent_config')
    .select('selected_plan')
    .eq('user_id', userId)
    .single()

  const plan = config?.selected_plan ?? 'lite'
  const limits = TEST_CALL_LIMITS[plan] ?? DEFAULT_TEST_CALL_LIMITS
  const monthYear = new Date().toISOString().slice(0, 7)

  if (limits.calls !== null) {
    const { count } = await supabase
      .from('test_call_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('month_year', monthYear)

    if ((count ?? 0) >= limits.calls) {
      return NextResponse.json({ allowed: false, reason: 'limit_reached' }, { status: 403 })
    }
  }

  const { data: usage, error } = await supabase
    .from('test_call_usage')
    .insert({ user_id: userId, month_year: monthYear })
    .select('id')
    .single()

  if (error || !usage) {
    return NextResponse.json({ error: 'Failed to start test call' }, { status: 500 })
  }

  return NextResponse.json({
    allowed: true,
    usageId: usage.id,
    maxDurationSeconds: limits.maxDurationSeconds,
  })
}
