import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import { blogPostingSchema } from '@/lib/schema'
import { CalendlyButton } from '@/components/landing/calendly-button'

export const metadata: Metadata = {
  title: 'Abby Connect Alternative 2026: NEXUS vs Abby Connect (Pricing + Features)',
  description:
    'How Abby Connect and NEXUS differ on coverage, billing model, appointment booking, and setup. Full comparison for 2026.',
}

const schema = blogPostingSchema({
  headline: 'Abby Connect Alternative 2026: NEXUS vs Abby Connect (Pricing + Features)',
  description: 'How Abby Connect and NEXUS differ on coverage, billing model, appointment booking, and setup. Full comparison for 2026.',
  slug: 'nexus-vs-abby-connect',
  keywords: ['Abby Connect alternative', 'AI receptionist', 'virtual receptionist comparison', 'NEXUS vs Abby Connect'],
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

export default function NexusVsAbbyConnectPage() {
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
            Abby Connect Alternative 2026:<br className="hidden sm:block" /> NEXUS vs Abby Connect
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
            Abby Connect is known for a personal, friendly touch during staffed hours. NEXUS answers every call 24/7/365 on a flat monthly plan, with no per-minute billing.
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
            Abby Connect is a boutique live receptionist service focused on small businesses and law firms. Their plans are built around a bundle of live minutes, billed per minute with overage fees once the bundle runs out. NEXUS is a flat monthly plan with 24/7 answering and unlimited simultaneous calls. For businesses where cost predictability and round-the-clock coverage matter, NEXUS is the stronger choice.
          </p>
          <Disclaimer>Abby Connect pricing based on publicly available information as of April 2026. Verify at abby.com before making purchasing decisions.</Disclaimer>
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
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Abby Connect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {[
                  ['Pricing model', 'Flat monthly plan, quoted per business', 'Per-minute bundles with overage*'],
                  ['Billing model', 'Flat monthly — no per-minute fees', 'Per minute + overage charges'],
                  ['Availability', '24/7/365', 'Business hours + after-hours option'],
                  ['Answering method', 'AI-powered', 'US-based live receptionists'],
                  ['Simultaneous calls', 'Unlimited', 'Limited by available agents'],
                  ['Appointment booking', 'Every plan — Google Calendar', 'Available on select plans'],
                  ['Call recordings', 'Every plan', 'Depends on plan'],
                  ['Setup time', '24–48 hours', '1–3 business days'],
                  ['Contracts', 'None, cancel anytime', 'Monthly with notice period'],
                ].map(([dim, nexus, abby]) => (
                  <tr key={dim}>
                    <td className="px-5 py-4 font-medium text-slate-300">{dim}</td>
                    <td className="px-5 py-4 text-teal-300">{nexus}</td>
                    <td className="px-5 py-4 text-slate-400">{abby}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Disclaimer>* Abby Connect pricing based on publicly available information. Visit abby.com for current rates.</Disclaimer>
        </section>

        {/* ── 4. WHY BUSINESSES LOOK FOR ALTERNATIVES ── */}
        <section className="mb-20">
          <SectionLabel>Context</SectionLabel>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">Why businesses look for Abby Connect alternatives</h2>
          <p className="mb-8 text-slate-400">Common reasons we hear from businesses exploring options</p>
          <ul className="space-y-4">
            {[
              'Per-minute billing means unpredictable invoices — a busy month or a few long calls can blow past the base plan price.',
              'Bundled live minutes make the cost per call hard to predict once volume grows beyond the entry plan.',
              'Live receptionist capacity is limited. Multiple simultaneous calls mean some callers wait — or get voicemail.',
              'After-hours coverage is typically an add-on or limited, leaving gaps on nights, weekends, and holidays.',
              'Scaling up requires moving to a more expensive plan — volume discounts are modest compared to AI pricing.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />
                <span className="text-sm text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
            <p className="text-xs text-amber-400">
              These are general industry patterns, not specific claims about Abby Connect. Abby Connect is a well-regarded service with strong customer reviews. These limitations apply broadly to per-minute live answering services.
            </p>
          </div>
        </section>

        {/* ── 5. PRICING TABLE ── */}
        <section className="mb-20">
          <SectionLabel>Pricing comparison</SectionLabel>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Cost at different call volumes</h2>
          <p className="mb-6 text-slate-400">How the numbers change as your call volume grows.</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Monthly volume</th>
                  <th className="px-5 py-4 text-left font-semibold text-teal-400">NEXUS</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Abby Connect (est.)*</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {[
                  ['30 calls/month', 'Flat rate, every feature', 'Within entry bundle', 'Comparable coverage'],
                  ['100 calls/month', 'Flat rate, every feature', 'Overage begins', 'NEXUS stays predictable'],
                  ['300+ calls/month', 'Flat rate, every feature', 'Substantial overage', 'NEXUS stays predictable'],
                ].map(([vol, nexus, abby, diff]) => (
                  <tr key={vol}>
                    <td className="px-5 py-4 font-medium text-slate-300">{vol}</td>
                    <td className="px-5 py-4 font-semibold text-teal-300">{nexus}</td>
                    <td className="px-5 py-4 text-slate-400">{abby}</td>
                    <td className="px-5 py-4 text-slate-500">{diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Disclaimer>* Abby Connect estimates based on public pricing and average call durations. Verify exact costs at abby.com.</Disclaimer>
        </section>

        {/* ── 6. FEATURE COMPARISON ── */}
        <section className="mb-20">
          <SectionLabel>Feature breakdown</SectionLabel>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">Feature by feature</h2>
          <p className="mb-8 text-slate-400">Abby Connect is known for warmth and personal touch. NEXUS is built for volume, consistency, and 24/7 coverage.</p>
          <div className="flex flex-col gap-6">
            {[
              {
                title: 'Availability',
                nexus: 'NEXUS answers every call 24/7/365 on every plan — nights, weekends, bank holidays — with no additional cost or add-on required.',
                competitor: 'Abby Connect receptionists work during business hours. After-hours coverage is available but may cost extra or be limited on entry plans.',
              },
              {
                title: 'Cost predictability',
                nexus: 'Flat monthly rate. You know what you\'re paying before the month starts. Any overage requires your explicit approval.',
                competitor: 'Per-minute billing. Longer calls or higher volume automatically produce a larger invoice. Overages can add hundreds of dollars in a busy month.',
              },
              {
                title: 'Call capacity',
                nexus: 'Handles unlimited simultaneous calls. A rush of calls during lunch or after a campaign goes out — every caller gets answered.',
                competitor: 'Capacity depends on available agents. Simultaneous calls during peak times may result in wait queues or voicemail.',
              },
              {
                title: 'Appointment booking',
                nexus: 'Books directly into Google Calendar on every plan. Caller confirms, calendar updates, no staff involvement needed.',
                competitor: 'Abby Connect can take appointment details and relay them, with calendar integration available depending on your setup.',
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
                      <span className="size-1.5 rounded-full bg-slate-500" /> Abby Connect
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
            <h2 className="mb-4 text-lg font-bold text-white">When Abby Connect is stronger</h2>
            <ul className="flex flex-col gap-3">
              {[
                'US-based receptionists with genuine warmth and personality',
                'Small law firms focused on client relationship quality',
                'Businesses where callers expect and value a human',
                'Complex calls requiring judgment and emotional intelligence',
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
                '24/7/365 included on every plan',
                'Unlimited simultaneous calls',
                'Appointment booking on every plan',
                'Live in 24–48 hours',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />{item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 8. USE CASES ── */}
        <section className="mb-20">
          <SectionLabel>Best choice by use case</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Which is right for your business?</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                scenario: 'HVAC, plumbing, or home services',
                winner: 'NEXUS',
                reason: 'High call volume, after-hours emergency calls, price-sensitive margins. Flat-rate AI answering wins on cost and coverage.',
              },
              {
                scenario: 'Boutique law firm — estate planning or family law',
                winner: 'Abby Connect',
                reason: 'First-call relationships matter. Clients expect warmth and discretion. A live voice may justify the premium.',
              },
              {
                scenario: 'Dental or medical practice',
                winner: 'NEXUS',
                reason: 'High appointment volume, after-hours coverage for urgent calls, predictable monthly costs. AI handles scheduling reliably.',
              },
              {
                scenario: 'Real estate agency',
                winner: 'NEXUS',
                reason: 'Leads call at all hours. After-hours AI answering captures inquiries that would otherwise go to voicemail.',
              },
              {
                scenario: 'High-touch financial advisory',
                winner: 'Abby Connect',
                reason: 'Clients expect professional, personalized service. A live receptionist builds confidence on first contact.',
              },
            ].map(({ scenario, winner, reason }) => (
              <div key={scenario} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-2 flex items-center gap-3">
                  <p className="font-semibold text-white text-sm">{scenario}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${winner === 'NEXUS' ? 'bg-teal-500/15 text-teal-400' : 'bg-slate-700 text-slate-300'}`}>
                    {winner} wins
                  </span>
                </div>
                <p className="text-sm text-slate-400">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 9. HOW TO SWITCH ── */}
        <section className="mb-20">
          <SectionLabel>Migration guide</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">How to switch from Abby Connect to NEXUS</h2>
          <ol className="space-y-4">
            {[
              ['Sign up for NEXUS', 'Create your account — takes 2 minutes.'],
              ['Complete onboarding', 'Our 6-step setup takes about 15 minutes. Tell us about your business, choose your voice, and configure call handling rules.'],
              ['We configure your agent', 'Our team sets up your NEXUS agent within 24–48 hours, trained on your specific business.'],
              ['Forward your business line', 'A simple call-forwarding change with your phone carrier. You keep your existing number throughout.'],
              ['Cancel Abby Connect per their terms', 'Check Abby Connect\'s cancellation notice period before switching to avoid paying for an unused month.'],
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

        {/* ── 10. FAQ ── */}
        <section className="mb-20">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Common questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is NEXUS cheaper than Abby Connect?',
                a: 'They are billed differently. Abby Connect sells bundles of live minutes with overage charges on top, so your invoice moves with your call volume. NEXUS is a flat monthly plan quoted for your business, with every feature included and any overage approved by you first. Book a demo and we will quote your setup directly.',
              },
              {
                q: 'Does Abby Connect offer 24/7 coverage?',
                a: 'Abby Connect\'s coverage model focuses on business hours, with after-hours options available at additional cost or on higher plans. NEXUS includes 24/7/365 AI answering on every plan, including nights, weekends, and public holidays.',
              },
              {
                q: 'What industries is NEXUS best for?',
                a: 'NEXUS works well for any business with a significant inbound call volume: HVAC, plumbing, electricians, dental practices, property management, real estate, legal intake scheduling, and medical offices. If your business gets calls after hours or on weekends, NEXUS is a strong fit.',
              },
              {
                q: 'Can I keep my business phone number when switching?',
                a: 'Yes. You keep your existing number and configure call forwarding to NEXUS. No number porting, no disruption to existing callers.',
              },
              {
                q: 'What happens if I get more calls than my plan covers?',
                a: 'NEXUS will notify you before applying any overage charges. You explicitly approve before anything extra is billed. You are never surprised by your invoice.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
                <p className="mb-2 font-semibold text-white">{q}</p>
                <p className="text-sm leading-relaxed text-slate-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 11. VERDICT ── */}
        <section className="mb-16 rounded-2xl border border-teal-500/30 bg-teal-500/5 p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-400">Final Verdict</p>
          <h2 className="mb-4 text-2xl font-bold">NEXUS vs Abby Connect: Which should you choose?</h2>
          <p className="mb-4 text-slate-300 leading-relaxed">
            Choose Abby Connect if your business prioritizes a human voice and you handle calls where personal warmth directly drives client trust — boutique law, high-end financial advisory, or relationship-first services.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Choose NEXUS if you want 24/7 coverage, predictable costs, and the ability to scale without watching a minute counter. For most service businesses — HVAC, dental, property management, real estate — NEXUS delivers what matters at a fraction of the price.
          </p>
        </section>

        {/* ── 12. CTA ── */}
        <section className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">Professional AI answering, around the clock</h2>
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
        <p className="mt-1">Abby Connect is a trademark of its respective owner. NEXUS is not affiliated with Abby Connect.</p>
      </footer>
    </div>
  )
}
