'use client'

import Link from 'next/link'
import { Check, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CALENDLY_URL } from '@/lib/config'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

const tiers = [
  {
    name: 'Lite',
    badge: null as string | null,
    subtext: undefined as string | undefined,
    valueLine: 'For solo businesses',
    volume: '30 calls/month',
    estimate: null as string | null,
    description: null as string | null,
    cta: 'Start free trial',
    href: '/signup' as string | null,
    calendly: false,
    highlight: false,
    features: [
      '30 calls/month',
      '24/7/365 AI answering',
      'Google Calendar booking',
      'Email summaries via Gmail',
      'Forward calls to your phone',
    ],
  },
  {
    name: 'Pro',
    badge: 'Most Popular' as string | null,
    subtext: 'Recommended for service businesses',
    valueLine: 'For growing service businesses',
    volume: '500 minutes/month',
    estimate: '~165 calls based on average call length',
    description: null,
    cta: 'Start free trial',
    href: '/signup' as string | null,
    calendly: false,
    highlight: true,
    features: [
      'Everything in Lite, plus:',
      '500 minutes/month',
      'Instant SMS + email confirmations to your customers',
      'Real-time Slack alerts when high-priority calls come in',
      'Smart call forwarding — set rules for when, why, and who gets urgent calls',
      '30-day call recordings — review and train at will',
      'Advanced call routing — send the right caller to the right person',
      'Connect AVA to 7,000+ apps via Zapier (CRM, email, project tools, and more)',
      'Priority support',
    ],
  },
  {
    name: 'Scale',
    badge: 'For Larger Teams' as string | null,
    subtext: undefined as string | undefined,
    valueLine: 'For high call volumes & multiple locations',
    volume: '1,500 minutes/month',
    estimate: '~500 calls based on average call length',
    description: null,
    cta: 'Start free trial',
    href: '/signup' as string | null,
    calendly: false,
    highlight: false,
    features: [
      'Everything in Pro, plus:',
      '1,500 minutes/month',
      'Multi-destination routing — different numbers per location, team, or call type',
      '90 days of call recordings — resolve disputes and train staff',
      'Monthly growth insights — caller patterns, missed opportunities, revenue signals',
      'Free quarterly growth plan from our team — based on your actual call data',
      'Direct integrations with Outlook, Salesforce, HubSpot & more — built and configured by our team',
    ],
  },
  {
    name: 'Custom Build',
    badge: 'Enterprise' as string | null,
    subtext: undefined as string | undefined,
    valueLine: 'Built around your workflows',
    volume: 'Unlimited minutes',
    estimate: null,
    description: 'Scoped and quoted upfront — no surprises',
    cta: 'Book a discovery call',
    href: null as string | null,
    calendly: true,
    highlight: false,
    features: [
      'Everything in Scale, plus:',
      'Unlimited minutes (no overages)',
      'Custom voice persona & branding',
      'Unlimited custom workflows',
      'Dedicated success manager',
      'Fixed-scope agreement before work begins',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-slate-500 bg-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            Pricing
          </p>

          {/* Anchor pill */}
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-slate-500 bg-slate-600/60 px-5 py-2">
            <span className="text-sm font-medium text-slate-100 line-through">$4,000/mo receptionist</span>
            <span className="text-slate-300">&rarr;</span>
            <span className="text-sm font-bold text-teal-400">a fraction of the cost with NEXUS</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pick the plan your business needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-100">
            All plans include 24/7/365 call answering. Scale up as you grow. No contracts.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-200">
            Whether you are a one-person shop or running multiple locations, there is a
            plan built for how you work.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-6 transition-all',
                tier.highlight
                  ? 'border-teal-500 bg-slate-600 shadow-xl shadow-teal-500/10'
                  : 'border-slate-500 bg-slate-600 hover:border-slate-500'
              )}
            >
              {/* Badge */}
              <div className="mb-4 flex flex-col gap-1">
                {tier.badge ? (
                  <>
                    <span className={cn(
                      'inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold',
                      tier.highlight
                        ? 'border-teal-500/40 bg-teal-500/10 text-teal-400'
                        : 'border-slate-500 bg-slate-600 text-slate-100'
                    )}>
                      {tier.badge}
                    </span>
                    {tier.subtext && (
                      <p className="text-xs text-slate-200">{tier.subtext}</p>
                    )}
                  </>
                ) : <span />}
              </div>

              {/* Name */}
              <p className="mb-2 text-lg font-bold text-white">{tier.name}</p>

              {/* Value line (replaces price) */}
              <p className="mb-1 text-xl font-bold text-white">{tier.valueLine}</p>

              {/* Volume + optional estimate */}
              <p className={cn(
                'text-sm font-semibold',
                tier.highlight ? 'text-teal-400' : 'text-slate-100',
                tier.estimate ? 'mb-0.5' : 'mb-1'
              )}>
                {tier.volume}
              </p>
              {tier.estimate && (
                <p className="mb-1 text-xs text-slate-300">{tier.estimate}</p>
              )}

              {tier.description && (
                <p className="mb-2 text-xs text-slate-200">{tier.description}</p>
              )}

              {/* Features */}
              <ul className="mb-6 mt-2 flex flex-grow flex-col gap-2">
                {tier.features.map((feature) => (
                  <li key={feature} className={cn(
                    'flex items-start gap-2 text-sm',
                    feature.endsWith(':') ? 'text-slate-200 mt-1' : 'text-slate-200'
                  )}>
                    {!feature.endsWith(':') && (
                      <Check className="mt-0.5 size-3.5 shrink-0 text-teal-400" />
                    )}
                    {feature}
                  </li>
                ))}
              </ul>

              {tier.calendly ? (
                <button
                  type="button"
                  onClick={() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL })}
                  className={cn(
                    'block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors',
                    tier.highlight
                      ? 'bg-teal-500 text-white hover:bg-teal-600'
                      : 'border border-slate-500 bg-transparent text-slate-200 hover:border-slate-500 hover:text-white'
                  )}
                >
                  {tier.cta}
                </button>
              ) : (
                <Link
                  href={tier.href ?? '/signup'}
                  className={cn(
                    'block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors',
                    tier.highlight
                      ? 'bg-teal-500 text-white hover:bg-teal-600'
                      : 'border border-slate-500 bg-transparent text-slate-200 hover:border-slate-500 hover:text-white'
                  )}
                >
                  {tier.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Quote-first transparency line */}
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-teal-500/20 bg-teal-500/5 px-6 py-5 text-center">
          <p className="text-sm text-slate-100">
            Plans are tailored to your call volume and setup. <span className="font-semibold text-white">One clear quote before you pay anything</span> — no hidden fees, no surprise overages, no contracts.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              Start free 7-day trial
            </Link>
            <button
              type="button"
              onClick={() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL })}
              className="rounded-lg border border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
            >
              Book a demo
            </button>
          </div>
        </div>

        {/* Risk reversal + trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5">
            <Shield className="size-3.5 shrink-0 text-teal-400" />
            <span className="text-xs text-slate-100">Free 7-day trial — no credit card</span>
          </div>
          {['Cancel anytime', 'One clear quote upfront', 'No contracts', 'Transparent billing'].map((label) => (
            <div key={label} className="flex items-center gap-1.5">
              <Check className="size-3.5 shrink-0 text-teal-400" />
              <span className="text-xs text-slate-100">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
