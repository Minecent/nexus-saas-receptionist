import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import VapiWidget from './VapiWidget'
import { Mic, AlertTriangle } from 'lucide-react'

export default async function TestAvaPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const { data: config } = await supabase
    .from('agent_config')
    .select('vapi_assistant_id, agent_name, business_name')
    .eq('user_id', data.claims.sub)
    .single()

  return (
    <div className="px-4 py-8 max-w-2xl sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Test AVA</h1>
        <p className="mt-1 text-sm text-slate-400">
          Talk to {config?.agent_name ?? 'AVA'} live in your browser
        </p>
      </div>

      {!config?.vapi_assistant_id ? (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center">
          <AlertTriangle className="size-8 text-amber-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-white">Assistant not provisioned yet</p>
          <p className="text-xs text-slate-400 mt-2">
            Your AI assistant is still being set up. Check back in a few minutes or contact support.
          </p>
        </div>
      ) : !process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ? (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center">
          <Mic className="size-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-white">Vapi public key not configured</p>
          <p className="text-xs text-slate-400 mt-2">
            Add <code className="text-slate-300 bg-slate-800 px-1 py-0.5 rounded">NEXT_PUBLIC_VAPI_PUBLIC_KEY</code> to your Vercel env vars to enable browser testing.
          </p>
        </div>
      ) : (
        <VapiWidget
          assistantId={config.vapi_assistant_id}
          agentName={config.agent_name ?? 'AVA'}
          businessName={config.business_name ?? ''}
        />
      )}

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
        <p className="text-xs text-slate-500 leading-relaxed">
          Each test call uses Vapi minutes from your account. Keep tests short to avoid unexpected costs.
        </p>
      </div>
    </div>
  )
}
