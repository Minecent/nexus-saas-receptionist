'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Phone, Check } from 'lucide-react'

type Callback = {
  id: string
  caller_name: string | null
  caller_number: string | null
  message: string | null
  status: string | null
  created_at: string
  handled_at: string | null
}

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function CallbackItem({ item }: { item: Callback }) {
  const [status, setStatus] = useState(item.status ?? 'pending')
  const [loading, setLoading] = useState(false)
  const isPending = status === 'pending'

  const markHandled = async () => {
    setLoading(true)
    try {
      await fetch(`/api/appointments/${item.id}/handle`, { method: 'PATCH' })
      setStatus('handled')
    } catch { /* non-fatal */ } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('px-5 py-4 flex items-start gap-4', isPending && 'bg-slate-800/20')}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {isPending && <span className="size-2 rounded-full bg-amber-400 shrink-0" />}
          <p className={cn('text-sm font-medium', isPending ? 'text-white' : 'text-slate-400')}>
            {item.caller_name ?? 'Unknown caller'}
          </p>
          <span className="text-xs text-slate-600">{formatRelative(item.created_at)}</span>
        </div>
        {item.caller_number && (
          <a href={`tel:${item.caller_number}`} className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium mt-0.5 mb-1">
            <Phone className="size-3" /> {item.caller_number}
          </a>
        )}
        {item.message && <p className="text-xs text-slate-500">{item.message}</p>}
      </div>
      {isPending && (
        <button
          onClick={markHandled}
          disabled={loading}
          className="shrink-0 flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-teal-500 hover:text-teal-400 transition-colors disabled:opacity-50"
        >
          <Check className="size-3" /> {loading ? 'Saving…' : 'Called back'}
        </button>
      )}
    </div>
  )
}
