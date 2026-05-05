import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PhoneOff } from 'lucide-react'
import CallsClient from './client'

export default async function CallsPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: calls } = await supabase
    .from('calls')
    .select('*')
    .eq('user_id', data.claims.sub)
    .order('started_at', { ascending: false })
    .limit(100)

  return (
    <div className="px-6 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Calls</h1>
        <p className="mt-1 text-sm text-slate-400">Full call history with transcripts and summaries</p>
      </div>

      {!calls || calls.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">
          <PhoneOff className="size-10 text-slate-700 mx-auto mb-4" />
          <p className="font-medium text-slate-400">No calls yet</p>
          <p className="text-sm text-slate-600 mt-1">
            Calls will appear here once your NEXUS number is active.
          </p>
        </div>
      ) : (
        <CallsClient calls={calls} />
      )}
    </div>
  )
}
