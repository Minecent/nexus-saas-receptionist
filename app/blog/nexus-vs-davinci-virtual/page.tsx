import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { blogPostingSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'NEXUS vs Davinci Virtual (2026): AI Receptionist vs Live Service',
  description: 'Davinci Virtual provides live receptionist minutes during business hours. NEXUS answers 24/7/365 on a flat monthly plan. Full 2026 comparison.',
}

const schema = blogPostingSchema({
  headline: 'NEXUS vs Davinci Virtual (2026): AI Receptionist vs Live Service',
  description: 'Davinci Virtual provides live receptionist minutes during business hours. NEXUS answers 24/7/365 on a flat monthly plan. Full 2026 comparison.',
  slug: 'nexus-vs-davinci-virtual',
  keywords: ['Davinci Virtual alternative', 'AI receptionist', 'virtual receptionist comparison', 'NEXUS vs Davinci Virtual'],
})

export default function NexusVsDavinciPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            NEXUS<span className="text-teal-400">.</span>
          </Link>
          <Link href="/signup" className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors">
            Try NEXUS
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

        {/* Hero */}
        <section className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400">
            Updated April 2026
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            NEXUS vs Davinci Virtual (2026)
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
            Davinci Virtual provides live receptionist minutes during business hours only. NEXUS answers 24/7/365 on a flat monthly plan with no per-minute fees.
          </p>
          <Link href="/signup" className="inline-flex items-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-white hover:bg-teal-600 transition-colors">
            Try NEXUS Today &rarr;
          </Link>
          <p className="mt-3 text-xs text-slate-500">No contracts. Cancel anytime. Keep your existing number.</p>
        </section>

        {/* TL;DR */}
        <section className="mb-16 rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-400">TL;DR</p>
          <p className="text-slate-300 leading-relaxed">
            Davinci Virtual sells bundles of live receptionist minutes during business hours only. NEXUS answers 24/7/365 with appointment booking and call recordings on every plan — no per-minute billing. Davinci Virtual adds virtual office addresses and mail handling, which NEXUS does not offer. For phone answering alone, NEXUS delivers considerably more coverage. Choose Davinci Virtual if you need a physical business address bundled with receptionist services. Choose NEXUS if reliable, round-the-clock call answering is your primary need.
          </p>
          <p className="mt-3 text-xs text-slate-500 italic">
            Disclaimer: Davinci Virtual pricing is based on publicly available information. Pricing may change. Verify at davincivirtual.com before making purchasing decisions.
          </p>
        </section>

        {/* Comparison table */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">At a Glance</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-teal-400">NEXUS</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-400">Davinci Virtual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                {[
                  ['Pricing model', 'Flat monthly plan, quoted per business', 'Per-minute bundles with overage'],
                  ['Answering method', 'AI-powered, conversational', 'Live human receptionists'],
                  ['Availability', '24/7/365', 'Business hours (Mon–Fri)'],
                  ['Billing model', 'Flat monthly — no per-minute fees', 'Per minute + overage charges'],
                  ['Appointment booking', 'Every plan', 'Basic scheduling'],
                  ['Call recordings', 'Every plan', 'Not standard'],
                  ['Simultaneous calls', 'Unlimited', 'Limited by available agents'],
                  ['Virtual office address', 'Not available', 'Yes, 5,000+ locations'],
                  ['Setup time', '24–48 hours', '1–2 business days'],
                  ['Contracts', 'None, cancel anytime', 'Monthly or annual'],
                  ['Founded', '2024', '2006'],
                ].map(([feature, nexus, davinci]) => (
                  <tr key={feature}>
                    <td className="px-4 py-3 text-slate-400">{feature}</td>
                    <td className="px-4 py-3 font-medium text-teal-300">{nexus}</td>
                    <td className="px-4 py-3 text-slate-400">{davinci}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing section */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Pricing Comparison</h2>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-teal-500/40 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="size-2 rounded-full bg-teal-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">NEXUS</span>
              </div>
              {[
                { plan: 'Lite', price: 'Solo businesses', detail: '30 calls / 90 minutes' },
                { plan: 'Pro', price: 'Growing teams', detail: '500 minutes (~165 calls)' },
                { plan: 'Scale', price: 'High volume', detail: '1,500 minutes (~500 calls)' },
              ].map(({ plan, price, detail }) => (
                <div key={plan} className="mb-3 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                  <div>
                    <span className="text-sm font-semibold text-white">{plan}</span>
                    <span className="ml-2 text-xs text-slate-500">{detail}</span>
                  </div>
                  <span className="text-sm font-bold text-teal-400">{price}</span>
                </div>
              ))}
              <p className="mt-3 text-xs text-slate-500">All features on every plan. No per-minute fees. You approve any overages.</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="size-2 rounded-full bg-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Davinci Virtual</span>
              </div>
              {[
                { plan: 'Business 50', price: 'Business hours', detail: '50 live minutes' },
                { plan: 'Business 100', price: 'Business hours', detail: '100 live minutes' },
                { plan: 'Premium 150', price: 'Business hours', detail: '150 live minutes' },
              ].map(({ plan, price, detail }) => (
                <div key={plan} className="mb-3 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                  <div>
                    <span className="text-sm font-semibold text-white">{plan}</span>
                    <span className="ml-2 text-xs text-slate-500">{detail}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-400">{price}</span>
                </div>
              ))}
              <p className="mt-3 text-xs text-slate-500">Per-minute billing with overage charges. Business hours only. Pricing subject to change.</p>
            </div>
          </div>
          <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 px-6 py-4">
            <p className="text-sm font-medium text-teal-300">
              For 100 calls averaging 3 minutes each, you need 300 minutes. On a bundled live-minute plan that means <span className="font-bold text-white">overage on top of the base plan</span>. A NEXUS plan covering that volume is <span className="font-bold text-white">one flat monthly figure</span> — total.
            </p>
          </div>
        </section>

        {/* Feature breakdown */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">Feature by Feature</h2>
          <div className="flex flex-col gap-6">
            {[
              {
                title: 'Availability',
                nexus: 'NEXUS answers 24/7/365. Every after-hours call, every weekend call, every public holiday — answered instantly with the same quality every time.',
                davinci: 'Davinci Virtual live receptionists work Monday through Friday during standard business hours. After-hours, weekend, and holiday calls go unanswered by a live person.',
              },
              {
                title: 'Cost and billing',
                nexus: 'Flat monthly rate, quoted for your business. All features included on every plan. You approve any overage charges before they are applied — no surprise bills.',
                davinci: 'Per-minute billing. A 5-minute call uses 5 minutes of your monthly allotment. Overage charges apply automatically once your minutes are exhausted.',
              },
              {
                title: 'Simultaneous calls',
                nexus: 'NEXUS is AI-powered and handles unlimited simultaneous calls. Whether two calls come in at once or twenty, every caller is answered instantly.',
                davinci: 'Capacity depends on available live receptionists. During busy periods, callers may experience hold times.',
              },
              {
                title: 'Virtual office services',
                nexus: 'NEXUS is a phone answering service only. No virtual office, no business address, no mail handling.',
                davinci: 'Davinci Virtual bundles business addresses in 5,000+ locations, mail handling, and meeting room access with phone answering. Unique value for businesses needing a professional address.',
              },
            ].map(({ title, nexus, davinci }) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="mb-4 text-base font-bold text-white">{title}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-teal-400">
                      <span className="size-1.5 rounded-full bg-teal-400" /> NEXUS
                    </p>
                    <p className="text-sm leading-relaxed text-slate-300">{nexus}</p>
                  </div>
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                      <span className="size-1.5 rounded-full bg-slate-500" /> Davinci Virtual
                    </p>
                    <p className="text-sm leading-relaxed text-slate-400">{davinci}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where each wins */}
        <section className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Where Davinci Virtual is stronger</h2>
            <ul className="flex flex-col gap-3">
              {[
                'Virtual office addresses in 5,000+ locations',
                'Mail handling and mail forwarding',
                'Meeting room and day office access',
                'Live human receptionists for nuanced calls',
                'Nearly 20 years in the market',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                  <Check className="mt-0.5 size-4 shrink-0 text-slate-500" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-teal-500/30 bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Where NEXUS is stronger</h2>
            <ul className="flex flex-col gap-3">
              {[
                'One flat monthly plan instead of bundled live minutes',
                '24/7/365 — no after-hours gaps',
                'Flat rate — no per-minute billing',
                'Unlimited simultaneous calls',
                'Appointment booking on every plan',
                'Call recordings included as standard',
                'Live in 24–48 hours',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />{item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Best for use case */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Best Choice by Use Case</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                useCase: 'Solopreneurs needing a business address',
                winner: 'Davinci Virtual',
                reason: 'Bundles phone answering with a professional address and mail handling.',
                teal: false,
              },
              {
                useCase: 'Service businesses (dental, legal, HVAC, property management)',
                winner: 'NEXUS',
                reason: '24/7 coverage, appointment booking, recordings, and flat-rate pricing at a fraction of the cost.',
                teal: true,
              },
              {
                useCase: 'High call volume with unpredictable peaks',
                winner: 'NEXUS',
                reason: 'Unlimited simultaneous calls. No hold times, no missed calls during spikes.',
                teal: true,
              },
              {
                useCase: 'Business that only needs a few calls handled per month',
                winner: 'Either',
                reason: 'The NEXUS entry plan handles low call volumes comfortably. Davinci Virtual may still suit you if a human voice during business hours matters more than round-the-clock coverage.',
                teal: false,
              },
            ].map(({ useCase, winner, reason, teal }) => (
              <div key={useCase} className={`rounded-xl border p-4 ${teal ? 'border-teal-500/30 bg-teal-500/5' : 'border-slate-800 bg-slate-900'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{useCase}</p>
                    <p className="mt-1 text-xs text-slate-400">{reason}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${teal ? 'bg-teal-500/10 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                    {winner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                q: 'Is NEXUS cheaper than Davinci Virtual?',
                a: 'They are billed differently. Davinci Virtual sells bundles of live minutes with per-minute overage charges. NEXUS is a flat monthly plan quoted for your business, covering considerably more call volume around the clock. Book a demo for a quote on your setup.',
              },
              {
                q: 'Does Davinci Virtual offer 24/7 coverage?',
                a: 'No. Davinci Virtual live receptionists work during standard business hours, Monday through Friday. After-hours and weekend calls are not covered by live agents. NEXUS provides 24/7/365 coverage.',
              },
              {
                q: 'Does Davinci Virtual offer virtual office addresses?',
                a: 'Yes — this is their standout feature. Davinci Virtual offers business addresses in over 5,000 locations with mail handling and meeting room access. NEXUS does not offer virtual office services.',
              },
              {
                q: 'Can I switch from Davinci Virtual to NEXUS?',
                a: 'Yes. Update your call forwarding number to your NEXUS number. NEXUS is live in 24–48 hours. You keep your existing business number throughout. No contract required.',
              },
              {
                q: 'Does NEXUS record calls?',
                a: 'Yes. Call recordings are included on every NEXUS plan at no extra cost. Davinci Virtual does not offer automated call recordings as a standard feature.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <p className="mb-2 font-semibold text-white">{q}</p>
                <p className="text-sm leading-relaxed text-slate-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-16 rounded-2xl border border-teal-500/30 bg-teal-500/5 p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-400">Final Verdict</p>
          <h2 className="mb-4 text-2xl font-bold">NEXUS vs Davinci Virtual: Which should you choose?</h2>
          <p className="mb-4 text-slate-300 leading-relaxed">
            Choose Davinci Virtual if you need a virtual office address bundled with phone answering. Their business address services in 5,000+ locations are genuinely useful for solopreneurs, remote businesses, and startups that need professional credibility without leasing office space.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Choose NEXUS if phone answering is your primary need. It works 24/7/365, handles unlimited simultaneous calls, books appointments, records every call, and never charges a surprise bill. For service businesses that need a reliable AI receptionist without the overhead of a live service, NEXUS delivers more coverage on one predictable plan.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">Ready to try NEXUS?</h2>
          <p className="mb-6 text-slate-400">Keep your existing number. Live in 24–48 hours. No contracts.</p>
          <Link href="/signup" className="inline-flex items-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-white hover:bg-teal-600 transition-colors">
            Get Started with NEXUS &rarr;
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            See all comparisons in our <Link href="/blog" className="text-teal-500 hover:underline">blog</Link>.
          </p>
        </section>

      </main>
    </div>
  )
}
