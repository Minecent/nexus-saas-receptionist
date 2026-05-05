import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const SECTIONS = [
  { label: 'Train Agent',     desc: 'Update your AI name, greeting, and instructions', href: '/onboarding/train-agent' },
  { label: 'Business Details',desc: 'Edit your business name, hours, and contact info',  href: '/onboarding/business-details' },
  { label: 'Voice',           desc: 'Change your AI voice preference',                   href: '/onboarding/select-voice' },
  { label: 'Agent Settings',  desc: 'Call transfer, recording, Zapier integration',      href: '/onboarding/agent-settings' },
  { label: 'Plan',            desc: 'View or upgrade your subscription',                  href: '/onboarding/select-plan' },
]

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: config } = await supabase
    .from('agent_config')
    .select('business_name, selected_plan, phone_number, provisioning_status, agent_name')
    .eq('user_id', data.claims.sub)
    .single()

  return (
    <div className="px-6 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your NEXUS AI receptionist configuration</p>
      </div>

      {/* Account info */}
      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white">Account</h2>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <span className="text-slate-500">Business</span>
          <span className="text-white">{config?.business_name ?? '—'}</span>
          <span className="text-slate-500">Agent name</span>
          <span className="text-white">{config?.agent_name ?? 'AVA'}</span>
          <span className="text-slate-500">Plan</span>
          <span className="capitalize text-teal-400 font-medium">{config?.selected_plan ?? 'lite'}</span>
          <span className="text-slate-500">Phone number</span>
          <span className="font-mono text-white">{config?.phone_number ?? 'Pending provisioning'}</span>
        </div>
      </div>

      {/* Edit sections */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Edit Settings</h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          {SECTIONS.map(({ label, desc, href }, i) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between px-5 py-4 hover:bg-slate-800/50 transition-colors group ${i < SECTIONS.length - 1 ? 'border-b border-slate-800' : ''}`}
            >
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
              <ArrowRight className="size-4 text-slate-600 group-hover:text-teal-400 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
