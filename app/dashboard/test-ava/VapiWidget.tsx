'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type VapiInstance = {
  start: (assistantId: string) => void
  stop: () => void
  on: (event: string, cb: (...args: unknown[]) => void) => void
}

export default function VapiWidget({
  assistantId,
  agentName,
  businessName,
}: {
  assistantId: string
  agentName: string
  businessName: string
}) {
  const vapiRef = useRef<VapiInstance | null>(null)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([])
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('@vapi-ai/web').then(({ default: Vapi }) => {
      const v = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!) as unknown as VapiInstance
      v.on('call-start', () => { setIsCallActive(true); setIsLoading(false) })
      v.on('call-end', () => { setIsCallActive(false); setIsLoading(false) })
      v.on('message', (m: unknown) => {
        const msg = m as { type?: string; transcriptType?: string; role?: string; transcript?: string }
        if (msg.type === 'transcript' && msg.transcriptType === 'final' && msg.role && msg.transcript) {
          setTranscript(t => [...t, { role: msg.role!, text: msg.transcript! }])
        }
      })
      vapiRef.current = v
    }).catch(console.error)
  }, [])

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [transcript])

  const toggleCall = () => {
    if (!vapiRef.current) return
    if (isCallActive) {
      vapiRef.current.stop()
    } else {
      setIsLoading(true)
      setTranscript([])
      vapiRef.current.start(assistantId)
    }
  }

  return (
    <div className="space-y-6">
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

      {/* Transcript */}
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
    </div>
  )
}
