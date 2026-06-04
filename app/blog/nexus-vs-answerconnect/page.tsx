import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { blogPostingSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'NEXUS vs AnswerConnect (2026): Pricing & Features Compared',
  description: 'AnswerConnect charges per minute with surprise overage fees. NEXUS charges a flat monthly rate with 24/7 AI answering. Full comparison for 2026.',
}

const schema = blogPostingSchema({
  headline: 'NEXUS vs AnswerConnect (2026): Pricing & Features Compared',
  description: 'AnswerConnect charges per minute with surprise overage fees. NEXUS charges a flat monthly rate with 24/7 AI answering. Full comparison for 2026.',
  slug: 'nexus-vs-answerconnect',
  keywords: ['AnswerConnect alternative', 'AI receptionist', 'virtual receptionist comparison', 'NEXUS vs AnswerConnect'],
})

export default function NexusVsAnswerConnectPage() {
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
            NEXUS vs AnswerConnect (2026)
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
            AnswerConnect bills per minute and charges overage fees when you go over your limit. NEXUS charges a flat monthly rate with 24/7 AI answering and no surprise bills.
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
            AnswerConnect is a live receptionist service with per-minute billing and overage charges. Their entry plan starts around $325/month for 200 minutes of live answering during business hours. NEXUS starts at $25/month with 24/7 AI answering and transparent flat-rate pricing — no per-minute fees, no overage surprises. For businesses that want predictable costs and round-the-clock coverage, NEXUS is the stronger choice at a fraction of the price.
          </p>
          <p className="mt-3 text-xs text-slate-500 italic">
            Disclaimer: AnswerConnect pricing is based on publicly available information and may change. Verify at answerconnect.com before making purchasing decisions.
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
                  <th className="px-4 py-3 text-left font-semibold text-slate-400">AnswerConnect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                {[
                  ['Starting price', '$25/month', '~$325/month (200 minutes)'],
                  ['Billing model', 'Flat monthly — no per-minute fees', 'Per minute + overage charges'],
                  ['Availability', '24/7/365', 'Business hours + limited after-hours'],
                  ['Answering method', 'AI-powered, 24/7', 'Live human receptionists'],
                  ['Simultaneous calls', 'Unlimited', 'Limited by available agents'],
                  ['Appointment booking', 'Every plan — Google Calendar', 'Basic message-taking'],
                  ['Call recordings', 'Every plan', 'Not standard'],
                  ['Surprise bills', 'Never — you approve overages', 'Per-minute overage charges'],
                  ['Setup time', '24–48 hours', 'Several business days'],
                  ['Contracts', 'None, cancel anytime', 'Monthly or annual'],
                ].map(([feature, nexus, ac]) => (
                  <tr key={feature}>
                    <td className="px-4 py-3 text-slate-400">{feature}</td>
                    <td className="px-4 py-3 font-medium text-teal-300">{nexus}</td>
                    <td className="px-4 py-3 text-slate-400">{ac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The per-minute problem */}
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">The per-minute billing problem</h2>
          <p className="mb-4 text-slate-400 leading-relaxed">
            AnswerConnect, like most live receptionist services, bills by the minute. Their entry plan includes 200 minutes — roughly 67 calls averaging 3 minutes each. Once you exceed those 200 minutes, overage charges apply automatically.
          </p>
          <p className="mb-4 text-slate-400 leading-relaxed">
            The math works against you quickly. A busy month with 150 calls averaging 4 minutes each is 600 minutes. At $325/month for 200 minutes, you are paying overage on 400 extra minutes before you know it.
          </p>
          <p className="text-slate-400 leading-relaxed">
            NEXUS charges a flat monthly rate. You see the cost before you sign up, overages require your explicit approval, and you will never receive a bill you did not expect.
          </p>

          <div className="mt-6 rounded-xl border border-rose-500/20 bg-rose-500/5 px-6 py-4">
            <p className="text-sm text-rose-300">
              <strong className="text-white">Real example:</strong> 150 calls at 4 min average = 600 minutes. AnswerConnect entry plan covers 200 minutes. That is 400 minutes of overage — on top of the $325 base. NEXUS Pro covers 500 minutes for $149/month. Total.
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
                nexus: 'NEXUS answers every call 24/7/365 — nights, weekends, holidays. Every call gets the same quality of response regardless of when it comes in.',
                ac: 'AnswerConnect live receptionists work during business hours. After-hours coverage varies by plan and may involve voicemail or reduced-capacity answering.',
              },
              {
                title: 'Cost predictability',
                nexus: 'Flat monthly rate. Every feature included. Overages require your explicit approval and you are notified before any extra charge is applied.',
                ac: 'Per-minute billing with overage charges. A busier-than-usual month can push your bill significantly above the base plan price without warning.',
              },
              {
                title: 'Call handling capacity',
                nexus: 'NEXUS handles unlimited simultaneous calls. Ten calls ringing at the same time — every caller gets answered instantly.',
                ac: 'Capacity depends on available live agents. During peak times, callers may experience hold times or be redirected.',
              },
              {
                title: 'Appointment booking',
                nexus: 'NEXUS books directly into Google Calendar on every plan. Caller gets confirmation. You get the appointment. No staff involvement required.',
                ac: 'AnswerConnect focuses on message-taking and call routing. Appointment booking depends on the plan and setup.',
              },
            ].map(({ title, nexus, ac }) => (
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
                      <span className="size-1.5 rounded-full bg-slate-500" /> AnswerConnect
                    </p>
                    <p className="text-sm leading-relaxed text-slate-400">{ac}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where each wins */}
        <section className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Where AnswerConnect is stronger</h2>
            <ul className="flex flex-col gap-3">
              {[
                'US-based live human receptionists',
                'Strong brand recognition in the market',
                'Bilingual English/Spanish support',
                'Better for calls requiring nuanced judgment',
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
                'Starts at $25/mo vs ~$325/mo',
                '24/7/365 — no after-hours gaps',
                'Flat rate — zero surprise overage bills',
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

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                q: 'Is NEXUS cheaper than AnswerConnect?',
                a: 'Yes, significantly. AnswerConnect starts around $325/month for 200 minutes with overage fees on top. NEXUS starts at $25/month and the Pro plan is $149/month for 500 minutes — all inclusive.',
              },
              {
                q: 'Does AnswerConnect offer 24/7 coverage?',
                a: 'AnswerConnect has limited after-hours options depending on the plan. Live receptionist coverage is primarily during business hours. NEXUS answers calls 24/7/365 including nights, weekends, and public holidays.',
              },
              {
                q: 'Will I get surprise bills with NEXUS?',
                a: 'Never. NEXUS notifies you when you approach your call limit and requires your explicit approval before any overage charges are applied. You are always in control of your costs.',
              },
              {
                q: 'Can I switch from AnswerConnect to NEXUS?',
                a: 'Yes. Update your call forwarding number to your NEXUS number and you are live in 24–48 hours. Keep your existing business number throughout. No contract lock-in.',
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
          <h2 className="mb-4 text-2xl font-bold">NEXUS vs AnswerConnect: Which should you choose?</h2>
          <p className="mb-4 text-slate-300 leading-relaxed">
            Choose AnswerConnect if you handle a low volume of complex calls and want a live human voice — and you can absorb the per-minute billing without surprise.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Choose NEXUS if you want 24/7 coverage at a predictable price. For most service businesses — HVAC, dental, legal, real estate, property management — NEXUS handles the volume, works around the clock, and costs a fraction of what AnswerConnect charges.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">Stop paying per minute</h2>
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
