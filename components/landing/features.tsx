import { Clock, CalendarDays, FileText, Plug, Mic, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: '24/7/365 Availability',
    description: 'Never miss a call. NEXUS answers every inquiry around the clock, including holidays and after hours.',
  },
  {
    icon: CalendarDays,
    title: 'Appointment Scheduling',
    description: 'Automatically checks availability and books appointments directly into your calendar system.',
  },
  {
    icon: FileText,
    title: 'Call Transcripts',
    description: 'Every call is transcribed and summarized. Review conversations and action items in seconds.',
  },
  {
    icon: Plug,
    title: 'CRM Integration',
    description: 'Syncs with your existing tools — HubSpot, Salesforce, and more — so no data gets lost.',
  },
  {
    icon: Mic,
    title: 'Custom Voice & Persona',
    description: 'Set the name, tone, and script. NEXUS sounds like your team, not a generic bot.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track call volume, booking rates, and peak hours to continuously improve your operations.',
  },
]

export default function Features() {
  return (
    <section id="features" className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            The Solution
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything your front desk needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-100">
            Built for businesses that can&apos;t afford to miss a customer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition-all hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/5"
              >
                <div className="mb-4 flex size-9 items-center justify-center rounded-lg bg-teal-500/10">
                  <Icon className="size-4 text-teal-400" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-100">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
