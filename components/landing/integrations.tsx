import { Calendar, Mail } from 'lucide-react'
import { FadeIn } from './fade-in'

const supported = [
  {
    icon: Calendar,
    name: 'Google Calendar',
    description: 'Automatic appointment booking and rescheduling',
  },
  {
    icon: Mail,
    name: 'Gmail',
    description: 'Email summaries and confirmations after every call',
  },
]

export default function Integrations() {
  return (
    <section className="border-b border-slate-500 bg-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Integrations
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Works with the tools you already use
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-slate-100">
              Native integrations available now
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {supported.map(({ icon: Icon, name, description }) => (
              <div
                key={name}
                className="flex items-start gap-4 rounded-2xl border border-slate-500 bg-slate-600 p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10">
                  <Icon className="size-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{name}</p>
                  <p className="mt-1 text-sm text-slate-100">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-200">
            Need Outlook, Salesforce, HubSpot, or custom CRM integration? That&apos;s available in
            our Custom Build tier —{' '}
            <a href="#pricing" className="text-slate-100 underline underline-offset-2 hover:text-teal-400 transition-colors">
              contact our sales team
            </a>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
