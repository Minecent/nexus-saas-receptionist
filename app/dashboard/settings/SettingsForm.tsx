'use client'

import { useState, useId } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import {
  Check, ChevronDown, ChevronUp, AlertTriangle, Shield,
  Zap, Clock, Phone, ArrowUpRight,
} from 'lucide-react'
import { syncVapiAssistant } from '@/lib/vapi'

// ─── Types ────────────────────────────────────────────────────────────────────

type Hours = Record<string, { open: string; close: string; closed: boolean }>

export type SettingsConfig = {
  business_name?: string | null
  business_industry?: string | null
  business_address?: string | null
  business_phone?: string | null
  business_hours?: unknown
  agent_name?: string | null
  agent_greeting?: string | null
  agent_personality?: string | null
  selected_voice_id?: string | null
  notification_email?: string | null
  zapier_webhook_url?: string | null
  zapier_enabled?: boolean | null
  selected_plan?: string | null
  timezone?: string | null
  appointment_duration_minutes?: number | null
  phone_number?: string | null
  vapi_assistant_id?: string | null
  calendar_id?: string | null
}

export type SettingsSub = {
  plan: string
  calls_included: number | null
  calls_used: number | null
  current_period_end: string | null
} | null

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Phoenix', 'America/Anchorage', 'Pacific/Honolulu',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Asia/Dubai', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney',
]

const INDUSTRIES = [
  'Property Management', 'Real Estate', 'Healthcare', 'Legal',
  'Fitness', 'Dental', 'Veterinary', 'Home Services', 'Financial Services', 'Other',
]

const VOICES = [
  { id: 'roger',  label: 'Roger — Laid-back & Casual (Male)' },
  { id: 'josh',   label: 'Josh — Energetic & Modern (Male)' },
  { id: 'larry',  label: 'Larry — Deep & Authoritative (Male)' },
  { id: 'lexi',   label: 'Lexi — Warm & Professional (Female)' },
  { id: 'belle',  label: 'Belle — Bright & Friendly (Female)' },
  { id: 'sami',   label: 'Sami — Clear & Neutral (Female)' },
  { id: 'sky',    label: 'Sky — Conversational & Natural (Female)' },
  { id: 'sarah',  label: 'Sarah — Professional (Female)' },
  { id: 'marcus', label: 'Marcus — Confident (Male)' },
  { id: 'olivia', label: 'Olivia — Elegant (Female)' },
  { id: 'james',  label: 'James — Authoritative (Male)' },
  { id: 'alex',   label: 'Alex — Versatile (Neutral)' },
]

const PLAN_BADGE: Record<string, string> = {
  lite:   'bg-slate-700 text-slate-300',
  pro:    'bg-teal-500/15 text-teal-400',
  scale:  'bg-blue-500/15 text-blue-400',
  custom: 'bg-purple-500/15 text-purple-400',
}

// ─── Toast ────────────────────────────────────────────────────────────────────

type Toast = { id: number; message: string; type: 'success' | 'error' }

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const add = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }
  return { toasts, add }
}

