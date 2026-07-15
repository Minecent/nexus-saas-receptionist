import Link from 'next/link'
import { Check, Phone } from 'lucide-react'

const bullets = [
  'Answers in under 2 seconds, 24/7/365',
  'Takes messages and delivers via SMS and email',
  'Books appointments directly on the call',
  'Transfers calls to the right person based on your rules',
  'Speaks 31 languages fluently',
]

export default function Detail() {
  return (
    <section className="border-b border-slate-700 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Every missed call is a customer who called your competitor
            </h2>
            <p className="mb-6 text-base leading-relaxed text-slate-100">
              62% of calls to service businesses go unanswered. That&apos;s not a scheduling
              problem — it&apos;s a revenue problem. NEXUS picks up every call, takes messages,
              books appointments, and transfers urgent calls to your team. All without you lifting
              a finger.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="inline-block rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              Start Your Free Trial
            </Link>
          </div>

          <div className="flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 py-20">
            <div className="flex size-20 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/10">
              <Phone className="size-8 text-teal-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
