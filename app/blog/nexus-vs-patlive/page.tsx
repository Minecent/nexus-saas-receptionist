import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import { blogPostingSchema } from '@/lib/schema'
import { CalendlyButton } from '@/components/landing/calendly-button'

export const metadata: Metadata = {
  title: 'PATLive Alternative 2026: NEXUS vs PATLive (Pricing + Features)',
  description:
    'How PATLive and NEXUS differ on coverage, billing model, and setup. Full comparison for 2026.',
}

const schema = blogPostingSchema({
  headline: 'PATLive Alternative 2026: NEXUS vs PATLive (Pricing + Features)',
  description: 'How PATLive and NEXUS differ on coverage, billing model, and setup. Full comparison for 2026.',
  slug: 'nexus-vs-patlive',
  keywords: ['PATLive alternative', 'AI receptionist', 'virtual receptionist comparison', 'NEXUS vs PATLive'],
})

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
      {children}
    </p>
  )
}

function Disclaimer({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-xs text-slate-500 italic">{children}</p>
}

export default function NexusVsPATLivePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            NEXUS<span className="text-teal-400">.</span>
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
          >
            Try NEXUS
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

        {/* ── 1. HERO ── */}
        <section className="mb-20 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400">
            Updated April 2026
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            PATLive Alternative 2026:<br className="hidden sm:block" /> NEXUS vs PATLive
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
            PATLive charges per minute and limits coverage to what their agents can handle. NEXUS charges a flat monthly rate and answers every call 24/7 — no matter the volume.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-white hover:bg-teal-600 transition-colors"
          >
            Try NEXUS Today &rarr;
          </Link>
          <p className="mt-3 text-xs text-slate-500">Keep your existing number. No contracts. Live in 24–48 hours.</p>
        </section>

        {/* ── 2. TL;DR ── */}
        <section className="mb-16 rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-400">TL;DR</p>
          <p className="text-slate-300 leading-relaxed">
            PATLive is a US-based live receptionist service. Their entry plan bundles a limited number of live minutes, billed per minute with overage fees once you go over. NEXUS is a flat monthly plan with 24/7 answering and no surprise invoices. For most service businesses, NEXUS delivers considerably more coverage on one predictable plan.
          </p>
          <Disclaimer>PATLive pricing based on publicly available information as of April 2026. Verify at patlive.com before making purchasing decisions.</Disclaimer>
        </section>

        {/* ── 3. QUICK COMPARISON TABLE ── */}
        <section className="mb-20">
          <SectionLabel>At a glance</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Quick comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Dimension</th>
                  <th className="px-5 py-4 text-left font-semibold text-teal-400">NEXUS</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">PATLive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {[
                  ['Pricing model', 'Flat monthly plan, quoted per business', 'Per-minute bundles with overage*'],
                  ['Billing model', 'Flat monthly — no per-minute fees', 'Per minute + overage charges'],
                  ['Availability', '24/7/365', '24/7 (all plans, additional cost)'],
                  ['Answering method', 'AI-powered', 'US-based live receptionists'],
                  ['Simultaneous calls', 'Unlimited', 'Limited by available agents'],
                  ['Appointment booking', 'Every plan — Google Calendar', 'Available, depends on plan'],
                  ['Call recordings', 'Every plan', 'Available on higher plans'],
                  ['Setup time', '24–48 hours', '1–3 business days'],
                  ['Contracts', 'None, cancel anytime', 'Month-to-month'],
                ].map(([dim, nexus, pat]) => (
                  <tr key={dim}>
                    <td className="px-5 py-4 font-medium text-slate-300">{dim}</td>
                    <td className="px-5 py-4 text-teal-300">{nexus}</td>
                    <td className="px-5 py-4 text-slate-400">{pat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Disclaimer>* PATLive pricing based on publicly available information. Visit patlive.com for current rates.</Disclaimer>
        </section>

        {/* ── 4. THE MINUTE BILLING PROBLEM ── */}
        <section className="mb-20">
          <SectionLabel>Cost breakdown</SectionLabel>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">The per-minute billing problem</h2>
          <p className="mb-4 text-slate-400 leading-relaxed">
            PATLive&rsquo;s Starter plan gives you 75 minutes per month of live answering. At an average call length of 3 minutes, that is roughly 25 calls before you hit overage fees. For most active service businesses, 25 calls is a slow week — not a full month.
          </p>
          <p className="mb-4 text-slate-400 leading-relaxed">
            Once you exceed your minute allotment, overage charges kick in automatically. A busy month can easily push your invoice well above your base plan with no warning.
          </p>
          <p className="text-slate-400 leading-relaxed">
            NEXUS charges a flat monthly rate. No per-minute tracking. No surprise bills. You know exactly what you are paying before the month starts.
          </p>
          <div className="mt-6 rounded-xl border border-rose-500/20 bg-rose-500/5 px-6 py-4">
            <p className="text-sm text-rose-300">
              <strong className="text-white">Example:</strong> 80 calls at 3 min average = 240 minutes. PATLive Starter covers 75 minutes. That is 165 minutes of overage on top of the base plan. A NEXUS plan covering 500 minutes is one flat monthly figure. Total.
            </p>
          </div>
        </section>

        {/* ── 5. PRICING TABLE ── */}
        <section className="mb-20">
          <SectionLabel>Pricing comparison</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Cost at different call volumes</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Monthly volume</th>
                  <th className="px-5 py-4 text-left font-semibold text-teal-400">NEXUS</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">PATLive (est.)*</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {[
                  ['30 calls/month', 'Flat rate, every feature', 'Within entry bundle', 'Comparable coverage'],
                  ['100 calls/month', 'Flat rate, every feature', 'Overage begins', 'NEXUS stays predictable'],
                  ['300+ calls/month', 'Flat rate, every feature', 'Substantial overage', 'NEXUS stays predictable'],
                ].map(([vol, nexus, pat, diff]) => (
                  <tr key={vol}>
                    <td className="px-5 py-4 font-medium text-slate-300">{vol}</td>
                    <td className="px-5 py-4 font-semibold text-teal-300">{nexus}</td>
                    <td className="px-5 py-4 text-slate-400">{pat}</td>
                    <td className="px-5 py-4 text-slate-500">{diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Disclaimer>* PATLive estimates based on public pricing. Exact costs depend on call duration, plan tier, and overages. Verify at patlive.com.</Disclaimer>
        </section>

        {/* ── 6. FEATURE COMPARISON ── */}
        <section className="mb-20">
          <SectionLabel>Feature breakdown</SectionLabel>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">Feature by feature</h2>
          <p className="mb-8 text-slate-400">Both services answer calls. The differences are in cost structure, scale, and always-on coverage.</p>
          <div className="flex flex-col gap-6">
            {[
              {
                title: 'Availability',
                nexus: 'NEXUS answers every call 24/7/365 — nights, weekends, holidays — on every plan. No extra charge for after-hours.',
                competitor: 'PATLive offers 24/7 coverage across plans, but after-hours live answering is typically an add-on or available on higher tiers.',
              },
              {
                title: 'Cost predictability',
                nexus: 'Flat monthly rate. You know your cost before the month starts. Any overage requires your explicit approval.',
                competitor: 'Per-minute billing means a busier month automatically produces a larger invoice. Overage charges can add up quickly.',
              },
              {
                title: 'Call capacity',
                nexus: 'Unlimited simultaneous calls. Ten calls at the same time — every caller gets answered instantly.',
                competitor: 'Live agent capacity is finite. During peak periods, callers may experience hold times or queue waits.',
              },
              {
                title: 'Appointment booking',
                nexus: 'Books directly into Google Calendar on every plan. Caller gets confirmation, you get the appointment. No staff involved.',
                competitor: 'PATLive can capture appointment details and pass them to your calendar system, but integration depth varies by plan.',
              },
              {
                title: 'Integrations',
                nexus: 'Connect to 7,000+ apps via Zapier on Pro+. Direct CRM connections (Outlook, Salesforce, HubSpot) on Scale+.',
                competitor: 'PATLive integrates with CRMs and scheduling tools, but typically requires setup and varies by plan.',
              },
            ].map(({ title, nexus, competitor }) => (
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
                      <span className="size-1.5 rounded-full bg-slate-500" /> PATLive
                    </p>
                    <p className="text-sm leading-relaxed text-slate-400">{competitor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. HONEST TAKE ── */}
        <section className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">When PATLive is stronger</h2>
            <ul className="flex flex-col gap-3">
              {[
                'US-based live human voice on every call',
                'Strong for high-touch intake — legal, medical, financial',
                'Established reputation with enterprise clients',
                'Human judgment for complex, nuanced calls',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                  <Minus className="mt-0.5 size-4 shrink-0 text-slate-500" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-teal-500/30 bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">When NEXUS is stronger</h2>
            <ul className="flex flex-col gap-3">
              {[
                'Flat monthly rate instead of per-minute billing',
                'Flat rate — no surprise overage bills',
                'Unlimited simultaneous calls',
                '24/7/365 on every plan, no add-ons',
                'Appointment booking included',
                'Live in 24–48 hours',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />{item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 8. HOW TO SWITCH ── */}
        <section className="mb-20">
          <SectionLabel>Migration guide</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">How to switch from PATLive to NEXUS</h2>
          <ol className="space-y-4">
            {[
              ['Sign up for NEXUS', 'Create your account — takes 2 minutes.'],
              ['Complete onboarding', 'Our 6-step setup takes about 15 minutes. Tell us about your business, pick your voice, and set your call rules.'],
              ['We configure your agent', 'Our team sets up your NEXUS agent within 24–48 hours, trained on your business.'],
              ['Forward your business line', 'A simple call-forwarding change in your phone provider settings. Keep your existing number throughout.'],
              ['Cancel PATLive per their terms', 'Review PATLive\'s cancellation policy before switching to avoid billing for an unused period.'],
            ].map(([title, desc], i) => (
              <li key={title} className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-xs font-bold text-teal-400 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-sm text-slate-400">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 9. FAQ ── */}
        <section className="mb-20">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Common questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is NEXUS cheaper than PATLive?',
                a: 'They are billed differently. PATLive bundles a limited number of live minutes and charges overage beyond them. NEXUS is a flat monthly plan quoted for your business, with every feature included and any overage approved by you first. Book a demo for a quote on your setup.',
              },
              {
                q: 'Does PATLive offer 24/7 coverage?',
                a: 'PATLive does offer 24/7 coverage, but after-hours live answering availability depends on the plan and may cost extra. NEXUS includes 24/7/365 AI answering on every plan with no add-on required.',
              },
              {
                q: 'Will I get surprise bills switching to NEXUS?',
                a: 'Never. NEXUS notifies you when you approach your call limit and requires your explicit approval before any overage charges are applied. You always know exactly what you\'re paying.',
              },
              {
                q: 'Can I keep my business phone number?',
                a: 'Yes. You keep your existing number and set up call forwarding to your NEXUS number. No porting, no new number, no disruption to your callers.',
              },
              {
                q: 'What businesses benefit most from NEXUS over PATLive?',
                a: 'HVAC companies, plumbers, property managers, dental practices, and real estate agents — businesses with high call volumes and a need for 24/7 coverage without per-minute billing eating into margins.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
                <p className="mb-2 font-semibold text-white">{q}</p>
                <p className="text-sm leading-relaxed text-slate-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. VERDICT ── */}
        <section className="mb-16 rounded-2xl border border-teal-500/30 bg-teal-500/5 p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-400">Final Verdict</p>
          <h2 className="mb-4 text-2xl font-bold">NEXUS vs PATLive: Which should you choose?</h2>
          <p className="mb-4 text-slate-300 leading-relaxed">
            Choose PATLive if your calls require genuine human empathy and judgment — high-stakes legal intake, sensitive medical conversations, or enterprise clients who specifically request a live voice.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Choose NEXUS if you want predictable pricing, round-the-clock coverage, and the ability to handle any call volume without watching the clock. For most service businesses, NEXUS handles the volume at a fraction of what PATLive charges.
          </p>
        </section>

        {/* ── 11. CTA ── */}
        <section className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">Stop paying per minute</h2>
          <p className="mb-8 text-base text-teal-100">Keep your existing number. Live in 24–48 hours. No contracts.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal-600 hover:bg-teal-50 transition-colors"
            >
              Get Started with NEXUS
            </Link>
            <CalendlyButton className="rounded-lg border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Schedule a Demo
            </CalendlyButton>
          </div>
          <p className="mt-4 text-xs text-teal-100/70">
            See all comparisons in our <Link href="/blog" className="underline">blog</Link>.
          </p>
        </section>

      </main>

      <footer className="border-t border-slate-800 mt-20 px-4 py-8 text-center text-xs text-slate-600 sm:px-6">
        <p>NEXUS AI Receptionist. All pricing comparisons are based on publicly available information and are provided for general guidance only.</p>
        <p className="mt-1">PATLive is a trademark of its respective owner. NEXUS is not affiliated with PATLive.</p>
      </footer>
    </div>
  )
}
