import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight, Phone, CalendarDays, MessageSquare, PhoneCall, PhoneOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type Appointment = {
  id: string
  caller_name: string | null
  caller_number: string | null
  service_type: string | null
  preferred_time: string | null
  message: string | null
  status: string | null
  created_at: string
  type: string
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  } catch { return iso }
}

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const TYPE_LABEL: Record<string, string> = {
  appointment: 'Booking',
  message: 'Message',
  callback: 'Callback',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  if (!user) redirect('/login')

  const [configRes, todayRes, activityRes, callbacksRes, messagesRes] = await Promise.all([
    supabase
      .from('agent_config')
      .select('business_name, phone_number, provisioning_status')
      .eq('user_id', user.sub)
      .single(),

    supabase
      .from('appointments')
      .select('id, caller_name, caller_number, service_type, preferred_time, status, type, message, created_at')
      .eq('user_id', user.sub)
      .eq('type', 'appointment')
      .gte('preferred_time', new Date().toISOString().slice(0, 10))
      .lt('preferred_time', new Date(Date.now() + 86400000).toISOString().slice(0, 10))
      .order('preferred_time', { ascending: true }),

    supabase
      .from('appointments')
      .select('id, type, caller_name, service_type, preferred_time, message, status, created_at')
      .eq('user_id', user.sub)
      .order('created_at', { ascending: false })
      .limit(10),

    supabase
      .from('appointments')
      .select('id, caller_name, caller_number, message, created_at, status, type, service_type, preferred_time')
      .eq('user_id', user.sub)
      .eq('type', 'callback')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(5),

    supabase
      .from('appointments')
      .select('id, caller_name, caller_number, message, created_at, status, type, service_type, preferred_time')
      .eq('user_id', user.sub)
      .eq('type', 'message')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const config = configRes.data
  const todayAppts: Appointment[] = (todayRes.data ?? []) as Appointment[]
  const activity: Appointment[] = (activityRes.data ?? []) as Appointment[]
  const callbacks: Appointment[] = (callbacksRes.data ?? []) as Appointment[]
  const messages: Appointment[] = (messagesRes.data ?? []) as Appointment[]

  const bookingsToday = activity.filter(a => a.type === 'appointment' && new Date(a.created_at).toDateString() === new Date().toDateString()).length
  const callbacksPending = callbacks.length
  const messagesPending = messages.length

  const kpis = [
    { label: 'Bookings today',   value: bookingsToday,    icon: CalendarDays, color: 'text-teal-400' },
    { label: 'Pending callbacks', value: callbacksPending, icon: PhoneCall,   color: callbacksPending > 0 ? 'text-amber-400' : 'text-slate-400' },
    { label: 'Unread messages',  value: messagesPending,  icon: MessageSquare, color: messagesPending > 0 ? 'text-amber-400' : 'text-slate-400' },
    { label: 'AVA number', value: config?.phone_number ?? '—', icon: Phone, color: 'text-slate-400', isText: true },
  ]

  return (
    <div className="px-4 py-8 max-w-6xl sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{config?.business_name ?? 'Dashboard'}</h1>
        <p className="mt-1 text-sm text-slate-400">
          {config?.phone_number
            ? <>Your NEXUS number: <span className="font-mono text-white">{config.phone_number}</span></>
            : 'Your phone number is being provisioned — check your email for updates.'}
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 mb-8 lg:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon, color, isText }) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <Icon className={cn('size-4 mb-2', color)} />
            <p className={cn('font-bold text-white', isText ? 'text-sm font-mono truncate' : 'text-2xl')}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Main two-column grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-5">
        {/* Today's appointments — 60% */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Today&apos;s appointments</h2>
            <Link href="/dashboard/bookings" className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors">
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
            {todayAppts.length === 0 ? (
              <div className="p-10 text-center">
                <CalendarDays className="size-8 text-slate-700 mx-auto mb-3" />
                <p className="text-sm text-slate-400">No appointments today</p>
              </div>
            ) : (
              todayAppts.map((appt, i) => (
                <div key={appt.id} className={cn('flex items-center gap-3 px-5 py-3.5', i < todayAppts.length - 1 && 'border-b border-slate-800')}>
                  <span className="text-xs font-mono text-slate-500 w-16 shrink-0">
                    {appt.preferred_time ? formatTime(appt.preferred_time) : '—'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{appt.caller_name ?? 'Unknown'}</p>
                    {appt.service_type && <p className="text-xs text-slate-500 truncate">{appt.service_type}</p>}
                  </div>
                  <span className={cn(
                    'text-xs font-medium px-2 py-0.5 rounded-full shrink-0',
                    appt.status === 'confirmed' ? 'bg-teal-500/10 text-teal-400' :
                    appt.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                    'bg-slate-700 text-slate-300'
                  )}>
                    {appt.status ?? 'pending'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action queue — 40% */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">Action queue</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-800/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <PhoneCall className="size-3 text-amber-400" /> Callbacks
                </span>
                <Link href="/dashboard/callbacks" className="text-xs text-teal-400 hover:text-teal-300">View all</Link>
              </div>
            </div>
            {callbacks.length === 0 ? (
              <div className="px-5 py-4 text-xs text-slate-600">No pending callbacks</div>
            ) : (
              callbacks.slice(0, 3).map((cb, i) => (
                <div key={cb.id} className={cn('px-5 py-3', i < Math.min(callbacks.length, 3) - 1 && 'border-b border-slate-800/50')}>
                  <p className="text-sm font-medium text-white">{cb.caller_name ?? 'Unknown'}</p>
                  <p className="text-xs text-slate-500">{formatRelative(cb.created_at)}</p>
                </div>
              ))
            )}

            <div className="px-4 py-3 border-t border-b border-slate-800 bg-slate-800/30 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <MessageSquare className="size-3 text-teal-400" /> Messages
                </span>
                <Link href="/dashboard/messages" className="text-xs text-teal-400 hover:text-teal-300">View all</Link>
              </div>
            </div>
            {messages.length === 0 ? (
              <div className="px-5 py-4 text-xs text-slate-600">No unread messages</div>
            ) : (
              messages.slice(0, 3).map((msg, i) => (
                <div key={msg.id} className={cn('px-5 py-3', i < Math.min(messages.length, 3) - 1 && 'border-b border-slate-800/50')}>
                  <p className="text-sm font-medium text-white">{msg.caller_name ?? 'Unknown'}</p>
                  <p className="text-xs text-slate-500 truncate">{msg.message ?? ''}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">Recent activity</h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          {activity.length === 0 ? (
            <div className="p-10 text-center">
              <PhoneOff className="size-8 text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No activity yet</p>
              <p className="text-xs text-slate-600 mt-1">Activity will appear here once AVA starts taking calls.</p>
            </div>
          ) : (
            activity.map((item, i) => (
              <div key={item.id} className={cn('flex items-start gap-3 px-5 py-3.5', i < activity.length - 1 && 'border-b border-slate-800')}>
                <span className={cn(
                  'size-1.5 rounded-full shrink-0 mt-2',
                  item.type === 'appointment' ? 'bg-teal-400' :
                  item.type === 'callback' ? 'bg-amber-400' : 'bg-slate-400'
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{TYPE_LABEL[item.type] ?? item.type}</span>
                    {item.caller_name ? ` — ${item.caller_name}` : ''}
                    {item.service_type ? ` · ${item.service_type}` : ''}
                  </p>
                  {item.message && <p className="text-xs text-slate-500 truncate mt-0.5">{item.message}</p>}
                </div>
                <span className="text-xs text-slate-600 shrink-0">{formatRelative(item.created_at)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
