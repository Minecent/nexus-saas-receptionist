import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CalendarOff } from 'lucide-react'
import AppointmentsClient from './client'

export default async function AppointmentsPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', data.claims.sub)
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="px-6 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Appointments & Messages</h1>
        <p className="mt-1 text-sm text-slate-400">
          Captured by your AI receptionist during calls
        </p>
      </div>

      {!appointments || appointments.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">
          <CalendarOff className="size-10 text-slate-700 mx-auto mb-4" />
          <p className="font-medium text-slate-400">No appointments yet</p>
          <p className="text-sm text-slate-600 mt-1">
            When callers book appointments or leave messages, they will appear here.
          </p>
        </div>
      ) : (
        <AppointmentsClient appointments={appointments} />
      )}
    </div>
  )
}
