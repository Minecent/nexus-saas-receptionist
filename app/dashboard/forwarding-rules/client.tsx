'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import {
  GripVertical, Plus, Pencil, Trash2, Clock, Tag, Users, ArrowRight,
  Lock, X, Check, AlertCircle, Info, PhoneForwarded,
} from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// ─── Types ────────────────────────────────────────────────────────────────────

type ConditionType = 'time' | 'keyword' | 'known_caller' | 'always'

interface ForwardingRule {
  id: string
  user_id: string
  name: string
  is_active: boolean
  priority: number
  condition_type: ConditionType
  time_start: string | null
  time_end: string | null
  days_of_week: number[] | null
  keywords: string[] | null
  forward_to: string
  forward_label: string | null
  created_at: string
  updated_at: string
}

interface ToastItem { id: number; message: string; type: 'success' | 'error' }

interface FormState {
  name: string
  conditionType: ConditionType
  timeStart: string
  timeEnd: string
  daysOfWeek: number[]
  keywords: string[]
  forwardLabel: string
}

interface FormErrors {
  name?: string
  timeStart?: string
  daysOfWeek?: string
  keywords?: string
  forwardTo?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAYS = [1, 2, 3, 4, 5]
const KEYWORD_SUGGESTIONS = ['emergency', 'leak', 'urgent', 'flooding', 'broken', 'locked out', 'fire']
const COUNTRY_CODES = [
  { value: '+1',  label: '+1 (US/CA)' },
  { value: '+44', label: '+44 (UK)' },
  { value: '+61', label: '+61 (AU)' },
  { value: '+33', label: '+33 (FR)' },
  { value: '+49', label: '+49 (DE)' },
  { value: '+34', label: '+34 (ES)' },
  { value: '+39', label: '+39 (IT)' },
  { value: '+55', label: '+55 (BR)' },
  { value: '+91', label: '+91 (IN)' },
  { value: 'other', label: 'Other (+)' },
]

const DEFAULT_FORM: FormState = {
  name: '',
  conditionType: 'time',
  timeStart: '18:00',
  timeEnd: '08:00',
  daysOfWeek: [...WEEKDAYS],
  keywords: [],
  forwardLabel: '',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDays(days: number[] | null): string {
  if (!days || days.length === 0) return 'no days'
  if (days.length === 7) return 'every day'
  const s = [...days].sort((a, b) => a - b)
  if (JSON.stringify(s) === '[1,2,3,4,5]') return 'weekdays'
  if (JSON.stringify(s) === '[0,6]') return 'weekends'
  return s.map(d => DAY_LABELS[d]).join(', ')
}

function ruleSummary(rule: ForwardingRule): string {
  const dest = rule.forward_label || rule.forward_to
  switch (rule.condition_type) {
    case 'time':
      return `${rule.time_start || '?'}–${rule.time_end || '?'} on ${formatDays(rule.days_of_week)} → ${dest}`
    case 'keyword':
      return `When caller says "${(rule.keywords ?? []).join('", "')}" → ${dest}`
    case 'known_caller':
      return `Known callers → ${dest}`
    case 'always':
      return `Always → ${dest}`
  }
}

function conditionIcon(type: ConditionType) {
  const map = { time: Clock, keyword: Tag, known_caller: Users, always: ArrowRight }
  const Icon = map[type]
  return <Icon className="size-3.5" />
}

function normalizePhone(countryCode: string, digits: string): string {
  if (countryCode === 'other') return digits.trim()
  return `${countryCode}${digits.replace(/\D/g, '')}`
}

function validateE164(phone: string): boolean {
  return /^\+[1-9]\d{9,14}$/.test(phone)
}

// ─── ToggleSwitch ─────────────────────────────────────────────────────────────

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500',
        checked ? 'bg-teal-500' : 'bg-slate-700',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0',
        )}
      />
    </button>
  )
}

// ─── TagInput ─────────────────────────────────────────────────────────────────

