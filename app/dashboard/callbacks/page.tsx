import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CallbackItem from './CallbackItem'
import { PhoneCall } from 'lucide-react'

export default async function CallbacksPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: callbacks } = await supabase
    .from('appointments')
    .select('id, caller_name, caller_number, message, status, created_at, handled_at')
    .eq('user_id', data.claims.sub)
    .eq('type', 'callback')
    .order('status', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(50)

  const cbs = callbacks ?? []
  const pending = cbs.filter(c => c.status === 'pending')
  const handled = cbs.filter(c => c.status !== 'pending')

  return (
    <div className="px-4 py-8 max-w-4xl sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Callbacks</h1>
        <p className="mt-1 text-sm text-slate-400">
          {pending.length > 0 ? `${pending.length} caller${pending.length > 1 ? 's' : ''} waiting for a callback` : 'All callbacks handled'}
        </p>
      </div>

      {cbs.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">
          <PhoneCall className="size-10 text-slate-700 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No callback requests yet</p>
          <p className="text-xs text-slate-600 mt-1">Callback requests from callers will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Pending</p>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden divide-y divide-slate-800">
                {pending.map(c => <CallbackItem key={c.id} item={c} />)}
              </div>
            </div>
          )}
          {handled.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">Done</p>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden divide-y divide-slate-800">
                {handled.map(c => <CallbackItem key={c.id} item={c} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
