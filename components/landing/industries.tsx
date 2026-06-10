import { Wrench, Stethoscope, Building2 } from 'lucide-react'
import { FadeIn } from './fade-in'

const industries = [
  {
    icon: Wrench,
    name: 'Plumbers & Trades',
    tagline: 'Never lose a job to a missed call again.',
    painPoints: [
      'Emergency calls come in at 2am — no one answers, customer calls a competitor',
      'Crew is on-site, can\'t answer the phone — estimate requests go to voicemail',
      'Can\'t afford a full-time dispatcher for after-hours coverage',
    ],
    solution:
      'NEXUS answers every call, triages emergencies, schedules estimates, and dispatches urgent jobs — around the clock.',
  },
  {
    icon: Stethoscope,
    name: 'Medical Offices',
    tagline: 'Reduce hold times. Improve patient experience.',
    painPoints: [
      'Front desk overwhelmed with appointment calls during peak hours',
      'Prescription refill requests pile up and slow down clinical staff',
      'After-hours patients can\'t reach anyone for urgent but non-emergency needs',
    ],
    solution:
      'NEXUS schedules appointments, routes prescription requests to the right staff, and handles after-hours inquiries — with patient privacy and confidentiality in mind.',
  },
  {
    icon: Building2,
    name: 'Property Management',
    tagline: 'Handle every tenant, every hour.',
    painPoints: [
      'Maintenance requests come in nights and weekends when staff is unavailable',
      'Vacancy inquiries go unanswered and prospects rent elsewhere',
      'After-hours emergencies (floods, lockouts) need immediate triage',
    ],
    solution:
      'NEXUS logs maintenance tickets, answers vacancy questions, and escalates true emergencies — so tenants always feel heard.',
  },
]

export default function Industries() {
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Industry Fit
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built for businesses that can&apos;t miss a call
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
              NEXUS is purpose-built for service businesses where every call is a potential customer.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {industries.map((industry, i) => {
            const Icon = industry.icon
            return (
              <FadeIn key={industry.name} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-teal-500/30">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-teal-500/10">
                    <Icon className="size-5 text-teal-400" />
                  </div>
                  <h3 className="mb-1 text-base font-bold text-white">{industry.name}</h3>
                  <p className="mb-4 text-sm font-medium text-teal-400">{industry.tagline}</p>

                  <div className="mb-4 flex flex-col gap-2">
                    {industry.painPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="mt-0.5 text-slate-600">✗</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto rounded-lg border border-teal-500/20 bg-teal-500/5 p-3">
                    <p className="text-xs leading-relaxed text-teal-300">{industry.solution}</p>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
