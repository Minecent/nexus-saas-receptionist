'use client'

import { useState } from 'react'
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
    monthlyPrice: '$25',
    annualPrice: '$20',
    annualTotal: '$240/yr',
    period: 'per month',
    crossOut: 'Full-time receptionist: $3,200/mo',
    volume: '30 calls/month',
    estimate: null as string | null,
    description: null as string | null,
    cta: 'Start free — no credit card',
    href: '/signup' as string | null,
    calendly: false,
    highlight: false,
    overage: '+$1.10 per extra call*',
    savingsVsReceptionist: '$47,700/yr',
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
    monthlyPrice: '$149',
    annualPrice: '$119',
    annualTotal: '$1,430/yr',
    period: 'per month',
    crossOut: null,
    volume: '500 minutes/month',
    estimate: '~165 calls based on average call length',
    description: null,
    cta: 'Get started today',
    href: '/signup' as string | null,
    calendly: false,
    highlight: true,
    overage: '+$1.00 per extra call*',
    savingsVsReceptionist: '$46,200/yr',
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
    monthlyPrice: '$349',
    annualPrice: '$279',
    annualTotal: '$3,350/yr',
    period: 'per month',
    crossOut: null,
    volume: '1,500 minutes/month',
    estimate: '~500 calls based on average call length',
    description: null,
    cta: 'Get started',
    href: '/signup' as string | null,
    calendly: false,
    highlight: false,
    overage: '+$0.85 per extra call*',
    savingsVsReceptionist: '$43,800/yr',
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
    monthlyPrice: 'Custom',
    annualPrice: undefined as string | undefined,
    annualTotal: undefined as string | undefined,
    period: null,
    crossOut: null,
    volume: 'Unlimited minutes',
    estimate: null,
    description: 'Scoped and quoted upfront — no surprises',
    cta: 'Book a discovery call',
    href: null as string | null,
    calendly: true,
    highlight: false,
    overage: null,
    savingsVsReceptionist: undefined as string | undefined,
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
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className="border-b border-slate-700 bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            Pricing
          </p>

          {/* Anchor pill */}
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-slate-600 bg-slate-700/60 px-5 py-2">
            <span className="text-sm font-medium text-slate-100 line-through">$4,000/mo receptionist</span>
            <span className="text-slate-600">→</span>
            <span className="text-sm font-bold text-teal-400">from $25/mo with NEXUS</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pick the plan your business needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-100">
            All plans include 24/7/365 call answering. Scale up as you grow. No contracts.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Whether you&apos;re a one-person shop or running multiple locations, there&apos;s a
            plan built for how you work.
          </p>

          {/* Annual/Monthly toggle */}
          <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-slate-600 bg-slate-700 p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                !isAnnual ? 'bg-slate-600 text-white' : 'text-slate-100 hover:text-white'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                isAnnual ? 'bg-teal-500 text-white' : 'text-slate-100 hover:text-white'
              )}
            >
              Annual
              <span className={cn(
                'rounded-full px-1.5 py-0.5 text-xs font-bold',
                isAnnual ? 'bg-white/20 text-white' : 'bg-slate-600 text-teal-400'
              )}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-6 transition-all',
                tier.highlight
                  ? 'border-teal-500 bg-slate-700 shadow-xl shadow-teal-500/10'
                  : 'border-slate-600 bg-slate-700 hover:border-slate-500'
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
                        : 'border-slate-600 bg-slate-800 text-slate-100'
                    )}>
                      {tier.badge}
                    </span>
                    {tier.subtext && (
                      <p className="text-xs text-slate-300">{tier.subtext}</p>
                    )}
                  </>
                ) : <span />}
              </div>

              {/* Name */}
              <p className="mb-2 text-lg font-bold text-white">{tier.name}</p>

              {/* Price */}
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">
                  {tier.monthlyPrice === 'Custom'
                    ? 'Custom'
                    : (isAnnual && tier.annualPrice ? tier.annualPrice : tier.monthlyPrice)}
                </span>
                {tier.period && <span className="text-sm text-slate-100">/ mo</span>}
              </div>

              {/* Annual billing note */}
              {isAnnual && tier.annualTotal && (
                <p className="mb-1 text-xs text-teal-400/80">billed as {tier.annualTotal}</p>
              )}

              {/* Crossed-out comparison */}
              {tier.crossOut && (
                <p className="mb-1 text-xs text-slate-600 line-through">{tier.crossOut}</p>
              )}

              {/* Volume + optional estimate */}
              <p className={cn(
                'text-sm font-semibold',
                tier.highlight ? 'text-teal-400' : 'text-slate-100',
                tier.estimate ? 'mb-0.5' : 'mb-1'
              )}>
                {tier.volume}
              </p>
              {tier.estimate && (
                <p className="mb-1 text-xs text-slate-600">{tier.estimate}</p>
              )}

              {tier.description && (
                <p className="mb-2 text-xs text-slate-300">{tier.description}</p>
              )}

              {/* Savings vs receptionist */}
              {tier.savingsVsReceptionist && (
                <div className="mb-3 rounded-lg border border-teal-500/20 bg-teal-500/5 px-3 py-2 text-center">
                  <span className="text-xs text-slate-100">You save </span>
                  <span className="text-xs font-bold text-teal-400">{tier.savingsVsReceptionist}</span>
                  <span className="text-xs text-slate-100"> vs. a receptionist</span>
                </div>
              )}

              {/* Overage */}
              {tier.overage && (
                <div className="mb-4 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs text-slate-300">
                  {tier.overage}
                </div>
              )}

              {/* Features */}
              <ul className="mb-6 flex flex-grow flex-col gap-2">
                {tier.features.map((feature) => (
                  <li key={feature} className={cn(
                    'flex items-start gap-2 text-sm',
                    feature.endsWith(':') ? 'text-slate-300 mt-1' : 'text-slate-300'
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
                      : 'border border-slate-600 bg-transparent text-slate-300 hover:border-slate-500 hover:text-white'
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
                      : 'border border-slate-600 bg-transparent text-slate-300 hover:border-slate-500 hover:text-white'
                  )}
                >
                  {tier.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Risk reversal + trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5">
            <Shield className="size-3.5 shrink-0 text-teal-400" />
            <span className="text-xs text-slate-100">14-day money-back on Lite &amp; Pro</span>
          </div>
          {['Cancel anytime', 'No setup fees', 'No contracts', 'Transparent billing'].map((label) => (
            <div key={label} className="flex items-center gap-1.5">
              <Check className="size-3.5 shrink-0 text-teal-400" />
              <span className="text-xs text-slate-100">{label}</span>
            </div>
          ))}
        </div>

        {/* Overage footnote */}
        <p className="mt-6 text-center text-xs text-slate-600">
          * Extra call charges require your approval before being applied. You will always be notified before any overage billing occurs.
        </p>
        <p className="mt-2 text-center text-xs text-slate-600">Pricing is in USD.</p>
      </div>
    </section>
  )
}
