import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TestCall = {
  id: string
  started_at: string
  duration_seconds: number
  transcript: string | null
  summary: string | null
}

function fmt(seconds: number) {
  if (seconds < 60) return `${seconds}s`
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function statusBadge(duration: number) {
  if (duration < 5) return { label: 'Too short', cls: 'bg-slate-700 text-slate-400' }
  return { label: 'Completed', cls: 'bg-teal-500/10 text-teal-400' }
}

function TranscriptBlock({ text }: { text: string }) {
  const lines = text.split('\n').filter(Boolean)
  return (
    <div className="mt-3 space-y-1.5 border-t border-slate-800 pt-3">
      {lines.map((line, i) => {
        const isAva = line.toLowerCase().startsWith('ava:') || line.toLowerCase().startsWith('assistant:')
        return (
          <div key={i} className={cn('flex gap-2', isAva ? 'justify-start' : 'justify-end')}>
            <div className={cn(
              'max-w-sm rounded-xl px-3 py-1.5 text-xs',
              isAva ? 'bg-slate-800 text-slate-200' : 'bg-teal-500/15 text-teal-100'
            )}>
              {line}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function RecentTestCalls({ calls }: { calls: TestCall[] }) {
  if (calls.length === 0) return null

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Recent test calls</p>
      {calls.map(call => {
        const badge = statusBadge(call.duration_seconds)
        return (
          <details key={call.id} className="group rounded-2xl border border-slate-800 bg-slate-900">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3.5 select-none">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-white">{fmtDate(call.started_at)}</span>
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', badge.cls)}>
                    {badge.label}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock className="size-3 text-slate-600" />
                  <span className="text-xs text-slate-500">{fmt(call.duration_seconds)}</span>
                </div>
              </div>
              {call.transcript && (
                <span className="text-xs text-teal-400 group-open:hidden shrink-0">View transcript</span>
              )}
              {call.transcript && (
                <span className="text-xs text-teal-400 hidden group-open:block shrink-0">Hide</span>
              )}
            </summary>

            {call.transcript && (
              <div className="px-5 pb-4">
                {call.summary && (
                  <p className="text-xs text-slate-400 mb-2 italic">{call.summary}</p>
                )}
                <TranscriptBlock text={call.transcript} />
              </div>
            )}
            {!call.transcript && (
              <div className="px-5 pb-4">
                <p className="text-xs text-slate-600">Transcript not available for this call.</p>
              </div>
            )}
          </details>
        )
      })}
    </div>
  )
}
