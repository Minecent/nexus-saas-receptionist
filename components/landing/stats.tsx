const stats = [
  {
    number: '62%',
    title: 'of calls go unanswered',
    description:
      'Your team is busy helping customers. Calls still come in. NEXUS picks up every one so nothing slips through the cracks.',
    source: 'BIA/Kelsey SMB Call Analytics Report',
  },
  {
    number: '5×',
    title: 'more capacity',
    description:
      'AI agents handle repetitive work around the clock, so your team can focus on what actually needs a human touch.',
  },
  {
    number: '24/7/365',
    title: 'always available',
    description:
      'Nights, weekends, holidays. Your business keeps running even when your team is off the clock.',
  },
]

export default function Stats() {
  return (
    <section className="relative border-b border-slate-800 bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:pt-28 sm:pb-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            The Reality
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Every missed call is a job that went to someone else.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-100">
            Calls come in while your staff is helping customers. You can&apos;t be everywhere at once.
            That capacity gap? That&apos;s where NEXUS comes in.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-2 text-4xl font-bold text-teal-400">{stat.number}</div>
              <div className="mb-3 text-sm font-semibold text-white">{stat.title}</div>
              <p className="text-sm leading-relaxed text-slate-100">{stat.description}</p>
              {stat.source && (
                <p className="mt-3 text-xs text-slate-600">Source: {stat.source}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