function ToastList({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={cn(
          'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg',
          t.type === 'success'
            ? 'border-teal-500/30 bg-teal-950 text-teal-300'
            : 'border-rose-500/30 bg-rose-950 text-rose-300'
        )}>
          {t.type === 'success' ? <Check className="size-4 shrink-0" /> : <AlertTriangle className="size-4 shrink-0" />}
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ─── Section wrapper (collapsible) ────────────────────────────────────────────

function Section({
  title, subtitle, defaultOpen = true, danger = false, children,
}: {
  title: string
  subtitle?: string
  defaultOpen?: boolean
  danger?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className={cn(
      'rounded-2xl border bg-slate-900',
      danger ? 'border-red-500/30' : 'border-slate-800'
    )}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <p className={cn('text-sm font-semibold', danger ? 'text-red-400' : 'text-white')}>{title}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {open ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
      </button>
      {open && <div className="border-t border-slate-800 px-5 pb-5 pt-4 space-y-4">{children}</div>}
    </section>
  )
}

// ─── Shared input style ────────────────────────────────────────────────────────

const input = 'w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500'
const select = 'w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500'

function SaveRow({ saving, onSave, saved }: { saving: boolean; onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
      {saved && <span className="flex items-center gap-1.5 text-sm text-teal-400"><Check className="size-4" /> Saved</span>}
    </div>
  )
}

function defaultHours(): Hours {
  return Object.fromEntries(DAYS.map(d => [d, {
    open: '09:00', close: '17:00',
    closed: d === 'saturday' || d === 'sunday',
  }]))
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function SettingsForm({
  config,
  subscription,
  testCallsUsed,
  userEmail,
  displayName: initialDisplayName,
}: {
  config: SettingsConfig | null
  subscription: SettingsSub
  testCallsUsed: number
  userEmail: string
  displayName: string
}) {
  const supabase = createClient()
  const router = useRouter()
  const { toasts, add: toast } = useToast()

  // ── Account ──────────────────────────────────────────────────────────────────
  const [displayName, setDisplayName] = useState(initialDisplayName)
  const [savingAccount, setSavingAccount] = useState(false)
  const [savedAccount, setSavedAccount] = useState(false)

  const saveAccount = async () => {
    setSavingAccount(true)
    try {
      const { error } = await supabase.auth.updateUser({ data: { display_name: displayName } })
      if (error) throw error
      toast('Account saved')
      setSavedAccount(true)
      setTimeout(() => setSavedAccount(false), 3000)
    } catch {
      toast('Could not save — try again', 'error')
    } finally {
      setSavingAccount(false)
    }
  }

  const sendPasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      })
      if (error) throw error
      toast('Password reset email sent')
    } catch {
      toast('Could not send reset email', 'error')
    }
  }

  // ── Business Profile ──────────────────────────────────────────────────────────
  const [bizName, setBizName] = useState(config?.business_name ?? '')
  const [industry, setIndustry] = useState(config?.business_industry ?? '')
  const [address, setAddress] = useState(config?.business_address ?? '')
  const [timezone, setTimezone] = useState(config?.timezone ?? 'America/New_York')
  const [apptDuration, setApptDuration] = useState(config?.appointment_duration_minutes ?? 30)
  const [hours, setHours] = useState<Hours>(() => {
    if (config?.business_hours && typeof config.business_hours === 'object')
      return config.business_hours as Hours
    return defaultHours()
  })
  const [savingBiz, setSavingBiz] = useState(false)
  const [savedBiz, setSavedBiz] = useState(false)

  const updateDay = (day: string, field: string, value: string | boolean) =>
    setHours(h => ({ ...h, [day]: { ...h[day], [field]: value } }))

  const saveBiz = async () => {
    setSavingBiz(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      const { error } = await supabase.from('agent_config').upsert({
        user_id: user.id,
        business_name: bizName,
        business_industry: industry || null,
        business_address: address || null,
        timezone,
        appointment_duration_minutes: Number(apptDuration),
        business_hours: hours,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      if (error) throw error
      toast('Business profile saved')
      setSavedBiz(true)
      setTimeout(() => setSavedBiz(false), 3000)
    } catch {
      toast('Could not save — try again', 'error')
    } finally {
      setSavingBiz(false)
    }
  }

  // ── AVA Configuration ─────────────────────────────────────────────────────────
  const [greeting, setGreeting] = useState(config?.agent_greeting ?? '')
  const [voice, setVoice] = useState(config?.selected_voice_id ?? '')
  const [personality, setPersonality] = useState(config?.agent_personality ?? 'Professional')
  const [forwardingNumber, setForwardingNumber] = useState(config?.business_phone ?? '')
  const [notifEmail, setNotifEmail] = useState(config?.notification_email ?? '')
  const [savingAva, setSavingAva] = useState(false)
  const [savedAva, setSavedAva] = useState(false)

  const saveAva = async () => {
    setSavingAva(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')
      const { error } = await supabase.from('agent_config').upsert({
        user_id: user.id,
        agent_greeting: greeting || null,
        selected_voice_id: voice || null,
        agent_personality: personality,
        business_phone: forwardingNumber || null,
        notification_email: notifEmail || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      if (error) throw error
      syncVapiAssistant(user.id)
      toast('AVA configuration saved')
      setSavedAva(true)
      setTimeout(() => setSavedAva(false), 3000)
    } catch {
      toast('Could not save — try again', 'error')
    } finally {
      setSavingAva(false)
    }
  }

  // ── Danger Zone ────────────────────────────────────────────────────────────────
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deletingAccount, setDeletingAccount] = useState(false)
  const expectedConfirm = `DELETE ${userEmail}`
  const canDelete = deleteConfirm === expectedConfirm

  const deleteAccount = async () => {
    if (!canDelete) return
    setDeletingAccount(true)
    try {
      const res = await fetch('/api/account/delete', { method: 'DELETE' })
      const body = await res.json()
      if (!res.ok) {
        toast(body.error ?? 'Deletion failed', 'error')
        return
      }
      await supabase.auth.signOut()
      router.push('/?goodbye=1')
    } catch {
      toast('Deletion failed — please contact support', 'error')
    } finally {
      setDeletingAccount(false)
    }
  }

  // ── Subscription ──────────────────────────────────────────────────────────────
  const plan = config?.selected_plan ?? subscription?.plan ?? 'lite'
  const callsIncluded = subscription?.calls_included ?? null
  const callsUsed = subscription?.calls_used ?? null
  const nextBilling = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : null

  const isPro = ['pro', 'scale', 'custom'].includes(plan)

  return (
    <>
      <ToastList toasts={toasts} />
      <div className="space-y-5">

        {/* ── Account ── */}
        <Section title="Account" subtitle="Your personal account details">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Display name</label>
            <input value={displayName} onChange={e => setDisplayName(e.target.value)} className={input} placeholder="Your name" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
            <input readOnly value={userEmail} className={cn(input, 'opacity-50 cursor-default')} />
            <p className="mt-1 text-xs text-slate-600">Contact support to change your email address.</p>
          </div>
          <SaveRow saving={savingAccount} onSave={saveAccount} saved={savedAccount} />
          <div className="border-t border-slate-800 pt-4">
            <p className="text-xs font-medium text-slate-400 mb-2">Password</p>
            <button
              onClick={sendPasswordReset}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            >
              Send password reset email
            </button>
            <p className="mt-1.5 text-xs text-slate-600">We&apos;ll email a reset link to {userEmail}.</p>
          </div>
        </Section>

        {/* ── Business Profile ── */}
        <Section title="Business Profile" subtitle="Details about your business">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Business name</label>
              <input value={bizName} onChange={e => setBizName(e.target.value)} className={input} placeholder="Acme Plumbing" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className={select}>
                <option value="">Select industry…</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Business address</label>
            <input value={address} onChange={e => setAddress(e.target.value)} className={input} placeholder="123 Main St, City, State" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Timezone</label>
              <select value={timezone} onChange={e => setTimezone(e.target.value)} className={select}>
                {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Appointment duration (min)</label>
              <input type="number" min={5} max={240} step={5} value={apptDuration}
                onChange={e => setApptDuration(Number(e.target.value))} className={input} />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 mb-2">Business hours</p>
            <div className="space-y-2">
              {DAYS.map(day => (
                <div key={day} className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-slate-400 w-24 capitalize shrink-0">{day}</span>
                  <label className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
                    <input type="checkbox" checked={!hours[day]?.closed}
                      onChange={e => updateDay(day, 'closed', !e.target.checked)}
                      className="accent-teal-500" />
                    Open
                  </label>
                  {!hours[day]?.closed && (
                    <>
                      <input type="time" value={hours[day]?.open ?? '09:00'}
                        onChange={e => updateDay(day, 'open', e.target.value)}
                        className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500" />
                      <span className="text-xs text-slate-600">to</span>
                      <input type="time" value={hours[day]?.close ?? '17:00'}
                        onChange={e => updateDay(day, 'close', e.target.value)}
                        className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500" />
                    </>
                  )}
                  {hours[day]?.closed && <span className="text-xs text-slate-600">Closed</span>}
                </div>
              ))}
            </div>
          </div>
          <SaveRow saving={savingBiz} onSave={saveBiz} saved={savedBiz} />
        </Section>

        {/* ── AVA Configuration ── */}
        <Section title="AVA Configuration" subtitle="Customize how your AI receptionist sounds and behaves">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Greeting</label>
            <textarea
              value={greeting}
              onChange={e => setGreeting(e.target.value)}
              maxLength={280}
              rows={3}
              className={cn(input, 'resize-none')}
              placeholder="Hi, thanks for calling [Business Name]! How can I help you today?"
            />
            <p className="mt-1 text-xs text-slate-600">{greeting.length}/280 characters</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Voice</label>
            <select value={voice} onChange={e => setVoice(e.target.value)} className={select}>
              <option value="">Select a voice…</option>
              {VOICES.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 mb-2">Personality</p>
            <div className="flex flex-wrap gap-2">
              {['Professional', 'Friendly', 'Casual'].map(p => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="personality" value={p} checked={personality === p}
                    onChange={() => setPersonality(p)} className="accent-teal-500" />
                  <span className="text-sm text-slate-300">{p}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Call forwarding number</label>
            <div className="flex gap-2">
              <span className="flex items-center rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-slate-400">+1</span>
              <input
                type="tel"
                value={forwardingNumber}
                onChange={e => setForwardingNumber(e.target.value)}
                placeholder="(555) 000-0000"
                className={cn(input, 'flex-1')}
              />
            </div>
            <p className="mt-1 text-xs text-slate-600">The number AVA transfers calls to when needed.</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Notification email</label>
            <input type="email" value={notifEmail} onChange={e => setNotifEmail(e.target.value)}
              placeholder="you@example.com" className={input} />
            <p className="mt-1 text-xs text-slate-600">Receive an email after every booking, message, or callback.</p>
          </div>
          {isPro && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Automation webhook URL</label>
              <input type="url" value={config?.zapier_webhook_url ?? ''} readOnly
                className={cn(input, 'opacity-60 cursor-default')}
                placeholder="Configured during onboarding" />
              <p className="mt-1 text-xs text-slate-600">To update this, contact support.</p>
            </div>
          )}
          <SaveRow saving={savingAva} onSave={saveAva} saved={savedAva} />
        </Section>

        {/* ── Subscription ── */}
        <Section title="Subscription" subtitle="Your current plan and usage">
          <div className="flex items-center gap-3">
            <span className={cn('rounded-full px-3 py-1 text-xs font-semibold capitalize', PLAN_BADGE[plan] ?? PLAN_BADGE.lite)}>
              {plan}
            </span>
            <span className="text-xs text-slate-500">Current plan</span>
          </div>
          {callsIncluded !== null && callsUsed !== null && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5"><Clock className="size-3" /> Minutes used this month</span>
                <span className="text-slate-300 font-semibold">{callsUsed} / {callsIncluded}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-teal-500 transition-all"
                  style={{ width: `${Math.min((callsUsed / callsIncluded) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Phone className="size-3 shrink-0" />
            <span>Test calls this month: <span className="text-white font-semibold">{testCallsUsed}</span></span>
            <Link href="/dashboard/test-ava" className="text-teal-400 hover:text-teal-300 transition-colors ml-1">View →</Link>
          </div>
          {nextBilling && (
            <p className="text-xs text-slate-400">Next billing date: <span className="text-white">{nextBilling}</span></p>
          )}
          <div className="flex flex-wrap gap-3 pt-1">
            <div className="relative group">
              <button disabled className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-500 cursor-not-allowed opacity-60">
                <Zap className="size-3.5" /> Manage billing
              </button>
              <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block whitespace-nowrap rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 shadow-lg">
                Coming soon — Stripe integration pending
              </div>
            </div>
            <Link
              href="/pricing#pricing"
              className="flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
            >
              <ArrowUpRight className="size-3.5" /> Upgrade plan
            </Link>
          </div>
        </Section>

        {/* ── Danger Zone ── */}
        <Section title="Danger Zone" danger defaultOpen={false}>
          <div className="space-y-3">
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
              <p className="text-xs text-red-300 leading-relaxed">
                <Shield className="size-3.5 inline mr-1 mb-0.5" />
                Deleting your account permanently removes your AVA agent, all bookings, call history, and configuration.
                <strong className="block mt-1">This cannot be undone.</strong>
              </p>
            </div>
            <button
              onClick={() => { setShowDeleteModal(true); setDeleteConfirm('') }}
              className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Delete my account
            </button>
          </div>
        </Section>

      </div>

      {/* ── Delete confirmation modal ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold text-white">Delete your account?</h3>
                <p className="mt-1 text-sm text-slate-400">
                  This permanently removes your AVA agent, all bookings, call history, and configuration. This cannot be undone.
                </p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                Type <span className="text-white font-mono">{expectedConfirm}</span> to confirm
              </label>
              <input
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
                placeholder={expectedConfirm}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-red-500 font-mono"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                disabled={!canDelete || deletingAccount}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deletingAccount ? 'Deleting…' : 'Permanently delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
