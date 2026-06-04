import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { blogPostingSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'NEXUS vs Smith.ai (2026): AI Receptionist Pricing & Features Compared',
  description: 'Smith.ai starts at $292.50/month for 30 calls. NEXUS Pro is $149/month for 500 minutes with 24/7 coverage and no per-call fees. Full comparison.',
}

const schema = blogPostingSchema({
  headline: 'NEXUS vs Smith.ai (2026): AI Receptionist Pricing & Features Compared',
  description: 'Smith.ai starts at $292.50/month for 30 calls. NEXUS Pro is $149/month for 500 minutes with 24/7 coverage and no per-call fees. Full comparison.',
  slug: 'nexus-vs-smith-ai',
  keywords: ['Smith.ai alternative', 'AI receptionist', 'virtual receptionist comparison', 'NEXUS vs Smith.ai'],
})

export default function NexusVsSmithAiPage() {
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
            NEXUS vs Smith.ai (2026)
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
            Smith.ai starts at $292.50/month for just 30 calls. NEXUS Pro is $149/month for 500 minutes of 24/7 AI answering. Here is the full comparison.
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
            Smith.ai is an AI-assisted answering service that blends automated AI with human agents. It starts at $292.50/month for 30 outbound calls — roughly $9.75 per call. NEXUS is a pure AI receptionist starting at $25/month, with the Pro plan at $149/month covering 500 minutes of calls around the clock. If you want 24/7 coverage at a predictable flat rate, NEXUS costs roughly half as much and never closes.
          </p>
          <p className="mt-3 text-xs text-slate-500 italic">
            Disclaimer: Smith.ai pricing is based on publicly available information. Pricing may change. Verify directly at smith.ai before making purchasing decisions.
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
                  <th className="px-4 py-3 text-left font-semibold text-slate-400">Smith.ai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                {[
                  ['Starting price', '$25/month', '$292.50/month'],
                  ['Answering method', 'Pure AI, 24/7', 'AI + human hybrid'],
                  ['Availability', '24/7/365', '24/7 (AI) / business hours (human)'],
                  ['Included calls', '30 calls on Lite / 500 min on Pro', '30 outbound calls on Starter'],
                  ['Billing model', 'Flat monthly rate', 'Per-call pricing'],
                  ['Appointment booking', 'Every plan', 'Add-on or higher tiers'],
                  ['Call recordings', 'Every plan', 'Available'],
                  ['CRM integrations', 'Zapier, HubSpot, Salesforce (Scale+)', 'HubSpot, Salesforce, Clio, and more'],
                  ['Setup time', '24–48 hours', 'Several business days'],
                  ['Contracts', 'None, cancel anytime', 'Monthly or annual'],
                  ['Keep existing number', 'Yes', 'Yes'],
                ].map(([feature, nexus, smith]) => (
                  <tr key={feature}>
                    <td className="px-4 py-3 text-slate-400">{feature}</td>
                    <td className="px-4 py-3 font-medium text-teal-300">{nexus}</td>
                    <td className="px-4 py-3 text-slate-400">{smith}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Pricing Comparison</h2>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* NEXUS pricing */}
            <div className="rounded-2xl border border-teal-500/40 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="size-2 rounded-full bg-teal-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">NEXUS</span>
              </div>
              {[
                { plan: 'Lite', price: '$25/mo', detail: '30 calls / 90 minutes' },
                { plan: 'Pro', price: '$149/mo', detail: '500 minutes (~165 calls)' },
                { plan: 'Scale', price: '$349/mo', detail: '1,500 minutes (~500 calls)' },
              ].map(({ plan, price, detail }) => (
                <div key={plan} className="mb-3 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                  <div>
                    <span className="text-sm font-semibold text-white">{plan}</span>
                    <span className="ml-2 text-xs text-slate-500">{detail}</span>
                  </div>
                  <span className="text-sm font-bold text-teal-400">{price}</span>
                </div>
              ))}
              <p className="mt-3 text-xs text-slate-500">All features included on every plan. No per-minute fees. Cancel anytime.</p>
            </div>

            {/* Smith.ai pricing */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="size-2 rounded-full bg-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Smith.ai</span>
              </div>
              {[
                { plan: 'Starter', price: '$292.50/mo', detail: '30 calls' },
                { plan: 'Basic', price: '$562.50/mo', detail: '60 calls' },
                { plan: 'Growing', price: '$1,312.50/mo', detail: '150 calls' },
              ].map(({ plan, price, detail }) => (
                <div key={plan} className="mb-3 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                  <div>
                    <span className="text-sm font-semibold text-white">{plan}</span>
                    <span className="ml-2 text-xs text-slate-500">{detail}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-400">{price}</span>
                </div>
              ))}
              <p className="mt-3 text-xs text-slate-500">Per-call pricing. Human agent involvement adds cost. Pricing subject to change.</p>
            </div>
          </div>

          <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 px-6 py-4">
            <p className="text-sm font-medium text-teal-300">
              At 100 calls per month, Smith.ai costs roughly <span className="font-bold text-white">$975/month</span>. NEXUS Pro handles 165+ calls for <span className="font-bold text-white">$149/month</span> — a saving of over $9,900 per year.
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
                nexus: 'NEXUS answers every call 24/7/365, including nights, weekends, and holidays. The AI never sleeps, never calls in sick, and handles unlimited simultaneous calls.',
                smith: 'Smith.ai offers 24/7 AI coverage, but the human agent layer operates during business hours. Complex calls that escalate to a human agent after hours may be handled differently.',
              },
              {
                title: 'Pricing model',
                nexus: 'NEXUS charges a flat monthly rate per plan. You know your exact cost every month. No per-call fees, no overage surprises beyond the clear overage rate shown on the pricing page — and you must approve any overage charges before they apply.',
                smith: 'Smith.ai charges per call. Their Starter plan is $292.50/month for 30 calls — roughly $9.75 per call. As call volume grows, costs scale steeply.',
              },
              {
                title: 'AI vs human hybrid',
                nexus: 'NEXUS is a pure AI receptionist. It handles the full conversation — greeting, qualification, booking, and follow-up — without human involvement. This keeps costs low and availability high.',
                smith: 'Smith.ai blends AI with human agents. For businesses that want a human touch on complex calls, this adds value. For businesses that primarily need reliable volume coverage at low cost, the hybrid model adds cost without proportional benefit.',
              },
              {
                title: 'Setup and onboarding',
                nexus: 'NEXUS is configured during onboarding and live within 24–48 hours. You keep your existing business number and set up call forwarding.',
                smith: 'Smith.ai requires onboarding with their team, intake form setup, and receptionist briefing. Expect several business days before going live.',
              },
            ].map(({ title, nexus, smith }) => (
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
                      <span className="size-1.5 rounded-full bg-slate-500" /> Smith.ai
                    </p>
                    <p className="text-sm leading-relaxed text-slate-400">{smith}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where Smith.ai wins */}
        <section className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Where Smith.ai is stronger</h2>
            <ul className="flex flex-col gap-3">
              {[
                'Human agents for nuanced, complex calls',
                'Strong CRM integrations including Clio (legal)',
                'Established track record since 2015',
                'Intake qualification workflows for law firms',
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
                'Starts at $25/mo — Smith.ai starts at $292.50/mo',
                '24/7/365 with no after-hours gaps',
                'Transparent pricing, no per-call fees',
                'Unlimited simultaneous calls',
                'Live in 24–48 hours, keep your existing number',
                'No surprise bills — you approve any overages',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />{item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                q: 'Is NEXUS cheaper than Smith.ai?',
                a: 'Yes. NEXUS Lite starts at $25/month. Smith.ai starts at $292.50/month for 30 calls. NEXUS Pro at $149/month covers 500 minutes — more calls than Smith.ai\'s $562.50 Basic plan.',
              },
              {
                q: 'Does Smith.ai offer 24/7 coverage?',
                a: 'Smith.ai provides 24/7 AI coverage, but their human agent layer operates during business hours. NEXUS is fully AI-powered and handles every call the same way regardless of the time.',
              },
              {
                q: 'Can I switch from Smith.ai to NEXUS?',
                a: 'Yes. Switching involves updating your call forwarding number to your NEXUS number. NEXUS is live in 24–48 hours. You can run both services during the transition. No contract lock-in.',
              },
              {
                q: 'Does NEXUS do appointment booking like Smith.ai?',
                a: 'Yes. NEXUS books appointments directly into Google Calendar on every plan. Scale and Custom plans include additional integrations with Outlook and other calendar tools.',
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
          <h2 className="mb-4 text-2xl font-bold">NEXUS vs Smith.ai: Which should you choose?</h2>
          <p className="mb-4 text-slate-300 leading-relaxed">
            Choose Smith.ai if you handle complex, high-stakes calls — legal intake, medical triage, situations where a human agent\'s judgment adds real value and you can afford $9.75+ per call.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Choose NEXUS if you need reliable 24/7 answering at a predictable cost. At $149/month for 500 minutes versus $292.50/month for 30 calls, NEXUS delivers more coverage for less than half the price. For service businesses that receive consistent call volume and want their receptionist to never miss a call — day or night — NEXUS is the clear choice.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">Ready to switch?</h2>
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
