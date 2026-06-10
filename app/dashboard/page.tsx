import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { DateTime } from 'luxon'
import {
  ArrowRight, CalendarDays, MessageSquare, PhoneCall, PhoneOff,
  AlertTriangle, TrendingUp, CalendarCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import PhoneCard from './PhoneCard'
import NudgeCard from './NudgeCard'

type Appointment = {
  id: string
  caller_name: string | null
  caller_number: string | null
  service_type: string | null
  preferred_time_iso: string | null
  preferred_time_human: string | null
  message: string | null
  status: string | null
  created_at: string
  type: string
}

const TYPE_LABEL: Record<string, string> = {
  appointment: 'Booking',
  message: 'Message',
  callback: 'Callback',
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  } catch { return iso }
}

function formatRelative(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const mins = Math.floor((now.getTime() - d.getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`
  if (mins < 2880) return `Yesterday at ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  if (!user) redirect('/login')

  // Onboarding guard — belt-and-suspenders (middleware already checks, but protect server-side too)
  const { data: onboarding } = await supabase
    .from('user_onboarding')
    .select('is_completed, dismissed_nudges')
    .eq('user_id', user.sub)
    .single()

  if (!onboarding?.is_completed) redirect('/onboarding')

  // Config first — need timezone for date bounds
  const configRes = await supabase
    .from('agent_config')
    .select('business_name, phone_number, provisioning_status, timezone, selected_plan, calendar_id')
    .eq('user_id', user.sub)
    .single()

  const config = configRes.data
  const tz = config?.timezone ?? 'America/New_York'
  const plan = config?.selected_plan ?? 'lite'

  // Timezone-aware date bounds
  const todayStart = DateTime.now().setZone(tz).startOf('day').toUTC().toISO()!
  const todayEnd   = DateTime.now().setZone(tz).endOf('day').toUTC().toISO()!
  const monthStart = DateTime.now().setZone(tz).startOf('month').toUTC().toISO()!

  const activityLimit = plan === 'lite' ? 10 : 100

  const [
    todayRes, activityRes, callbacksRes, messagesRes,
    lastCallRes, monthlyCallsCountRes, monthlyApptsRes, nextApptRes,
  ] = await Promise.all([
    supabase
      .from('appointments')
      .select('id, caller_name, caller_number, service_type, preferred_time_iso, preferred_time_human, status, type, message, created_at')
      .eq('user_id', user.sub)
      .eq('type', 'appointment')
      .gte('preferred_time_iso', todayStart)
      .lte('preferred_time_iso', todayEnd)
      .order('preferred_time_iso', { ascending: true }),

    supabase
      .from('appointments')
      .select('id, type, caller_name, service_type, preferred_time_iso, preferred_time_human, message, status, created_at')
      .eq('user_id', user.sub)
      .order('created_at', { ascending: false })
      .limit(activityLimit),

    supabase
      .from('appointments')
      .select('id, caller_name, caller_number, message, created_at, status, type, service_type, preferred_time_iso')
      .eq('user_id', user.sub)
      .eq('type', 'callback')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(5),

    supabase
      .from('appointments')
      .select('id, caller_name, caller_number, message, created_at, status, type, service_type, preferred_time_iso')
      .eq('user_id', user.sub)
      .eq('type', 'message')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(5),

    supabase
      .from('calls')
      .select('started_at')
      .eq('user_id', user.sub)
      .order('started_at', { ascending: false })
      .limit(1),

    supabase
      .from('calls')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.sub)
      .gte('started_at', monthStart),

    supabase
      .from('appointments')
      .select('type')
      .eq('user_id', user.sub)
      .gte('created_at', monthStart),

    supabase
      .from('appointments')
      .select('caller_name, preferred_time_iso, preferred_time_human')
      .eq('user_id', user.sub)
      .eq('type', 'appointment')
      .gt('preferred_time_iso', new Date().toISOString())
      .order('preferred_time_iso', { ascending: true })
      .limit(1),
  ])

  const todayAppts   = (todayRes.data ?? []) as Appointment[]
  const activity     = (activityRes.data ?? []) as Appointment[]
  const callbacks    = (callbacksRes.data ?? []) as Appointment[]
  const messages     = (messagesRes.data ?? []) as Appointment[]
  const lastCallAt   = lastCallRes.data?.[0]?.started_at ?? null
  const monthlyCallsCount = monthlyCallsCountRes.count ?? 0
  const monthlyAppts = monthlyApptsRes.data ?? []
  const nextAppt     = nextApptRes.data?.[0] ?? null

  const daysSinceCall = lastCallAt
    ? (Date.now() - new Date(lastCallAt).getTime()) / 86400000
    : Infinity
  const avaHealthy = daysSinceCall <= 7

  const bookingsToday    = todayAppts.filter(a => a.status === 'confirmed').length
  const callbacksPending = callbacks.length
  const messagesPending  = messages.length

  // Monthly summary with weighted time-saved
  const monthlyBookings  = monthlyAppts.filter(a => a.type === 'appointment').length
  const monthlyMessages  = monthlyAppts.filter(a => a.type === 'message').length
  const monthlyCallbacks = monthlyAppts.filter(a => a.type === 'callback').length
  const minSaved = monthlyBookings * 5 + monthlyMessages * 3 + monthlyCallbacks * 3 + monthlyCallsCount * 1
  const timeSavedLabel = minSaved >= 60 ? `${(minSaved / 60).toFixed(1)} hrs` : `${minSaved} min`

  // Nudge: show when no activity and AVA has been quiet > 7 days, unless dismissed
  const dismissedNudges = (onboarding?.dismissed_nudges as string[]) ?? []
  const showNudge = !dismissedNudges.includes('setup') && activity.length === 0 && daysSinceCall > 7

  return (
    <div className="px-4 py-8 max-w-6xl sm:px-6">

      {/* Header + P1a: AVA Status Bar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{config?.business_name ?? 'Dashboard'}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
          {avaHealthy ? (
            <>
              <span className="flex items-center gap-1.5 text-xs text-teal-400">
                <span className="size-1.5 rounded-full bg-teal-400 animate-pulse" />
                AVA is active
              </span>
              {lastCallAt && (
                <span className="text-xs text-slate-500">Last call: {formatRelative(lastCallAt)}</span>
              )}
              <span className="text-xs text-slate-500">Calls this month: {monthlyCallsCount}</span>
            </>
          ) : (
            <span className="flex items-center gap-2 text-xs text-amber-400">
              <AlertTriangle className="size-3.5 shrink-0" />
              AVA hasn&apos;t taken a call recently —{' '}
              <Link href="/dashboard/test-ava" className="underline hover:text-amber-300 transition-colors">
                run a test call
              </Link>
            </span>
          )}
        </div>
      </div>

      {/* P4: Onboarding nudge */}
      {showNudge && <NudgeCard hasCalendar={!!config?.calendar_id} />}

      {/* KPI strip — P1b + P5 */}
      <div className="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <CalendarDays className="size-4 mb-2 text-teal-400" />
          <p className="text-2xl font-bold text-white">{bookingsToday}</p>
          <p className="text-xs text-slate-500 mt-0.5">Bookings today</p>
        </div>

        <div className={cn('rounded-2xl border bg-slate-900 p-4', callbacksPending > 0 ? 'border-amber-500/40' : 'border-slate-800')}>
          <PhoneCall className={cn('size-4 mb-2', callbacksPending > 0 ? 'text-amber-400' : 'text-slate-400')} />
          <p className="text-2xl font-bold text-white">{callbacksPending}</p>
          <p className="text-xs text-slate-500 mt-0.5">Pending callbacks</p>
        </div>

        <div className={cn('rounded-2xl border bg-slate-900 p-4', messagesPending > 0 ? 'border-amber-500/40' : 'border-slate-800')}>
          <MessageSquare className={cn('size-4 mb-2', messagesPending > 0 ? 'text-amber-400' : 'text-slate-400')} />
          <p className="text-2xl font-bold text-white">{messagesPending}</p>
          <p className="text-xs text-slate-500 mt-0.5">Unread messages</p>
        </div>

        {/* P1b: AVA number with provisioning state + copy */}
        <PhoneCard
          phoneNumber={config?.phone_number ?? null}
          provisioningStatus={config?.provisioning_status ?? 'pending'}
        />
      </div>

      {/* P3: Monthly value widget */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">This month</h2>
          <TrendingUp className="size-4 text-teal-400" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-2xl font-bold text-white">{monthlyCallsCount}</p>
            <p className="text-xs text-slate-500 mt-0.5">Calls answered</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{monthlyBookings}</p>
            <p className="text-xs text-slate-500 mt-0.5">Bookings made</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{monthlyMessages + monthlyCallbacks}</p>
            <p className="text-xs text-slate-500 mt-0.5">Messages taken</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-teal-400">{timeSavedLabel}</p>
            <p className="text-xs text-slate-500 mt-0.5">Est. time saved</p>
          </div>
        </div>
      </div>

      {/* Main two-column grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-5">
        {/* Today's appointments — 60% — P5 empty state */}
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
                {nextAppt ? (
                  <>
                    <p className="text-sm text-slate-400">No appointments today</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Next: {nextAppt.preferred_time_human ?? nextAppt.preferred_time_iso}
                      {nextAppt.caller_name ? ` with ${nextAppt.caller_name}` : ''}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-slate-400">No appointments scheduled — AVA is ready to book</p>
                )}
              </div>
            ) : (
              todayAppts.map((appt, i) => (
                <div key={appt.id} className={cn('flex items-center gap-3 px-5 py-3.5', i < todayAppts.length - 1 && 'border-b border-slate-800')}>
                  <span className="text-xs font-mono text-slate-500 w-16 shrink-0">
                    {appt.preferred_time_iso ? formatTime(appt.preferred_time_iso) : (appt.preferred_time_human ?? '—')}
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

        {/* Action queue — 40% — P5 unified empty state */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">Action queue</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
            {callbacks.length === 0 && messages.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <CalendarCheck className="size-6 text-teal-400/40 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Nothing needs your attention right now — AVA is handling things.</p>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* P2: Recent activity — improved rows */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Recent activity</h2>
          {plan === 'lite' && activity.length >= 10 && (
            <span className="text-xs text-slate-500">
              Last 10 shown —{' '}
              <Link href="/dashboard/settings" className="text-teal-400 hover:text-teal-300 transition-colors">
                upgrade for full history
              </Link>
            </span>
          )}
        </div>
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
                  'size-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                  item.type === 'appointment' ? 'bg-teal-500/10' :
                  item.type === 'callback' ? 'bg-amber-500/10' : 'bg-slate-700/50'
                )}>
                  {item.type === 'appointment' ? (
                    <CalendarDays className="size-2.5 text-teal-400" />
                  ) : item.type === 'callback' ? (
                    <PhoneCall className="size-2.5 text-amber-400" />
                  ) : (
                    <MessageSquare className="size-2.5 text-slate-400" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{item.caller_name ?? 'Unknown caller'}</span>
                    {item.service_type ? <span className="text-slate-400"> · {item.service_type}</span> : null}
                  </p>
                  {item.type === 'appointment' && item.preferred_time_human && (
                    <p className="text-xs text-teal-400/70 mt-0.5">{item.preferred_time_human}</p>
                  )}
                  {item.message && item.type !== 'appointment' && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">{item.message}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={cn(
                    'text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                    item.type === 'appointment' ? 'bg-teal-500/10 text-teal-400' :
                    item.type === 'callback' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-slate-700 text-slate-400'
                  )}>
                    {TYPE_LABEL[item.type] ?? item.type}
                  </span>
                  <span className="text-xs text-slate-600">{formatRelative(item.created_at)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}
