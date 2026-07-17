"use client";

import { useEffect, useState } from 'react'
import { Phone, Clock, ChevronDown, ChevronUp, Download, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface Call {
  id: string
  caller_number: string | null
  duration_seconds: number | null
  status: string
  transcript: string | null
  summary: string | null
  recording_url: string | null
  started_at: string | null
  ended_at: string | null
}

const STATUS_STYLES: Record<string, string> = {
  completed:   'bg-teal-500/10 text-teal-400 border-teal-500/20',
  missed:      'bg-red-500/10 text-red-400 border-red-500/20',
  transferred: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  voicemail:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  in_progress: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const FILTERS = ['all', 'completed', 'missed', 'transferred', 'voicemail'] as const

function formatDuration(s: number) {
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60); const r = s % 60
  return r > 0 ? `${m}m ${r}s` : `${m}m`
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  })
}

export default function CallsClient({ calls }: { calls: Call[] }) {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = filter === 'all' ? calls : calls.filter(c => c.status === filter)

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors',
              filter === f
                ? 'border-teal-500/40 bg-teal-500/10 text-teal-400'
                : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white'
            )}
          >
            {f}
            {f === 'all'
              ? ` (${calls.length})`
              : ` (${calls.filter(c => c.status === f).length})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">No calls match this filter.</div>
        ) : filtered.map((call, i) => (
          <div key={call.id} className={cn(i < filtered.length - 1 && 'border-b border-slate-800')}>
            {/* Row */}
            <button
              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-800/50 transition-colors text-left"
              onClick={() => setExpanded(expanded === call.id ? null : call.id)}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-800">
                <Phone className="size-3.5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {call.caller_number ?? 'Unknown caller'}
                </p>
                {call.summary ? (
                  <p className="text-xs text-slate-500 truncate mt-0.5">{call.summary}</p>
                ) : (
                  <p className="text-xs text-slate-600 mt-0.5 italic">No summary</p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {call.duration_seconds != null && (
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="size-3" />
                    {formatDuration(call.duration_seconds)}
                  </span>
                )}
                <span className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-full border capitalize',
                  STATUS_STYLES[call.status] ?? STATUS_STYLES.completed
                )}>
                  {call.status}
                </span>
                <span className="text-xs text-slate-600 hidden sm:block w-28 text-right">
                  {call.started_at ? formatDate(call.started_at) : '—'}
                </span>
                {expanded === call.id
                  ? <ChevronUp className="size-4 text-slate-500" />
                  : <ChevronDown className="size-4 text-slate-500" />}
              </div>
            </button>

            {/* Expanded: transcript + recording */}
            {expanded === call.id && (
              <div className="px-5 pb-5 space-y-4 border-t border-slate-800 bg-slate-950/50">
                {call.recording_url && <SecureRecording callId={call.id} />}

                {call.transcript ? (
                  <div className={call.recording_url ? '' : 'pt-4'}>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                      Transcript
                    </p>
                    <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 max-h-64 overflow-y-auto">
                      <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                        {call.transcript}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={cn('pt-4', call.recording_url && 'pt-0')}>
                    <p className="text-xs text-slate-600 italic">No transcript available for this call.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SecureRecording({ callId }: { callId: string }) {
  const [src, setSrc] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let objectUrl: string | null = null
    let cancelled = false

    async function load() {
      try {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) { setError(true); return }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-recording?call_id=${callId}`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        )
        if (!res.ok) { setError(true); return }
        const blob = await res.blob()
        objectUrl = URL.createObjectURL(blob)
        if (!cancelled) setSrc(objectUrl)
      } catch {
        if (!cancelled) setError(true)
      }
    }
    load()

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [callId])

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Mic className="size-3" /> Recording
        </p>
        {src && (
          <a
            href={src}
            download="recording.wav"
            className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300"
          >
            <Download className="size-3" /> Download
          </a>
        )}
      </div>
      {error ? (
        <p className="text-xs text-slate-600 italic">Recording unavailable.</p>
      ) : src ? (
        <audio controls src={src} className="w-full h-8 rounded-lg" />
      ) : (
        <p className="text-xs text-slate-500 italic">Loading recording…</p>
      )}
    </div>
  )
}
