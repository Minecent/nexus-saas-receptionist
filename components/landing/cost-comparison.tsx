import { FadeIn } from '@/components/landing/fade-in'

const rows = [
  {
    label: 'Monthly cost',
    receptionist: '$4,000+',
    service: '$300–600',
    nexus: 'From $25',
  },
  {
    label: 'Availability',
    receptionist: '40 hrs/week',
    service: 'Business hours',
    nexus: '24/7/365',
  },
  {
    label: 'Sick days & holidays',
    receptionist: 'Yes',
    service: 'Limited coverage',
    nexus: 'Never',
  },
  {
    label: 'Answers instantly',
    receptionist: 'When available',
    service: 'Queue times',
    nexus: 'Every time, 1 ring',
  },
  {
    label: 'Books appointments',
    receptionist: 'Yes',
    service: 'Extra fees',
    nexus: 'Included',
  },
  {
    label: 'Scales with call volume',
    receptionist: 'Hire more staff',
    service: 'Higher tiers',
    nexus: 'Automatic',
  },
]

export default function CostComparison() {
  return (
    <section className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              The Math
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A fraction of the cost. None of the gaps.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-100">
              The average small business spends $48,000 per year on a full-time receptionist.{' '}
              NEXUS does the answering for a fraction of that — without breaks, sick days, or turnover.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[600px] border-collapse bg-slate-950 text-left">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="p-4 text-sm font-medium text-slate-100"></th>
                  <th className="p-4 text-sm font-semibold text-white">Full-time receptionist</th>
                  <th className="p-4 text-sm font-semibold text-white">Answering service</th>
                  <th className="p-4 text-sm font-semibold text-teal-400">NEXUS</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-slate-800 last:border-0">
                    <td className="p-4 text-sm font-medium text-slate-100">{row.label}</td>
                    <td className="p-4 text-sm text-slate-300">{row.receptionist}</td>
                    <td className="p-4 text-sm text-slate-300">{row.service}</td>
                    <td className="p-4 text-sm font-semibold text-teal-400">{row.nexus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
