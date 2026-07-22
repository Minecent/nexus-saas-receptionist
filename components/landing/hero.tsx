import Link from 'next/link'
import { PhoneCall, CalendarCheck, MessageSquare } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-700">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.12),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400">
            AI-powered front desk for modern businesses
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Never miss{' '}
            <span className="text-teal-400">another call</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-slate-100">
            NEXUS answers every call 24/7/365, takes perfect messages, books appointments, and handles
            customer inquiries — so your team can focus on what matters most. Onboarding takes about fifteen minutes.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-slate-200">
            From solo operators to multi-location teams — NEXUS answers every call, so no
            business ever misses a customer.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/signup"
              className="rounded-lg bg-teal-500 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-600 text-center sm:text-left"
            >
              Start free 7-day trial
            </Link>
            <Link
              href="#pricing"
              className="rounded-lg border border-slate-500 bg-transparent px-6 py-3.5 text-base font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white text-center sm:text-left"
            >
              See plans
            </Link>
          </div>

          <p className="text-xs text-slate-200">No credit card required · Cancel anytime</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {[
              'Keep your existing number',
              'Live in 24–48 hours',
              'No contracts',
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-slate-100">
                <span className="size-1.5 rounded-full bg-teal-400" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:pl-8">
          <div className="rounded-2xl border border-slate-500 bg-slate-600 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-teal-500/20">
                <PhoneCall className="size-3.5 text-teal-400" />
              </div>
              <span className="text-sm font-medium text-white">Incoming call — Dr. Patel&apos;s office</span>
              <span className="ml-auto text-xs text-slate-200">Just now</span>
            </div>
            <p className="text-sm text-slate-100">
              &ldquo;Hi, I&apos;d like to book an appointment for next Tuesday afternoon.&rdquo;
            </p>
            <p className="mt-1.5 text-sm font-medium text-teal-400">
              NEXUS: Tuesday 2 PM is available. Shall I confirm?
            </p>
          </div>

          <div className="rounded-2xl border border-slate-500 bg-slate-600 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-teal-500/20">
                <CalendarCheck className="size-3.5 text-teal-400" />
              </div>
              <span className="text-sm font-medium text-white">Appointment booked</span>
              <span className="ml-auto text-xs text-slate-200">2s ago</span>
            </div>
            <p className="text-sm text-slate-100">
              Sarah Johnson · Tuesday, May 6 · 2:00 PM · Added to your calendar
            </p>
          </div>

          <div className="rounded-2xl border border-slate-500 bg-slate-600 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-teal-500/20">
                <MessageSquare className="size-3.5 text-teal-400" />
              </div>
              <span className="text-sm font-medium text-white">Confirmation sent</span>
              <span className="ml-auto text-xs text-slate-200">Just now</span>
            </div>
            <p className="text-sm text-slate-100">
              SMS confirmation sent to patient · No staff involvement required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
