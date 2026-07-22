import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X, Minus } from 'lucide-react'
import { blogPostingSchema } from '@/lib/schema'
import { CalendlyButton } from '@/components/landing/calendly-button'

export const metadata: Metadata = {
  title: 'Ruby Receptionists Alternative 2026: NEXUS vs Ruby (Pricing + Features)',
  description:
    'Looking for a Ruby Receptionists alternative? Compare NEXUS AI Receptionist pricing, features, and limitations honestly.',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
      {children}
    </p>
  )
}

function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-xs text-slate-500 italic">{children}</p>
  )
}

const schema = blogPostingSchema({
  headline: 'Ruby Receptionists Alternative 2026: NEXUS vs Ruby (Pricing + Features)',
  description: 'Looking for a Ruby Receptionists alternative? Compare NEXUS AI Receptionist pricing, features, and limitations honestly.',
  slug: 'nexus-vs-ruby-receptionists',
  keywords: ['Ruby Receptionists alternative', 'AI receptionist', 'virtual receptionist comparison', 'NEXUS vs Ruby'],
})

export default function NexusVsRubyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Nav */}
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
            Ruby Receptionists Alternative 2026:<br className="hidden sm:block" /> NEXUS vs Ruby
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
            Honest comparison: AI receptionist vs live human receptionist service
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-white hover:bg-teal-600 transition-colors"
          >
            Try NEXUS Today
          </Link>
        </section>

        {/* ── 2. QUICK COMPARISON TABLE ── */}
        <section className="mb-20">
          <SectionLabel>At a glance</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Quick comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Dimension</th>
                  <th className="px-5 py-4 text-left font-semibold text-teal-400">NEXUS</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Ruby Receptionists</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {[
                  ['Pricing model', 'Flat monthly plan, quoted per business', 'Per-minute bundles with overage*'],
                  ['Billing model', 'Per call', 'Per minute'],
                  ['Setup time', '24–48 hours with white-glove setup', '1–3 business days'],
                  ['Contract', 'Month-to-month', 'Month-to-month with notice period'],
                  ['Service type', 'AI receptionist', 'Live human receptionist'],
                ].map(([dim, nexus, ruby]) => (
                  <tr key={dim}>
                    <td className="px-5 py-4 font-medium text-slate-300">{dim}</td>
                    <td className="px-5 py-4 text-teal-300">{nexus}</td>
                    <td className="px-5 py-4 text-slate-400">{ruby}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Disclaimer>* Ruby pricing based on publicly available information as of April 2026. Verify at ruby.com before making any decisions.</Disclaimer>
        </section>

        {/* ── 3. WHY BUSINESSES LOOK FOR ALTERNATIVES ── */}
        <section className="mb-20">
          <SectionLabel>Context</SectionLabel>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">Why businesses look for Ruby alternatives</h2>
          <p className="mb-8 text-slate-400">Common reasons we hear from businesses exploring their options</p>
          <ul className="space-y-4">
            {[
              'Per-minute billing can lead to unpredictable invoices during busy months — a common concern with live answering services generally.',
              'Live human services typically cost 5–10× more than AI alternatives, making them difficult to justify for small and medium businesses.',
              'Limited concurrent call handling — if multiple customers call simultaneously, some may wait in a queue.',
              'Language support is usually limited to English and Spanish with most human receptionist services.',
              'After-hours and weekend coverage often costs extra or is unavailable on entry-level plans.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />
                <span className="text-sm text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
            <p className="text-xs text-amber-400">
              These are general industry patterns, not specific claims about Ruby. Your experience may vary — Ruby is a well-regarded service with many satisfied customers.
            </p>
          </div>
        </section>

        {/* ── 4. PRICING COMPARISON ── */}
        <section className="mb-20">
          <SectionLabel>Cost breakdown</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Pricing at different call volumes</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Monthly volume</th>
                  <th className="px-5 py-4 text-left font-semibold text-teal-400">NEXUS</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Ruby (est.)*</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {[
                  ['30 calls/month', 'Flat rate, every feature', 'Within entry bundle', 'Comparable coverage'],
                  ['100 calls/month', 'Flat rate, every feature', 'Overage begins', 'NEXUS stays predictable'],
                  ['300+ calls/month', 'Flat rate, every feature', 'Substantial overage', 'NEXUS stays predictable'],
                ].map(([vol, nexus, ruby, diff]) => (
                  <tr key={vol}>
                    <td className="px-5 py-4 font-medium text-slate-300">{vol}</td>
                    <td className="px-5 py-4 font-semibold text-teal-300">{nexus}</td>
                    <td className="px-5 py-4 text-slate-400">{ruby}</td>
                    <td className="px-5 py-4 text-slate-500">{diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Disclaimer>* Ruby pricing estimates based on publicly available information. Exact costs depend on call duration, plan, and add-ons. Visit ruby.com for current pricing.</Disclaimer>
        </section>

        {/* ── 5. FEATURE COMPARISON ── */}
        <section className="mb-20">
          <SectionLabel>Feature breakdown</SectionLabel>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">AI vs live human: honest breakdown</h2>
          <p className="mb-8 text-slate-400">Neither is universally better — it depends on your business.</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Feature</th>
                  <th className="px-5 py-4 text-left font-semibold text-teal-400">NEXUS</th>
                  <th className="px-5 py-4 text-left font-semibold text-slate-400">Ruby</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {[
                  ['Answer speed', 'Responds instantly, every time', 'Ring queue, depends on availability'],
                  ['Consistency', 'Identical experience on every call', 'Varies by agent and shift'],
                  ['Concurrent calls', 'Unlimited simultaneous calls', 'Limited by available agents'],
                  ['Emotional nuance', 'Good for most use cases', '✦ Live humans have the edge here'],
                  ['24/7 coverage', 'Included by default', 'Varies by plan'],
                  ['Languages', 'Multiple languages via AI', 'Primarily English + Spanish'],
                  ['Call recordings', 'Available on Premium+', 'Depends on plan'],
                  ['Appointment booking', 'Via Google Calendar', 'Depends on plan'],
                ].map(([feature, nexus, ruby]) => (
                  <tr key={feature}>
                    <td className="px-5 py-4 font-medium text-slate-300">{feature}</td>
                    <td className="px-5 py-4 text-slate-300">{nexus}</td>
                    <td className="px-5 py-4 text-slate-400">{ruby}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 6. WHEN RUBY IS BETTER ── */}
        <section className="mb-20">
          <SectionLabel>Honest take</SectionLabel>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">When Ruby Receptionists might be the better choice</h2>
          <p className="mb-6 text-slate-400">We believe in honest comparisons. There are real scenarios where a live receptionist wins.</p>
          <ul className="space-y-3">
            {[
              'High-touch legal intake — estate planning, personal injury, family law — where the first call is a relationship.',
              'Brands built specifically on human warmth, where callers expect and value a real person.',
              'Medical practices where patient trust and emotional sensitivity are paramount.',
              'Businesses whose customers frequently request to speak with a human and won\'t engage otherwise.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-4">
                <Minus className="mt-0.5 size-4 shrink-0 text-slate-500" />
                <span className="text-sm text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 7. WHEN NEXUS IS BETTER ── */}
        <section className="mb-20">
          <SectionLabel>Where NEXUS wins</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">When NEXUS is the better choice</h2>
          <ul className="space-y-3">
            {[
              'Plumbers, HVAC, and home service businesses that need after-hours call coverage without overtime costs.',
              'Medical and dental offices needing 24/7 appointment scheduling without holding staff after hours.',
              'Property management companies handling tenant requests at all hours.',
              'Any business where call cost matters — NEXUS costs a fraction of live answering services.',
              'Small businesses that cannot justify a full live answering service but still need professional coverage.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-teal-500/20 bg-teal-500/5 px-5 py-4">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />
                <span className="text-sm text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 8. HOW TO SWITCH ── */}
        <section className="mb-20">
          <SectionLabel>Migration guide</SectionLabel>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">How to switch from Ruby to NEXUS</h2>
          <ol className="space-y-4">
            {[
              ['Sign up for NEXUS', 'Create your account at nexus.consulting — takes 2 minutes.'],
              ['Complete onboarding', 'Our 6-step setup takes about 15 minutes. Tell us about your business, pick your voice style, and configure call rules.'],
              ['We configure your agent', 'Our team sets up your NEXUS agent within 24–48 hours, trained on your business.'],
              ['Choose your AI voice', 'Pick from our voice library during onboarding. Your receptionist goes live with the voice you select.'],
              ['Forward your business line', 'A simple call-forwarding change in your phone provider settings — no new number needed.'],
              ['Cancel Ruby per their terms', 'Review Ruby\'s cancellation notice requirements before switching.'],
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
                q: 'What is the best Ruby Receptionists alternative?',
                a: 'It depends on your needs. For businesses that want 24/7 coverage at a lower cost, AI receptionists like NEXUS are often a strong fit. For high-touch industries where emotional nuance matters most, a live receptionist service may be worth the premium.',
              },
              {
                q: 'Is NEXUS cheaper than Ruby Receptionists?',
                a: 'They are billed differently. Ruby bundles live receptionist minutes and charges per minute beyond them, so the invoice moves with your call volume. NEXUS is a flat monthly plan quoted for your business. Book a demo and we will quote your setup against your expected call volume.',
              },
              {
                q: 'Can NEXUS handle the same workflows as Ruby?',
                a: 'NEXUS handles call answering, message taking, appointment booking (via Google Calendar), call routing, and call recordings. It does not provide a human voice. For workflows that specifically require a human — complex intake, emotional support conversations — a live service may be more appropriate.',
              },
              {
                q: 'How long does it take to switch?',
                a: 'Onboarding takes about 15 minutes. Our team typically has your NEXUS agent configured within 24–48 hours. From sign-up to live calls is usually 2–3 business days.',
              },
              {
                q: 'Can I keep my business phone number?',
                a: 'Yes. You keep your existing number and set up call forwarding to NEXUS. No porting required.',
              },
              {
                q: 'Does NEXUS work for law firms?',
                a: 'NEXUS works well for law firms handling high call volumes — intake scheduling, after-hours coverage, message taking. For very sensitive intake calls (e.g. personal injury, criminal defense) where emotional tone is critical, we recommend evaluating a recorded sample first. Contact us and we will walk you through it.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
                <p className="mb-2 font-semibold text-white">{q}</p>
                <p className="text-sm leading-relaxed text-slate-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. FINAL CTA ── */}
        <section className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">See NEXUS in action</h2>
          <p className="mb-8 text-base text-teal-100">Get started in 15 minutes</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal-600 hover:bg-teal-50 transition-colors"
            >
              Get Started
            </Link>
            <CalendlyButton className="rounded-lg border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Schedule a Demo
            </CalendlyButton>
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-800 mt-20 px-4 py-8 text-center text-xs text-slate-600 sm:px-6">
        <p>NEXUS AI Receptionist. All pricing comparisons are based on publicly available information and are provided for general guidance only.</p>
        <p className="mt-1">Ruby Receptionists is a trademark of its respective owner. NEXUS is not affiliated with Ruby.</p>
      </footer>
    </div>
  )
}
