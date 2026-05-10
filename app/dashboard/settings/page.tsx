import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')
  const userId = data.claims.sub

  const [{ data: config }, { data: subscription }, { data: { user } }] = await Promise.all([
    supabase
      .from('agent_config')
      .select('business_name, business_industry, business_address, business_phone, business_hours, agent_name, agent_greeting, agent_personality, selected_voice_id, notification_email, zapier_webhook_url, zapier_enabled, selected_plan, timezone, appointment_duration_minutes, phone_number, vapi_assistant_id, calendar_id')
      .eq('user_id', userId)
      .single(),
    supabase
      .from('subscription')
      .select('plan, calls_included, calls_used, current_period_end')
      .eq('user_id', userId)
      .single(),
    supabase.auth.getUser(),
  ])

  const currentMonth = new Date().toISOString().slice(0, 7)
  const { count: testCallsUsed } = await supabase
    .from('test_call_usage')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('month_year', currentMonth)

  return (
    <div className="px-4 py-8 max-w-3xl sm:px-6 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your account and AI receptionist configuration</p>
      </div>
      <SettingsForm
        config={config}
        subscription={subscription ?? null}
        testCallsUsed={testCallsUsed ?? 0}
        userEmail={data.claims.email ?? user?.email ?? ''}
        displayName={user?.user_metadata?.display_name ?? ''}
      />
    </div>
  )
}
