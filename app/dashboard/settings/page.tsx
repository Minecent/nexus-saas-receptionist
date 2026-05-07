import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: config } = await supabase
    .from('agent_config')
    .select('business_name, business_hours, calendar_id, notification_email, zapier_webhook_url, zapier_enabled, selected_plan, timezone, appointment_duration_minutes, phone_number, vapi_assistant_id, agent_name')
    .eq('user_id', data.claims.sub)
    .single()

  return (
    <div className="px-4 py-8 max-w-3xl sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your AI receptionist configuration</p>
      </div>
      <SettingsForm config={config} />
    </div>
  )
}
