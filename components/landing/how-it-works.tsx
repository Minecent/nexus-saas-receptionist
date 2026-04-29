const steps = [
  {
    number: '1',
    title: 'Tell NEXUS about your business',
    description:
      'Services, hours, FAQs, preferences. Five minutes of setup gives your agent everything it needs to represent your brand.',
  },
  {
    number: '2',
    title: 'It goes to work immediately',
    description:
      'Calls get answered. Messages get delivered. Appointments get booked. All without you lifting a finger.',
  },
  {
    number: '3',
    title: 'You see measurable results',
    description:
      'Fewer missed calls, more booked appointments, higher revenue. Measurable impact from week one.',
  },
]

export default function HowItWorks() {
  return (
    <section className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Set up once. Get results every day.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Five minutes of setup gives your agent everything it needs. Then it goes to work 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
