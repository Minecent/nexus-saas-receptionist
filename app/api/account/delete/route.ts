import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function DELETE() {
  if (process.env.ENABLE_ACCOUNT_DELETION !== 'true') {
    return NextResponse.json(
      { error: 'Account deletion is temporarily unavailable. Please contact support.' },
      { status: 503 }
    )
  }

  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = data.claims.sub

  const adminClient = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  try {
    // Explicit ordered deletes — belt and suspenders on top of CASCADE
    await adminClient.from('test_call_usage').delete().eq('user_id', userId)
    await adminClient.from('calls').delete().eq('user_id', userId)
    await adminClient.from('integration_logs').delete().eq('user_id', userId)
    await adminClient.from('integration_errors').delete().eq('user_id', userId)
    await adminClient.from('forwarding_rules').delete().eq('user_id', userId)
    await adminClient.from('agent_config').delete().eq('user_id', userId)
    await adminClient.from('user_onboarding').delete().eq('user_id', userId)
    await adminClient.from('subscription').delete().eq('user_id', userId)

    const { error } = await adminClient.auth.admin.deleteUser(userId)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Account deletion error:', err)
    return NextResponse.json(
      { error: 'Deletion failed. Please contact support.' },
      { status: 500 }
    )
  }
}
