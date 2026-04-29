'use client'

// TODO: Replace placeholder src with a real call recording once available.
import { useState, useRef } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { FadeIn } from './fade-in'

const WAVEFORM_BARS = Array.from({ length: 40 }, (_, i) => {
  const heights = [30, 50, 70, 90, 60, 40, 80, 55, 35, 75, 95, 65, 45, 85, 50, 30, 70, 90, 40, 60, 80, 50, 35, 75, 55, 90, 40, 65, 85, 45, 70, 30, 95, 50, 60, 80, 35, 75, 45, 65]
  return heights[i % heights.length]
})

export default function DemoAudio() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <section className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Hear It Live
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hear NEXUS in action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              Listen to a real sample call. NEXUS answers, qualifies the caller, and books an
              appointment — start to finish, zero staff involvement.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-700 bg-slate-950 p-6 sm:p-8">
            {/* Demo notice */}
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
              <span className="size-1.5 rounded-full bg-amber-400" />
              <span className="text-xs text-amber-400">
                Demo audio — replace with a real recording before launch
              </span>
            </div>

            {/* Call metadata */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-500/15">
                <Volume2 className="size-4 text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sample call — Plumbing emergency inquiry</p>
                <p className="text-xs text-slate-500">Duration: 1 min 47 sec · NEXUS answered in &lt;2s</p>
              </div>
            </div>

            {/* Waveform */}
            <div className="mb-5 flex h-14 items-center gap-0.5">
              {WAVEFORM_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full bg-slate-700 transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggle}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white transition-colors hover:bg-teal-600 active:scale-95"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause className="size-4 fill-white" /> : <Play className="size-4 fill-white" />}
              </button>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-0 rounded-full bg-teal-500 transition-all" />
              </div>
              <span className="text-xs tabular-nums text-slate-500">1:47</span>
            </div>

            {/* Hidden audio element — src intentionally empty */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio ref={audioRef} src={undefined} onEnded={() => setPlaying(false)} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
