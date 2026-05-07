import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BookingsTable from './BookingsTable'

export default async function BookingsPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: bookings } = await supabase
    .from('appointments')
    .select('id, caller_name, caller_number, caller_email, service_type, preferred_time, message, status, gcal_event_id, created_at')
    .eq('user_id', data.claims.sub)
    .eq('type', 'appointment')
    .order('preferred_time', { ascending: false })
    .limit(50)

  return (
    <div className="px-4 py-8 max-w-6xl sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="mt-1 text-sm text-slate-400">All appointments booked by AVA</p>
      </div>
      <BookingsTable bookings={bookings ?? []} />
    </div>
  )
}