function TagInput({
  tags, onChange, suggestions, error,
}: {
  tags: string[]
  onChange: (t: string[]) => void
  suggestions?: string[]
  error?: string
}) {
  const [input, setInput] = useState('')

  function add(tag: string) {
    const t = tag.trim().toLowerCase()
    if (t && !tags.includes(t)) onChange([...tags, t])
    setInput('')
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && input) { e.preventDefault(); add(input) }
    else if (e.key === 'Backspace' && !input && tags.length) onChange(tags.slice(0, -1))
  }

  const unused = (suggestions ?? []).filter(s => !tags.includes(s))

  return (
    <div>
      <div className={cn(
        'flex min-h-[42px] flex-wrap items-center gap-1.5 rounded-lg border bg-slate-950 px-3 py-2 transition-colors focus-within:border-teal-500',
        error ? 'border-rose-500' : 'border-slate-700',
      )}>
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 rounded-md bg-teal-500/15 px-2 py-0.5 text-xs font-medium text-teal-300">
            {tag}
            <button type="button" onClick={() => onChange(tags.filter(t => t !== tag))}>
              <X className="size-3 hover:text-white" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => input.trim() && add(input)}
          placeholder={tags.length === 0 ? 'Type a word and press Enter' : 'Add more...'}
          className="min-w-[140px] flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
      {unused.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500">Suggestions:</span>
          {unused.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => onChange([...tags, s])}
              className="rounded-md border border-slate-700 px-2 py-0.5 text-xs text-slate-400 transition-colors hover:border-teal-500 hover:text-teal-400"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── DayPicker ────────────────────────────────────────────────────────────────

function DayPicker({ selected, onChange, error }: { selected: number[]; onChange: (d: number[]) => void; error?: string }) {
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {DAY_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() =>
              onChange(
                selected.includes(i)
                  ? selected.filter(d => d !== i)
                  : [...selected, i].sort((a, b) => a - b),
              )
            }
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
              selected.includes(i)
                ? 'border-teal-500 bg-teal-500/15 text-teal-400'
                : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  )
}

// ─── ToastList ────────────────────────────────────────────────────────────────

function ToastList({ toasts }: { toasts: ToastItem[] }) {
  if (!toasts.length) return null
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className={cn(
            'flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium shadow-2xl',
            t.type === 'success'
              ? 'border-teal-500/30 bg-teal-950 text-teal-300'
              : 'border-rose-500/30 bg-rose-950 text-rose-300',
          )}
        >
          {t.type === 'success'
            ? <Check className="size-4 shrink-0 text-teal-400" />
            : <AlertCircle className="size-4 shrink-0 text-rose-400" />}
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  initialRules: ForwardingRule[]
  plan: string
  userId: string
}

