import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MessageItem from './MessageItem'
import { MessageSquare } from 'lucide-react'

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: messages } = await supabase
    .from('appointments')
    .select('id, caller_name, caller_number, message, status, created_at, handled_at')
    .eq('user_id', data.claims.sub)
    .eq('type', 'message')
    .order('status', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(50)

  const msgs = messages ?? []
  const pending = msgs.filter(m => m.status === 'pending')
  const handled = msgs.filter(m => m.status !== 'pending')

  return (
    <div className="px-4 py-8 max-w-4xl sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-slate-400">
          {pending.length > 0 ? `${pending.length} unread message${pending.length > 1 ? 's' : ''}` : 'All messages handled'}
        </p>
      </div>

      {msgs.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">
          <MessageSquare className="size-10 text-slate-700 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No messages yet</p>
          <p className="text-xs text-slate-600 mt-1">Messages left by callers will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Unread</p>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden divide-y divide-slate-800">
                {pending.map(m => <MessageItem key={m.id} item={m} />)}
              </div>
            </div>
          )}
          {handled.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">Handled</p>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden divide-y divide-slate-800">
                {handled.map(m => <MessageItem key={m.id} item={m} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
