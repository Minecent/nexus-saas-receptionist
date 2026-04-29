import { Phone } from 'lucide-react'
import { FadeIn } from './fade-in'

// TODO: Replace (555) 000-0000 with your real Twilio/NEXUS demo number before launch.
const DEMO_NUMBER = '(555) 000-0000'
const DEMO_NUMBER_TEL = 'tel:+15550000000'

export default function CallCta() {
  return (
    <section className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/10">
              <Phone className="size-6 text-teal-400" />
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Try It Now
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Call NEXUS right now
            </h2>
            <p className="mb-8 text-base text-slate-400">
              Don&apos;t take our word for it — pick up the phone and experience the difference yourself.
              NEXUS will answer, handle your inquiry, and show you exactly what your customers will
              hear.
            </p>

            <a
              href={DEMO_NUMBER_TEL}
              className="inline-flex items-center gap-3 rounded-2xl border border-teal-500/40 bg-teal-500/10 px-8 py-5 text-2xl font-bold tracking-wide text-teal-300 transition-all hover:border-teal-400 hover:bg-teal-500/15 hover:text-white sm:text-3xl"
            >
              <Phone className="size-6" />
              {DEMO_NUMBER}
            </a>

            {/* Demo notice */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-400" />
              <p className="text-xs text-amber-400">
                Demo number — replace with your real NEXUS line before launch
              </p>
            </div>

            <p className="mt-6 text-xs text-slate-600">
              Available 24/7 · No wait time · No hold music
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
