import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ForwardingClient from './client'

export const metadata = {
  title: 'Smart Call Forwarding — NEXUS Dashboard',
}

export default async function ForwardingRulesPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  if (!user) redirect('/login')

  const [{ data: config }, { data: rules }] = await Promise.all([
    supabase
      .from('agent_config')
      .select('selected_plan')
      .eq('user_id', user.sub)
      .single(),
    supabase
      .from('forwarding_rules')
      .select('*')
      .eq('user_id', user.sub)
      .order('priority', { ascending: true }),
  ])

  return (
    <ForwardingClient
      initialRules={rules ?? []}
      plan={config?.selected_plan ?? 'lite'}
      userId={user.sub as string}
    />
  )
}
