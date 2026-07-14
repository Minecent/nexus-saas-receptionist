import { FadeIn } from '@/components/landing/fade-in'

const steps = [
  {
    number: '01',
    title: 'Tell us about your business',
    description:
      'Answer a few questions about your services, hours, and how you want calls handled. Takes about five minutes.',
  },
  {
    number: '02',
    title: 'Choose your voice',
    description:
      'Pick from a range of natural, professional voices. Your AI receptionist introduces itself however you want.',
  },
  {
    number: '03',
    title: 'Forward your calls',
    description:
      'Point your existing number at NEXUS. No porting, no hardware, no downtime — your customers notice nothing except better service.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Live in three simple steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-100">
              Five minutes of setup gives your agent everything it needs. Then it goes to work 24/7/365.
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <FadeIn key={step.number}>
              <div className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-4 text-sm font-bold text-teal-400">{step.number}</div>
                <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-100">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
