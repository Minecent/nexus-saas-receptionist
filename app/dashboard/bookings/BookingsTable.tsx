'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CalendarDays, ExternalLink } from 'lucide-react'

type Booking = {
  id: string
  caller_name: string | null
  caller_number: string | null
  caller_email: string | null
  service_type: string | null
  preferred_time: string | null
  preferred_time_iso: string | null
  preferred_time_human: string | null
  message: string | null
  status: string | null
  gcal_event_id: string | null
  created_at: string
}

function formatDateTime(iso: string | null) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function renderBookingTime(b: Booking) {
  if (b.preferred_time_iso) return formatDateTime(b.preferred_time_iso)
  if (b.preferred_time_human) return <span className="italic text-slate-400">as said: &ldquo;{b.preferred_time_human}&rdquo;</span>
  return formatDateTime(b.preferred_time)
}

const STATUS_STYLES: Record<string, string> = {
  confirmed:  'bg-teal-500/10 text-teal-400',
  cancelled:  'bg-red-500/10 text-red-400',
  rescheduled:'bg-blue-500/10 text-blue-400',
  pending:    'bg-slate-700 text-slate-300',
}

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  const filtered = bookings.filter(b => {
    if (statusFilter && b.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (b.caller_name ?? '').toLowerCase().includes(q) ||
             (b.caller_number ?? '').toLowerCase().includes(q) ||
             (b.service_type ?? '').toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name, number, service…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 w-64"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">
          <CalendarDays className="size-10 text-slate-700 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No bookings found</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Caller</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Service</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Time</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Calendar</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.id} className={cn('border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors', i === filtered.length - 1 && 'border-0')}>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-white">{b.caller_name ?? 'Unknown'}</p>
                      {b.caller_number && (
                        <a href={`tel:${b.caller_number}`} className="text-xs text-slate-500 hover:text-teal-400 transition-colors">
                          {b.caller_number}
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">{b.service_type ?? '—'}</td>
                    <td className="px-5 py-3.5 text-slate-300 whitespace-nowrap">{renderBookingTime(b)}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full capitalize', STATUS_STYLES[b.status ?? ''] ?? STATUS_STYLES.pending)}>
                        {b.status ?? 'pending'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {b.gcal_event_id ? (
                        <span className="text-xs text-teal-400 flex items-center gap-1">
                          <ExternalLink className="size-3" /> Synced
                        </span>
                      ) : (
                        <span className="text-xs text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="text-xs text-slate-600">{filtered.length} booking{filtered.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
