'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { FadeIn } from './fade-in'

// Fewer bars on mobile (via CSS), same data
const WAVEFORM_BARS = Array.from({ length: 40 }, (_, i) => {
  const heights = [30, 50, 70, 90, 60, 40, 80, 55, 35, 75, 95, 65, 45, 85, 50, 30, 70, 90, 40, 60, 80, 50, 35, 75, 55, 90, 40, 65, 85, 45, 70, 30, 95, 50, 60, 80, 35, 75, 45, 65]
  return heights[i % heights.length]
})

export default function DemoAudio() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
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

  function handleTimeUpdate() {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  function handleEnded() {
    setPlaying(false)
    setProgress(0)
  }

  return (
    <section className="border-b border-slate-500 bg-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Hear It Live
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hear NEXUS in action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-100">
              Listen to a real sample call. NEXUS answers, qualifies the caller, and books an
              appointment — start to finish, zero staff involvement.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-500 bg-slate-600 p-6 sm:p-8">
            {/* Call metadata */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-500/15">
                <Volume2 className="size-4 text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sample call — NEXUS AI Receptionist demo</p>
                <p className="text-xs text-slate-200">NEXUS answered in &lt;2s</p>
              </div>
            </div>

            {/* Waveform — hide every other bar on mobile to prevent overflow */}
            <div className="mb-5 flex h-14 items-center gap-0.5 overflow-hidden">
              {WAVEFORM_BARS.map((h, i) => {
                const isActive = (i / WAVEFORM_BARS.length) * 100 <= progress
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-colors${i % 2 === 1 ? ' hidden sm:block' : ''} ${isActive ? 'bg-teal-500' : 'bg-slate-600'}`}
                    style={{ height: `${h}%` }}
                  />
                )
              })}
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
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-600">
                <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio ref={audioRef} src="/audio/Demo.mp3" onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
