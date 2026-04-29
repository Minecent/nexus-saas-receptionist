import { X, Check } from 'lucide-react'
import { FadeIn } from './fade-in'

const humanCons = [
  'Salary: $2,800 – $3,500/mo',
  'Benefits & payroll taxes: +30%',
  'Only covers 8 hours/day',
  'Sick days, vacations, turnover',
  'Weeks to hire and train',
  'One call at a time',
]

const nexusPros = [
  'From $25/mo — no hidden fees',
  'No benefits, payroll, or HR',
  'Available 24/7/365',
  'Never calls in sick',
  'Live in under 5 minutes',
  'Handles unlimited concurrent calls',
]

export default function CostComparison() {
  return (
    <section className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              The Numbers
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A fraction of the cost. None of the headaches.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              The average small business spends $3,000+ per month on a full-time receptionist.
              NEXUS starts at $25.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Human receptionist */}
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6">
              <div className="mb-2 flex items-center gap-2">
                <div className="size-2 rounded-full bg-rose-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Human Receptionist
                </span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-rose-400">$3,200</span>
                <span className="ml-1 text-sm text-slate-500">/ month avg.</span>
              </div>
              <ul className="flex flex-col gap-3">
                {humanCons.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <X className="mt-0.5 size-4 shrink-0 text-rose-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* NEXUS */}
            <div className="rounded-2xl border border-teal-500/40 bg-slate-950 p-6 shadow-lg shadow-teal-500/5">
              <div className="mb-2 flex items-center gap-2">
                <div className="size-2 rounded-full bg-teal-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-teal-500">
                  NEXUS AI Receptionist
                </span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-teal-400">$25</span>
                <span className="ml-1 text-sm text-slate-500">/ month to start</span>
              </div>
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

          {/* Savings callout */}
          <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-teal-500/20 bg-teal-500/5 px-6 py-4 text-center">
            <p className="text-sm font-medium text-teal-300">
              Most businesses save <span className="font-bold text-white">$35,000+</span> per year
              switching to NEXUS — while covering more hours than ever before.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
