import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { FadeIn } from './fade-in'

export default function CallCta() {
  return (
    <section className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/10">
              <Calendar className="size-6 text-teal-400" />
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              See It Live
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Watch NEXUS handle a real call
            </h2>
            <p className="mb-8 text-base text-slate-400">
              Book a 15-minute live demo and we&apos;ll show you NEXUS answering calls, booking
              appointments, and handling customer inquiries for a business just like yours.
            </p>

            <Link
              href="mailto:sales@nexus.ai?subject=Demo Request&body=Hi, I'd like to book a live NEXUS demo."
              className="inline-flex items-center gap-3 rounded-2xl bg-teal-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-teal-600"
            >
              <Calendar className="size-5" />
              Book a free demo
            </Link>

            <p className="mt-6 text-xs text-slate-600">
              15 minutes · No commitment · See NEXUS live for your industry
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
