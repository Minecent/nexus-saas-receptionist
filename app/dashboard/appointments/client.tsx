"use client";

import { useState } from 'react'
import { Check, X, Phone, Calendar, MessageSquare, PhoneCall } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface Appointment {
  id: string
  caller_name: string | null
  caller_number: string | null
  service_type: string | null
  preferred_time: string | null
  message: string | null
  type: 'appointment' | 'message' | 'callback'
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

const TYPE_STYLES = {
  appointment: { icon: Calendar,      label: 'Appointment', color: 'text-teal-400',  bg: 'bg-teal-500/10 border-teal-500/20' },
  message:     { icon: MessageSquare, label: 'Message',     color: 'text-blue-400',  bg: 'bg-blue-500/10 border-blue-500/20' },
  callback:    { icon: PhoneCall,     label: 'Callback',    color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
}

const STATUS_STYLES = {
  pending:   'bg-slate-500/10 text-slate-400 border-slate-500/20',
  confirmed: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const FILTERS = ['all', 'pending', 'confirmed', 'cancelled'] as const

function formatDate(d: string) {
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function AppointmentsClient({ appointments: initial }: { appointments: Appointment[] }) {
  const supabase = createClient()
  const [appointments, setAppointments] = useState(initial)
  const [filter, setFilter] = useState<typeof FILTERS[number]>('all')
  const [updating, setUpdating] = useState<string | null>(null)

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter)

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    setUpdating(id)
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)

    if (!error) {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    }
    setUpdating(null)
  }

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
            {f} ({f === 'all' ? appointments.length : appointments.filter(a => a.status === f).length})
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 py-12 text-center text-sm text-slate-500">
          No {filter} items.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(appt => {
            const typeInfo = TYPE_STYLES[appt.type] ?? TYPE_STYLES.message
            const Icon = typeInfo.icon

            return (
              <div
                key={appt.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={cn('mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border', typeInfo.bg)}>
                      <Icon className={cn('size-4', typeInfo.color)} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-white">
                          {appt.caller_name ?? 'Unknown caller'}
                        </p>
                        <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', typeInfo.bg, typeInfo.color)}>
                          {typeInfo.label}
                        </span>
                        <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border capitalize', STATUS_STYLES[appt.status])}>
                          {appt.status}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1">
                        {appt.caller_number && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Phone className="size-3 shrink-0" />
                            <span className="font-mono">{appt.caller_number}</span>
                          </div>
                        )}
                        {appt.service_type && (
                          <p className="text-xs text-slate-400">
                            <span className="text-slate-500">Service:</span> {appt.service_type}
                          </p>
                        )}
                        {appt.preferred_time && (
                          <p className="text-xs text-slate-400">
                            <span className="text-slate-500">Time:</span> {appt.preferred_time}
                          </p>
                        )}
                        {appt.message && (
                          <p className="text-xs text-slate-400">
                            <span className="text-slate-500">Message:</span> {appt.message}
                          </p>
                        )}
                        <p className="text-xs text-slate-600">{formatDate(appt.created_at)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {appt.status === 'pending' && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => updateStatus(appt.id, 'confirmed')}
                        disabled={updating === appt.id}
                        className="flex items-center gap-1.5 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-400 hover:bg-teal-500/20 transition-colors disabled:opacity-50"
                      >
                        <Check className="size-3" />
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(appt.id, 'cancelled')}
                        disabled={updating === appt.id}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-400 hover:border-red-500/30 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <X className="size-3" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