export default function ForwardingClient({ initialRules, plan, userId }: Props) {
  const supabase = createClient()

  const [rules, setRules] = useState<ForwardingRule[]>(initialRules)
  const [showBanner, setShowBanner] = useState(false)
  const [toasts, setToasts] = useState<ToastItem[]>([])

  // Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<ForwardingRule | null>(null)
  const [saving, setSaving] = useState(false)

  // Form
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [countryCode, setCountryCode] = useState('+1')
  const [phoneDigits, setPhoneDigits] = useState('')

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Drag-and-drop
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  useEffect(() => {
    if (!localStorage.getItem('nexus-fwd-banner-v1')) setShowBanner(true)
  }, [])

  // ── Helpers ───────────────────────────────────────────────────────────────

  function addToast(message: string, type: 'success' | 'error') {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }

  const computedPhone = normalizePhone(countryCode, phoneDigits)

  function patchForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (key in errors) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function parsePhoneForEdit(phone: string) {
    const found = COUNTRY_CODES.find(c => c.value !== 'other' && phone.startsWith(c.value))
    if (found) { setCountryCode(found.value); setPhoneDigits(phone.slice(found.value.length)) }
    else { setCountryCode('other'); setPhoneDigits(phone) }
  }

  function openCreate() {
    setEditingRule(null)
    setForm(DEFAULT_FORM)
    setErrors({})
    setCountryCode('+1')
    setPhoneDigits('')
    setModalOpen(true)
  }

  function openEdit(rule: ForwardingRule) {
    setEditingRule(rule)
    setForm({
      name: rule.name,
      conditionType: rule.condition_type,
      timeStart: rule.time_start ?? '18:00',
      timeEnd: rule.time_end ?? '08:00',
      daysOfWeek: rule.days_of_week ?? [...WEEKDAYS],
      keywords: rule.keywords ?? [],
      forwardLabel: rule.forward_label ?? '',
    })
    setErrors({})
    parsePhoneForEdit(rule.forward_to)
    setModalOpen(true)
  }

  function validate(): FormErrors {
    const errs: FormErrors = {}
    const name = form.name.trim()
    if (!name) errs.name = 'Rule name is required'
    else if (name.length < 3) errs.name = 'Must be at least 3 characters'
    else if (name.length > 50) errs.name = 'Must be 50 characters or fewer'

    if (!computedPhone || computedPhone === countryCode)
      errs.forwardTo = 'Phone number is required'
    else if (!validateE164(computedPhone))
      errs.forwardTo = 'Enter a valid number including country code (e.g. 555 123 4567)'

    if (form.conditionType === 'time') {
      if (!form.timeStart) errs.timeStart = 'Start time is required'
      if (!form.daysOfWeek.length) errs.daysOfWeek = 'Select at least one day'
    }
    if (form.conditionType === 'keyword' && !form.keywords.length)
      errs.keywords = 'Add at least one keyword'
    return errs
  }

  // ── CRUD ──────────────────────────────────────────────────────────────────

  async function handleSave() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    try {
      const payload = {
        name: form.name.trim(),
        condition_type: form.conditionType,
        time_start: form.conditionType === 'time' ? form.timeStart : null,
        time_end: form.conditionType === 'time' ? form.timeEnd : null,
        days_of_week: form.conditionType === 'time' ? form.daysOfWeek : null,
        keywords: form.conditionType === 'keyword' ? form.keywords : null,
        forward_to: computedPhone,
        forward_label: form.forwardLabel.trim() || null,
        updated_at: new Date().toISOString(),
      }
      if (editingRule) {
        const { error } = await supabase.from('forwarding_rules').update(payload).eq('id', editingRule.id)
        if (error) throw error
        setRules(prev => prev.map(r => r.id === editingRule.id ? { ...r, ...payload } : r))
        addToast('Rule saved', 'success')
      } else {
        const { data, error } = await supabase
          .from('forwarding_rules')
          .insert({ ...payload, user_id: userId, is_active: true, priority: rules.length + 1 })
          .select()
          .single()
        if (error) throw error
        setRules(prev => [...prev, data as ForwardingRule])
        addToast('Rule created', 'success')
      }
      setModalOpen(false)
    } catch {
      addToast("Couldn't save rule — please try again", 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleToggle(id: string, current: boolean) {
    setRules(prev => prev.map(r => r.id === id ? { ...r, is_active: !current } : r))
    const { error } = await supabase.from('forwarding_rules').update({ is_active: !current }).eq('id', id)
    if (error) {
      setRules(prev => prev.map(r => r.id === id ? { ...r, is_active: current } : r))
      addToast("Couldn't update rule — please try again", 'error')
    } else {
      addToast(!current ? 'Rule activated' : 'Rule paused', 'success')
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    const { error } = await supabase.from('forwarding_rules').delete().eq('id', deleteId)
    if (error) {
      addToast("Couldn't delete rule — please try again", 'error')
    } else {
      setRules(prev => prev.filter(r => r.id !== deleteId))
      addToast('Rule deleted', 'success')
    }
    setDeleteId(null)
    setDeleting(false)
  }

  // ── Drag-and-drop ─────────────────────────────────────────────────────────

  async function handleDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return
    const next = [...rules]
    const from = next.findIndex(r => r.id === draggedId)
    const to = next.findIndex(r => r.id === targetId)
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    const updated = next.map((r, i) => ({ ...r, priority: i + 1 }))
    setRules(updated)
    setDraggedId(null)
    setDragOverId(null)
    try {
      await Promise.all(
        updated.map(r => supabase.from('forwarding_rules').update({ priority: r.priority }).eq('id', r.id))
      )
    } catch {
      addToast("Couldn't save order — please try again", 'error')
      setRules(rules)
    }
  }

  // ── Tier guard ────────────────────────────────────────────────────────────

  if (!['pro', 'scale', 'custom'].includes(plan)) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="text-lg font-bold tracking-tight">
              NEXUS<span className="text-teal-400">.</span>
            </Link>
            <Link href="/logout" className="text-sm text-slate-400 transition-colors hover:text-white">
              Sign out
            </Link>
          </div>
        </header>
        <main className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900">
            <Lock className="size-7 text-slate-400" />
          </div>
          <h1 className="mb-3 text-2xl font-bold">Smart Forwarding is a Pro feature</h1>
          <p className="mb-8 max-w-sm text-slate-400">
            Upgrade to Pro to set custom rules for when, why, and who gets urgent calls.
          </p>
          <Link
            href="/checkout?plan=pro&redirect=/dashboard/forwarding-rules"
            className="rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Upgrade to Pro
          </Link>
          <Link href="/#pricing" className="mt-4 text-sm text-slate-500 transition-colors hover:text-slate-300">
            Learn more about Pro features
          </Link>
        </main>
      </div>
    )
  }

  // ── Full page ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-lg font-bold tracking-tight">
              NEXUS<span className="text-teal-400">.</span>
            </Link>
            <span className="hidden text-slate-700 sm:inline">/</span>
            <span className="hidden text-sm text-slate-400 sm:inline">Smart Call Forwarding</span>
          </div>
          <Link href="/logout" className="text-sm text-slate-400 transition-colors hover:text-white">
            Sign out
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Page title row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <PhoneForwarded className="size-4 text-teal-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                Smart Call Forwarding
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Smart Call Forwarding</h1>
            <p className="mt-1 text-slate-400">Tell AVA when to send urgent calls straight to a real person</p>
          </div>
          <button
            onClick={openCreate}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            <Plus className="size-4" />
            New Rule
          </button>
        </div>

        {/* Info banner */}
        {showBanner && (
          <div className="mb-8 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <Info className="size-4 shrink-0 text-teal-400" />
                <p className="text-sm font-semibold text-white">How forwarding rules work</p>
              </div>
              <button
                onClick={() => { setShowBanner(false); localStorage.setItem('nexus-fwd-banner-v1', '1') }}
                className="text-xs font-medium text-slate-400 transition-colors hover:text-white"
              >
                Got it
              </button>
            </div>
            <p className="mb-4 text-sm text-slate-400">
              AVA checks your rules in priority order. The first matching rule wins. If no rule matches, AVA takes a message as normal.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { icon: '⏰', label: 'After-hours emergencies → on-call maintenance' },
                { icon: '🔑', label: "If caller says 'leak' or 'urgent' → maintenance" },
                { icon: '⭐', label: 'Known clients → forward to office line' },
              ].map(ex => (
                <div key={ex.label} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5">
                  <p className="text-xs text-slate-300">
                    <span className="mr-1.5">{ex.icon}</span>{ex.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {rules.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-20 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900">
              <PhoneForwarded className="size-6 text-slate-500" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-white">No forwarding rules yet</h2>
            <p className="mb-6 max-w-xs text-sm text-slate-400">
              AVA will take messages for every call until you add a rule.
            </p>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              <Plus className="size-4" />
              Create your first rule
            </button>
          </div>
        )}

        {/* Rules list */}
        {rules.length > 0 && (
          <>
            <div className="flex flex-col gap-3">
              {rules.map(rule => (
                <div
                  key={rule.id}
                  draggable
                  onDragStart={() => setDraggedId(rule.id)}
                  onDragOver={e => { e.preventDefault(); setDragOverId(rule.id) }}
                  onDrop={e => { e.preventDefault(); handleDrop(rule.id) }}
                  onDragEnd={() => { setDraggedId(null); setDragOverId(null) }}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border p-4 transition-all',
                    dragOverId === rule.id && draggedId !== rule.id
                      ? 'border-teal-500 bg-teal-500/5'
                      : rule.is_active
                      ? 'border-slate-700 bg-slate-900'
                      : 'border-slate-800 bg-slate-900/40 opacity-60',
                    draggedId === rule.id && 'opacity-40 scale-[0.99]',
                  )}
                >
                  {/* Drag handle — desktop only */}
                  <div className="hidden cursor-grab text-slate-600 hover:text-slate-400 active:cursor-grabbing sm:block shrink-0">
                    <GripVertical className="size-5" />
                  </div>

                  {/* Toggle */}
                  <div className="shrink-0">
                    <ToggleSwitch checked={rule.is_active} onChange={() => handleToggle(rule.id, rule.is_active)} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold text-white">{rule.name}</p>
                      <span className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                        {conditionIcon(rule.condition_type)}
                        <span className="capitalize">{rule.condition_type.replace('_', ' ')}</span>
                      </span>
                      {!rule.is_active && (
                        <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-500">
                          Paused
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-slate-400">{ruleSummary(rule)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => openEdit(rule)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                      title="Edit rule"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(rule.id)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                      title="Delete rule"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-600">
              Drag rules to reorder priority. AVA checks top to bottom — first match wins.
            </p>
          </>
        )}
      </main>

      {/* ── Rule Modal ──────────────────────────────────────────────────────── */}
      <Dialog open={modalOpen} onOpenChange={(open: boolean) => !saving && setModalOpen(open)}>
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[95vh] flex-col overflow-hidden border border-slate-700 bg-slate-900 p-0 text-white sm:max-w-2xl"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-6 py-4">
            <h2 className="text-base font-bold text-white">
              {editingRule ? 'Edit rule' : 'New forwarding rule'}
            </h2>
            <button
              onClick={() => setModalOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">

            {/* Rule name */}
            <div className="space-y-1.5">
              <Label htmlFor="rule-name" className="text-sm font-medium text-white">
                What should we call this rule? <span className="text-rose-400">*</span>
              </Label>
              <Input
                id="rule-name"
                value={form.name}
                onChange={e => patchForm('name', e.target.value)}
                placeholder="e.g. After-hours emergencies"
                aria-invalid={!!errors.name}
                className={cn(
                  'bg-slate-950 text-white placeholder:text-slate-500',
                  errors.name ? 'border-rose-500' : 'border-slate-700 focus:border-teal-500',
                )}
              />
              {errors.name
                ? <p className="text-xs text-rose-400">{errors.name}</p>
                : <p className="text-xs text-slate-500">Just a name for you — AVA doesn't say this to callers</p>
              }
            </div>

            {/* Condition type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">
                When should AVA forward? <span className="text-rose-400">*</span>
              </Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {([
                  { value: 'time',         icon: '⏰', label: 'Based on time of day' },
                  { value: 'keyword',      icon: '🔑', label: 'Caller mentions specific words' },
                  { value: 'known_caller', icon: '⭐', label: 'When a known caller phones' },
                  { value: 'always',       icon: '🔄', label: 'Always forward this caller type' },
                ] as const).map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => patchForm('conditionType', opt.value)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                      form.conditionType === opt.value
                        ? 'border-teal-500 bg-teal-500/10 text-white'
                        : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600',
                    )}
                  >
                    <span className="text-base leading-none">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time condition fields */}
            {form.conditionType === 'time' && (
              <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="time-start" className="text-xs font-medium text-slate-400">From</Label>
                    <input
                      id="time-start"
                      type="time"
                      value={form.timeStart}
                      onChange={e => { patchForm('timeStart', e.target.value); setErrors(p => ({ ...p, timeStart: undefined })) }}
                      className={cn(
                        'w-full rounded-lg border bg-slate-950 px-3 py-2 text-sm text-white focus:border-teal-500 focus:outline-none',
                        errors.timeStart ? 'border-rose-500' : 'border-slate-700',
                      )}
                    />
                    {errors.timeStart && <p className="text-xs text-rose-400">{errors.timeStart}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="time-end" className="text-xs font-medium text-slate-400">To</Label>
                    <input
                      id="time-end"
                      type="time"
                      value={form.timeEnd}
                      onChange={e => patchForm('timeEnd', e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-slate-400">On these days</Label>
                  <DayPicker
                    selected={form.daysOfWeek}
                    onChange={d => { patchForm('daysOfWeek', d); setErrors(p => ({ ...p, daysOfWeek: undefined })) }}
                    error={errors.daysOfWeek}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  AVA will forward calls that arrive during these hours and days.
                </p>
              </div>
            )}

            {/* Keyword condition fields */}
            {form.conditionType === 'keyword' && (
              <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <Label className="text-xs font-medium text-slate-400">Keywords to listen for</Label>
                <TagInput
                  tags={form.keywords}
                  onChange={tags => { patchForm('keywords', tags); setErrors(p => ({ ...p, keywords: undefined })) }}
                  suggestions={KEYWORD_SUGGESTIONS}
                  error={errors.keywords}
                />
                <p className="text-xs text-slate-500">
                  AVA checks what the caller is calling about. Keep keywords specific — more keywords means more calls get forwarded.
                </p>
              </div>
            )}

            <div className="border-t border-slate-800" />

            {/* Forward-to phone */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-white">
                Where to forward? <span className="text-rose-400">*</span>
              </Label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={e => { setCountryCode(e.target.value); setErrors(p => ({ ...p, forwardTo: undefined })) }}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-teal-500 focus:outline-none"
                >
                  {COUNTRY_CODES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phoneDigits}
                  onChange={e => { setPhoneDigits(e.target.value); setErrors(p => ({ ...p, forwardTo: undefined })) }}
                  placeholder={countryCode === 'other' ? '+1 555 123 4567 (full number)' : '555 123 4567'}
                  className={cn(
                    'flex-1 rounded-lg border bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none',
                    errors.forwardTo ? 'border-rose-500' : 'border-slate-700',
                  )}
                />
              </div>
              {errors.forwardTo && <p className="text-xs text-rose-400">{errors.forwardTo}</p>}
            </div>

            {/* Forward label */}
            <div className="space-y-1.5">
              <Label htmlFor="forward-label" className="text-sm font-medium text-white">
                How should AVA describe this number to the caller?
              </Label>
              <Input
                id="forward-label"
                value={form.forwardLabel}
                onChange={e => patchForm('forwardLabel', e.target.value)}
                placeholder="e.g. on-call maintenance, owner's mobile, emergency line"
                className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-teal-500"
              />
              <p className="text-xs text-slate-500">
                AVA will say &ldquo;I&rsquo;m transferring you to <em>[this label]</em> now&rdquo;
              </p>
            </div>

            {/* Priority note — edit only */}
            {editingRule && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                <p className="text-xs text-slate-400">
                  This rule is currently{' '}
                  <span className="font-semibold text-white">
                    #{rules.findIndex(r => r.id === editingRule.id) + 1} of {rules.length}
                  </span>
                  {' '}in priority order. Drag rules in the list to reorder.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-800 px-6 py-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              disabled={saving}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && <Spinner />}
              Save Rule
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ──────────────────────────────────────────────────── */}
      <Dialog open={!!deleteId} onOpenChange={(open: boolean) => !open && setDeleteId(null)}>
        <DialogContent
          showCloseButton={false}
          className="border border-slate-700 bg-slate-900 p-0 text-white sm:max-w-sm"
        >
          <div className="px-6 py-6">
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10">
              <Trash2 className="size-5 text-rose-400" />
            </div>
            <h2 className="mb-2 text-base font-bold text-white">Delete this rule?</h2>
            <p className="text-sm text-slate-400">
              AVA will stop using this rule immediately. This can&apos;t be undone.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-slate-800 px-6 py-4">
            <button
              onClick={() => setDeleteId(null)}
              disabled={deleting}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-600 disabled:opacity-50"
            >
              {deleting && <Spinner />}
              Delete Rule
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toasts */}
      <ToastList toasts={toasts} />
    </div>
  )
}
