import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Phone, Clock, PhoneOff, PhoneMissed, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

function formatRelative(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const STATUS_STYLES: Record<string, string> = {
  completed:   'bg-teal-500/10 text-teal-400',
  missed:      'bg-red-500/10 text-red-400',
  transferred: 'bg-blue-500/10 text-blue-400',
  voicemail:   'bg-amber-500/10 text-amber-400',
  in_progress: 'bg-slate-500/10 text-slate-400',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  if (!user) redirect('/login')

  const [configRes, callsRes, statsRes] = await Promise.all([
    supabase
      .from('agent_config')
      .select('business_name, selected_plan, phone_number, provisioning_status')
      .eq('user_id', user.sub)
      .single(),

    supabase
      .from('calls')
      .select('id, caller_number, duration_seconds, status, summary, started_at')
      .eq('user_id', user.sub)
      .order('started_at', { ascending: false })
      .limit(5),

    supabase
      .from('calls')
      .select('status, duration_seconds')
      .eq('user_id', user.sub),
  ])

  const config = configRes.data
  const recentCalls = callsRes.data ?? []
  const allCalls = statsRes.data ?? []

  const totalCalls = allCalls.length
  const missedCalls = allCalls.filter(c => c.status === 'missed').length
  const totalMinutes = Math.floor(allCalls.reduce((s, c) => s + (c.duration_seconds ?? 0), 0) / 60)
  const completedCalls = allCalls.filter(c => c.status === 'completed').length

  const stats = [
    { label: 'Total Calls',     value: totalCalls,     icon: Phone,       color: 'text-teal-400' },
    { label: 'Completed',       value: completedCalls, icon: Phone,       color: 'text-teal-400' },
    { label: 'Missed',          value: missedCalls,    icon: PhoneMissed, color: 'text-red-400'  },
    { label: 'Minutes Handled', value: totalMinutes,   icon: Clock,       color: 'text-blue-400' },
  ]

  return (
    <div className="px-6 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {config?.business_name ?? 'Dashboard'}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {config?.phone_number
            ? <>Your NEXUS number: <span className="font-mono text-white">{config.phone_number}</span></>
            : 'Your phone number is being provisioned — check your email for updates.'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className={cn('mb-2', color)}>
              <Icon className="size-4" />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Calls */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Recent Calls</h2>
          <Link href="/dashboard/calls" className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors">
            View all <ArrowRight className="size-3" />
          </Link>
        </div>

        {recentCalls.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <PhoneOff className="size-8 text-slate-700 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-400">No calls yet</p>
            <p className="text-xs text-slate-600 mt-1">Calls will appear here once your number is active.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
            {recentCalls.map((call, i) => (
              <div
                key={call.id}
                className={cn(
                  'flex items-center gap-4 px-5 py-4',
                  i < recentCalls.length - 1 && 'border-b border-slate-800'
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {call.caller_number ?? 'Unknown caller'}
                  </p>
                  {call.summary && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">{call.summary}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-500">
                    {call.duration_seconds ? formatDuration(call.duration_seconds) : '—'}
                  </span>
                  <span className={cn(
                    'text-xs font-medium px-2 py-0.5 rounded-full capitalize',
                    STATUS_STYLES[call.status] ?? STATUS_STYLES.completed
                  )}>
                    {call.status}
                  </span>
                  <span className="text-xs text-slate-600 w-14 text-right">
                    {call.started_at ? formatRelative(call.started_at) : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/forwarding-rules"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Call Forwarding</p>
              <p className="text-xs text-slate-400 mt-1">Set rules for when AVA should transfer calls</p>
            </div>
            <ArrowRight className="size-4 text-slate-600 group-hover:text-teal-400 transition-colors" />
          </div>
        </Link>
        <Link
          href="/dashboard/settings"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Agent Settings</p>
              <p className="text-xs text-slate-400 mt-1">Update your AI receptionist configuration</p>
            </div>
            <ArrowRight className="size-4 text-slate-600 group-hover:text-teal-400 transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  )
}
