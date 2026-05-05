import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardSidebar from '@/components/dashboard/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: config } = await supabase
    .from('agent_config')
    .select('business_name, selected_plan')
    .eq('user_id', data.claims.sub)
    .single()

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <DashboardSidebar
        businessName={config?.business_name ?? 'My Business'}
        plan={config?.selected_plan ?? 'lite'}
        email={data.claims.email ?? ''}
      />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
