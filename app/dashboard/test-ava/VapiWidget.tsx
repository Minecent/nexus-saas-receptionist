'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Mic, MicOff, Phone, PhoneOff, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type VapiInstance = {
  start: (assistantId: string) => void
  stop: () => void
  on: (event: string, cb: (...args: unknown[]) => void) => void
}

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function VapiWidget({
  assistantId,
  agentName,
  businessName,
  plan,
  testCallsUsed,
  testCallsLimit,
  maxSeconds,
}: {
  assistantId: string
  agentName: string
  businessName: string
  plan: string
  testCallsUsed: number
  testCallsLimit: number
  maxSeconds: number
}) {
  const router = useRouter()
  const supabase = createClient()
  const vapiRef = useRef<VapiInstance | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([])
  const transcriptRef = useRef<HTMLDivElement>(null)

  const remaining = testCallsLimit - testCallsUsed
  const isLimitReached = remaining <= 0

  // Reset day of next month
  const now = new Date()
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  useEffect(() => {
    import('@vapi-ai/web').then(({ default: Vapi }) => {
      const v = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!) as unknown as VapiInstance
      v.on('call-start', () => {
        setIsCallActive(true)
        setIsLoading(false)
        startTimeRef.current = Date.now()
      })
      v.on('call-end', async () => {
        setIsCallActive(false)
        setIsLoading(false)
        const duration = startTimeRef.current
          ? Math.round((Date.now() - startTimeRef.current) / 1000)
          : 0
        startTimeRef.current = null
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('test_call_usage').insert({
            user_id: user.id,
            duration_seconds: duration,
            month_year: new Date().toISOString().slice(0, 7),
          })
        }
        router.refresh()
      })
      v.on('message', (m: unknown) => {
        const msg = m as { type?: string; transcriptType?: string; role?: string; transcript?: string }
        if (msg.type === 'transcript' && msg.transcriptType === 'final' && msg.role && msg.transcript) {
          setTranscript(t => [...t, { role: msg.role!, text: msg.transcript! }])
        }
      })
      vapiRef.current = v
    }).catch(console.error)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown timer + auto-end
  useEffect(() => {
    if (!isCallActive) {
      setSecondsLeft(null)
      return
    }
    setSecondsLeft(maxSeconds)
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === null || prev <= 1) {
          vapiRef.current?.stop()
          clearInterval(interval)
          return null
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isCallActive, maxSeconds])

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [transcript])

  const toggleCall = () => {
    if (!vapiRef.current || isLimitReached) return
    if (isCallActive) {
      vapiRef.current.stop()
    } else {
      setIsLoading(true)
      setTranscript([])
      vapiRef.current.start(assistantId)
    }
  }

  const isWarning = secondsLeft !== null && secondsLeft <= 30

  return (
    <div className="space-y-4">
      {/* Usage indicator */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Test calls this month
          </span>
          <span className={cn('text-xs font-semibold', isLimitReached ? 'text-red-400' : 'text-slate-300')}>
            {testCallsUsed} / {testCallsLimit} used
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', isLimitReached ? 'bg-red-500' : 'bg-teal-500')}
            style={{ width: `${Math.min((testCallsUsed / testCallsLimit) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-600">Each test call max {Math.floor(maxSeconds / 60)} min {maxSeconds % 60 > 0 ? `${maxSeconds % 60}s` : ''} · Resets {resetDate}</p>
      </div>

      {isLimitReached ? (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center space-y-3">
          <AlertTriangle className="size-8 text-amber-400 mx-auto" />
          <p className="text-sm font-medium text-white">Test call limit reached</p>
          <p className="text-xs text-slate-400">Resets on {resetDate}</p>
          {plan === 'lite' && (
            <Link href="/dashboard/settings#subscription"
              className="inline-block mt-1 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors">
              Upgrade to Pro for more test calls →
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Call button */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 flex flex-col items-center gap-5">
            <div className={cn(
              'size-20 rounded-full flex items-center justify-center transition-all',
              isCallActive ? 'bg-red-500/20 ring-4 ring-red-500/30 animate-pulse' :
              isLoading ? 'bg-teal-500/10 ring-4 ring-teal-500/20 animate-pulse' :
              'bg-teal-500/15'
            )}>
              {isCallActive
                ? <MicOff className="size-8 text-red-400" />
                : <Mic className="size-8 text-teal-400" />
              }
            </div>

            <div className="text-center">
              <p className="font-semibold text-white">{isCallActive ? `Talking to ${agentName}…` : `Talk to ${agentName}`}</p>
              <p className="text-xs text-slate-500 mt-0.5">{businessName}</p>
              {secondsLeft !== null && (
                <p className={cn('text-xs font-mono mt-1.5', isWarning ? 'text-amber-400 animate-pulse' : 'text-slate-400')}>
                  {isWarning ? `⚠ Ending in ${fmt(secondsLeft)}` : fmt(secondsLeft)}
                </p>
              )}
            </div>

            <button
              onClick={toggleCall}
              disabled={isLoading}
              className={cn(
                'flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all disabled:opacity-50',
                isCallActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-teal-500 hover:bg-teal-600 text-white'
              )}
            >
              {isCallActive
                ? <><PhoneOff className="size-4" /> End call</>
                : isLoading
                ? <><Phone className="size-4 animate-pulse" /> Connecting…</>
                : <><Phone className="size-4" /> Start call</>
              }
            </button>
          </div>

          {/* Live transcript */}
          {transcript.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Live transcript</p>
              <div ref={transcriptRef} className="space-y-2 max-h-64 overflow-y-auto">
                {transcript.map((line, i) => (
                  <div key={i} className={cn('flex gap-2', line.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cn(
                      'max-w-xs rounded-xl px-3 py-2 text-sm',
                      line.role === 'user'
                        ? 'bg-teal-500/15 text-teal-100'
                        : 'bg-slate-800 text-slate-200'
                    )}>
                      {line.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
