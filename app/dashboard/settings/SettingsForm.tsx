'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Phoenix', 'America/Anchorage', 'Pacific/Honolulu',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Asia/Dubai', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney',
]

type Hours = Record<string, { open: string; close: string; closed: boolean }>

type Config = {
  business_name?: string | null
  agent_name?: string | null
  business_hours?: unknown
  calendar_id?: string | null
  notification_email?: string | null
  zapier_webhook_url?: string | null
  zapier_enabled?: boolean | null
  selected_plan?: string | null
  timezone?: string | null
  appointment_duration_minutes?: number | null
  phone_number?: string | null
  vapi_assistant_id?: string | null
} | null

function defaultHours(): Hours {
  return Object.fromEntries(DAYS.map(d => [d, { open: '09:00', close: '17:00', closed: d === 'saturday' || d === 'sunday' }]))
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-400 transition-colors px-2 py-1 rounded border border-slate-700 hover:border-teal-500">
      {copied ? <Check className="size-3 text-teal-400" /> : <Copy className="size-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default function SettingsForm({ config }: { config: Config }) {
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [businessName, setBusinessName] = useState(config?.business_name ?? '')
  const [timezone, setTimezone] = useState(config?.timezone ?? 'America/New_York')
  const [apptDuration, setApptDuration] = useState(config?.appointment_duration_minutes ?? 30)
  const [hours, setHours] = useState<Hours>(() => {
    if (config?.business_hours && typeof config.business_hours === 'object') {
      return config.business_hours as Hours
    }
    return defaultHours()
  })
  const [notificationEmail, setNotificationEmail] = useState(config?.notification_email ?? '')
  const [zapierUrl, setZapierUrl] = useState(config?.zapier_webhook_url ?? '')

  const isPro = config?.selected_plan === 'pro' || config?.selected_plan === 'scale' || config?.selected_plan === 'custom'

  const updateDay = (day: string, field: string, value: string | boolean) => {
    setHours(h => ({ ...h, [day]: { ...h[day], [field]: value } }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      await supabase.from('agent_config').upsert({
        user_id: user.id,
        business_name: businessName,
        timezone,
        appointment_duration_minutes: Number(apptDuration),
        business_hours: hours,
        notification_email: notificationEmail || null,
        zapier_webhook_url: zapierUrl || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500'

  return (
    <div className="space-y-8">
      {/* Business */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">Business</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Business name</label>
            <input value={businessName} onChange={e => setBusinessName(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Timezone</label>
              <select value={timezone} onChange={e => setTimezone(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500">
                {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Appointment duration (min)</label>
              <input type="number" min={5} max={240} step={5} value={apptDuration}
                onChange={e => setApptDuration(Number(e.target.value))}
                className={cn(inputCls, 'w-full')} />
            </div>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">Business hours</h2>
        <div className="space-y-2">
          {DAYS.map(day => (
            <div key={day} className="flex items-center gap-3">
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
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">Notifications</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Notification email</label>
            <input type="email" value={notificationEmail} onChange={e => setNotificationEmail(e.target.value)}
              placeholder="you@example.com" className={inputCls} />
            <p className="text-xs text-slate-600 mt-1">Receive an email each time AVA books, cancels, or takes a message.</p>
          </div>
          {isPro && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Zapier webhook URL</label>
              <input type="url" value={zapierUrl} onChange={e => setZapierUrl(e.target.value)}
                placeholder="https://hooks.zapier.com/…" className={inputCls} />
              <p className="text-xs text-slate-600 mt-1">Triggers on every AVA event — connect to Slack, CRM, or anything.</p>
            </div>
          )}
        </div>
      </section>

      {/* Calendar */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">Google Calendar</h2>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Calendar ID</label>
          <div className="flex items-center gap-2">
            <input readOnly value={config?.calendar_id ?? ''} placeholder="Not set"
              className={cn(inputCls, 'flex-1 opacity-60 cursor-default')} />
            {config?.calendar_id && <CopyButton value={config.calendar_id} />}
          </div>
          <p className="text-xs text-slate-600 mt-1.5">
            To change this, contact support. To find your Calendar ID: Google Calendar → Settings → your calendar → "Calendar ID" near the bottom.
          </p>
        </div>
      </section>

      {/* Account */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white">Account</h2>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          {[
            { label: 'Phone number', value: config?.phone_number ?? 'Pending provisioning' },
            { label: 'Plan', value: config?.selected_plan ?? 'lite' },
            { label: 'Assistant ID', value: config?.vapi_assistant_id ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
              <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="font-mono text-xs text-white truncate mt-0.5">{value}</p>
              </div>
              <CopyButton value={value} />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600">To upgrade your plan, contact us at support@nexusconsultancy.app.</p>
      </section>

      {/* Save */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        {saved && <span className="text-sm text-teal-400 flex items-center gap-1.5"><Check className="size-4" /> Saved</span>}
      </div>
    </div>
  )
}
