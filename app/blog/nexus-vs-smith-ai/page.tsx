import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { blogPostingSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'NEXUS vs Smith.ai (2026): AI Receptionist Pricing & Features Compared',
  description: 'Smith.ai blends AI with human agents and bills per call. NEXUS is a flat monthly plan with 24/7 coverage and no per-call fees. Full comparison.',
}

const schema = blogPostingSchema({
  headline: 'NEXUS vs Smith.ai (2026): AI Receptionist Pricing & Features Compared',
  description: 'Smith.ai blends AI with human agents and bills per call. NEXUS is a flat monthly plan with 24/7 coverage and no per-call fees. Full comparison.',
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
            Smith.ai bills per call with a limited call allowance. NEXUS is a flat monthly plan covering 24/7 AI answering. Here is the full comparison.
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
            Smith.ai is an AI-assisted answering service that blends automated AI with human agents. Their plans allow a set number of calls per month, billed per call beyond that. NEXUS is a pure AI receptionist on a flat monthly plan, covering far more call volume around the clock. If you want 24/7 coverage at a predictable flat rate, NEXUS never closes and never bills by the call.
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
                  ['Pricing model', 'Flat monthly plan, quoted per business', 'Per-call billing with allowances'],
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
              <p className="mt-3 text-xs text-slate-500">All features included on every plan. No per-minute fees. Cancel anytime.</p>
            </div>

            {/* Smith.ai pricing */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="size-2 rounded-full bg-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Smith.ai</span>
              </div>
              {[
                { plan: 'Starter', price: 'Per-call billing', detail: '30 calls included' },
                { plan: 'Basic', price: 'Per-call billing', detail: '60 calls included' },
                { plan: 'Growing', price: 'Per-call billing', detail: '150 calls included' },
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
              At 100 calls per month, per-call billing means <span className="font-bold text-white">your invoice scales with every call answered</span>. A NEXUS plan covering 165+ calls stays at <span className="font-bold text-white">one flat monthly figure</span> — the same whether it is a quiet month or your busiest.
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
                smith: 'Smith.ai charges per call, with a limited number of calls included in each plan. As call volume grows, costs scale steeply.',
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
                'Flat monthly rate instead of per-call billing',
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
                a: 'They are billed differently. Smith.ai charges per call with a limited allowance per plan. NEXUS is a flat monthly plan quoted for your business, covering far more call volume. Book a demo for a quote on your setup.',
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
            Choose Smith.ai if you handle complex, high-stakes calls &mdash; legal intake, medical triage, situations where a human agent&rsquo;s judgment adds real value and per-call pricing is worth it.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Choose NEXUS if you need reliable 24/7 answering at a predictable cost. On one flat monthly plan instead of per-call billing, NEXUS delivers considerably more coverage for a predictable figure. For service businesses that receive consistent call volume and want their receptionist to never miss a call — day or night — NEXUS is the clear choice.
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
