import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import VapiWidget from './VapiWidget'
import RecentTestCalls from './RecentTestCalls'
import { Mic, AlertTriangle } from 'lucide-react'
import { TEST_CALL_LIMITS, DEFAULT_TEST_CALL_LIMITS } from '@/lib/config'

export default async function TestAvaPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')
  const userId = data.claims.sub

  const { data: config } = await supabase
    .from('agent_config')
    .select('vapi_assistant_id, agent_name, business_name, selected_plan')
    .eq('user_id', userId)
    .single()

  const plan = config?.selected_plan ?? 'lite'
  const limits = TEST_CALL_LIMITS[plan] ?? DEFAULT_TEST_CALL_LIMITS

  const currentMonth = new Date().toISOString().slice(0, 7)
  const { count: testCallsUsed } = await supabase
    .from('test_call_usage')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('month_year', currentMonth)

  const { data: recentCalls } = await supabase
    .from('test_call_usage')
    .select('id, started_at, duration_seconds, transcript, summary')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(5)

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
          <p className="text-sm font-medium text-white">Browser testing not configured</p>
          <p className="text-xs text-slate-400 mt-2">
            Browser calling is not enabled on this environment. Contact support if you expected this to work.
          </p>
        </div>
      ) : (
        <VapiWidget
          assistantId={config.vapi_assistant_id}
          agentName={config.agent_name ?? 'AVA'}
          businessName={config.business_name ?? ''}
          plan={plan}
          testCallsUsed={testCallsUsed ?? 0}
          testCallsLimit={limits.calls}
          maxSeconds={limits.maxDurationSeconds}
        />
      )}

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
        <p className="text-xs text-slate-500 leading-relaxed">
          Each test call counts toward your monthly test call allowance. Keep tests short and focused for the best results.
        </p>
      </div>

      {recentCalls && recentCalls.length > 0 && (
        <div className="mt-8">
          <RecentTestCalls calls={recentCalls} />
        </div>
      )}
    </div>
  )
}
