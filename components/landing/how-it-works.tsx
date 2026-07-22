const steps = [
  {
    number: '1',
    title: 'Tell NEXUS about your business',
    description:
      'Services, hours, FAQs, preferences. Onboarding takes about fifteen minutes and gives your agent what it needs to represent your brand.',
  },
  {
    number: '2',
    title: 'We configure and test it with you',
    description:
      'Your agent is created straight away. We review the greeting, services and booking rules with you, connect your number, and test it on a live call. You are live within 24 to 48 hours.',
  },
  {
    number: '3',
    title: 'It answers every call, day and night',
    description:
      'Calls get answered, messages get delivered, appointments get booked. Fewer missed calls and more booked work, from the first week.',
  },
]

export default function HowItWorks() {
  return (
    <section className="border-b border-slate-500 bg-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Set up once. Get results every day.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-100">
            About fifteen minutes of setup on your side. We configure and test the rest with you, then NEXUS works 24/7/365.
          </p>
        </div>

        {/* Mobile: vertical stack with connecting line */}
        <div className="flex flex-col gap-0 sm:hidden">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-teal-500/20" style={{ minHeight: '2.5rem' }} />
                )}
              </div>
              <div className={i < steps.length - 1 ? 'pb-8' : 'pb-0'}>
                <h3 className="mb-1.5 text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-100">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal 3-column with connector */}
        <div className="relative hidden sm:grid sm:grid-cols-3 sm:gap-10">
          {/* Connector line */}
          <div className="absolute left-[calc(1/6*100%)] right-[calc(1/6*100%)] top-5 h-px bg-teal-500/20" />
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="relative z-10 mx-auto mb-5 flex size-10 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white ring-4 ring-slate-700">
                {step.number}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-100">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
