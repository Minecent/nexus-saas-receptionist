import { Headphones, Wrench, ShieldCheck } from 'lucide-react'

const reasons = [
  {
    icon: Headphones,
    title: 'Hear it before you decide',
    body:
      'Listen to the sample call on this page, then book a live demo and speak to NEXUS yourself. You do not have to take our word for how it sounds — you can hear it answer, qualify, and book an appointment in real time.',
  },
  {
    icon: Wrench,
    title: 'Set up for you, not handed to you',
    body:
      'Most AI answering tools leave you alone with a dashboard. We configure your greeting, services, hours, and booking rules with you, test it together, and stay reachable afterwards. You are working with a team, not a signup form.',
  },
  {
    icon: ShieldCheck,
    title: 'Built by people who read the fine print',
    body:
      'NEXUS is built by a team with a legal background as well as a technical one. Data handling, call recording, and client agreements are written down and explained in plain language before you commit to anything.',
  },
]

export default function Testimonials() {
  return (
    <section className="border-b border-slate-500 bg-slate-700 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            Why NEXUS
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What makes NEXUS different
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-100">
            From solo tradespeople to multi-location practices — NEXUS is for any business that
            cannot afford to let calls go to voicemail.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="flex flex-col rounded-2xl border border-slate-500 bg-slate-600 p-6"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-500/20">
                <r.icon className="size-5 text-teal-400" />
              </div>
              <p className="mt-4 text-base font-semibold text-white">{r.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-200">{r.body}</p>
            </div>
          ))}
        </div>

        {/* Founding client note */}
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-teal-500/20 bg-teal-500/5 px-6 py-5 text-center">
          <p className="text-sm text-slate-100">
            <span className="font-semibold text-white">We are onboarding our first clients now.</span>{' '}
            Founding clients work directly with our team, help shape the product, and keep priority
            support as we grow.
          </p>
        </div>
      </div>
    </section>
  )
}
