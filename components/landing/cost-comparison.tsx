import { X, Check } from 'lucide-react'
import { FadeIn } from './fade-in'

const humanCons = [
  'Salary: $3,500 – $4,500/mo',
  'Benefits & payroll taxes: +30%',
  'Only covers 8 hours/day, 5 days/week',
  'Sick days, vacations, turnover',
  'Weeks to hire and train',
  'One call at a time',
]

const nexusPros = [
  'Plans starting from $25/month',
  'No benefits, payroll, or HR costs',
  'Available 24/7/365 — nights, weekends, holidays',
  'Never calls in sick or goes on vacation',
  'Keep your existing business number',
  'Handles unlimited concurrent calls',
]

export default function CostComparison() {
  return (
    <section className="border-b border-slate-700 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              The Numbers
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A fraction of the cost. None of the headaches.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-100">
              The average small business spends $48,000 per year on a full-time receptionist.{' '}
              <sup className="text-slate-300 text-xs">*</sup> NEXUS starts at $25/month — and works around the clock.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Human receptionist */}
            <div className="rounded-2xl border border-slate-600 bg-slate-700 p-6">
              <div className="mb-2 flex items-center gap-2">
                <div className="size-2 rounded-full bg-rose-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                  Human Receptionist
                </span>
              </div>
              <div className="mb-1">
                <span className="text-4xl font-bold text-rose-400">$4,000</span>
                <span className="ml-1 text-sm text-slate-300">/ month</span>
              </div>
              <p className="mb-6 text-xs text-slate-300">Salary + benefits + payroll tax = $48,000/yr</p>
              <ul className="flex flex-col gap-3">
                {humanCons.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-100">
                    <X className="mt-0.5 size-4 shrink-0 text-rose-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* NEXUS */}
            <div className="rounded-2xl border border-teal-500/40 bg-slate-700 p-6 shadow-lg shadow-teal-500/5">
              <div className="mb-2 flex items-center gap-2">
                <div className="size-2 rounded-full bg-teal-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-teal-500">
                  NEXUS AI Receptionist
                </span>
              </div>
              <div className="mb-1">
                <span className="text-4xl font-bold text-teal-400">from $25</span>
                <span className="ml-1 text-sm text-slate-300">/ month</span>
              </div>
              <p className="mb-6 text-xs text-slate-300">Pay only for what you need. No contracts.</p>
              <ul className="flex flex-col gap-3">
                {nexusPros.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Savings callout — large and impactful */}
          <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-teal-500/30 bg-teal-500/5 px-6 py-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-400">Your annual saving</p>
            <p className="text-5xl sm:text-6xl font-extrabold text-white mb-3">
              $47,700<span className="text-teal-400">/year</span>
            </p>
            <p className="text-base text-slate-100 max-w-md mx-auto">
              Switch to NEXUS and put that money back into growing your business — while answering more calls than any human ever could.
            </p>
          </div>
        </FadeIn>
        <p className="mt-6 text-center text-xs text-slate-700">
          * Based on U.S. Bureau of Labor Statistics median receptionist salary plus employer payroll taxes and benefits.
        </p>
      </div>
    </section>
  )
}
