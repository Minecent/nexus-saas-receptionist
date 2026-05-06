import Link from 'next/link'
import { Check, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Lite',
    badge: null,
    price: '$25',
    period: 'per month',
    crossOut: 'Full-time receptionist: $3,200/mo',
    volume: '30 calls/month',
    estimate: null,
    description: null,
    cta: 'Try NEXUS risk-free',
    href: '/signup',
    highlight: false,
    overage: '+$1.10 per extra call*',
    features: [
      '30 calls/month',
      '24/7 AI answering',
      'Google Calendar booking',
      'Email summaries via Gmail',
      'Forward calls to your phone',
    ],
  },
  {
    name: 'Pro',
    badge: 'Most Popular',
    price: '$149',
    period: 'per month',
    crossOut: null,
    volume: '500 minutes/month',
    estimate: '~165 calls based on average call length',
    description: null,
    cta: 'Get Started',
    href: '/signup',
    highlight: true,
    overage: '+$1.00 per extra call*',
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
    badge: 'Growing Teams',
    price: '$349',
    period: 'per month',
    crossOut: null,
    volume: '1,500 minutes/month',
    estimate: '~500 calls based on average call length',
    description: null,
    cta: 'Get Started',
    href: '/signup',
    highlight: false,
    overage: '+$0.85 per extra call*',
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
    badge: 'Enterprise',
    price: 'Custom',
    period: null,
    crossOut: null,
    volume: 'Unlimited minutes',
    estimate: null,
    description: 'Complex integrations and high-volume operations',
    cta: 'Contact our sales team',
    href: 'mailto:sales@nexus.ai',
    highlight: false,
    overage: null,
    features: [
      'Everything in Scale, plus:',
      'Unlimited minutes (no overages)',
      'Custom voice persona',
      'Unlimited custom workflows',
      'Dedicated success manager',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            Pricing
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pick the plan your business needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            All plans include 24/7 call answering. Scale up as you grow. No contracts.
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
                  ? 'border-teal-500 bg-slate-800 shadow-xl shadow-teal-500/10'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-600'
              )}
            >
              {/* Badge */}
              <div className="mb-4 flex items-center justify-between">
                {tier.badge ? (
                  <span className={cn(
                    'rounded-full border px-3 py-1 text-xs font-semibold',
                    tier.highlight
                      ? 'border-teal-500/40 bg-teal-500/10 text-teal-400'
                      : 'border-slate-700 bg-slate-800 text-slate-400'
                  )}>
                    {tier.badge}
                  </span>
                ) : <span />}
              </div>

              {/* Name */}
              <p className="mb-2 text-lg font-bold text-white">{tier.name}</p>

              {/* Price */}
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{tier.price}</span>
                {tier.period && <span className="text-sm text-slate-400">/ mo</span>}
              </div>

              {/* Crossed-out comparison */}
              {tier.crossOut && (
                <p className="mb-1 text-xs text-slate-600 line-through">{tier.crossOut}</p>
              )}

              {/* Volume + optional estimate */}
              <p className={cn('text-sm font-semibold', tier.highlight ? 'text-teal-400' : 'text-slate-400', tier.estimate ? 'mb-0.5' : 'mb-1')}>
                {tier.volume}
              </p>
              {tier.estimate && (
                <p className="mb-1 text-xs text-slate-600">{tier.estimate}</p>
              )}

              {tier.description && (
                <p className="mb-4 text-xs text-slate-500">{tier.description}</p>
              )}

              {/* Overage */}
              {tier.overage && (
                <div className="mb-4 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-500">
                  {tier.overage}
                </div>
              )}

              {/* Features */}
              <ul className="mb-6 flex flex-grow flex-col gap-2">
                {tier.features.map((feature) => (
                  <li key={feature} className={cn(
                    'flex items-start gap-2 text-sm',
                    feature.endsWith(':') ? 'text-slate-500 mt-1' : 'text-slate-300'
                  )}>
                    {!feature.endsWith(':') && (
                      <Check className="mt-0.5 size-3.5 shrink-0 text-teal-400" />
                    )}
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={cn(
                  'block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors',
                  tier.highlight
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'border border-slate-700 bg-transparent text-slate-300 hover:border-slate-500 hover:text-white'
                )}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Footnotes */}
        <p className="mt-4 text-center text-xs text-slate-600">
          * Extra call charges require your approval before being applied. You will always be notified before any overage billing occurs.
        </p>
        <p className="mt-2 text-center text-xs text-slate-500">
          Pricing is in USD. Cancel anytime. No setup fees.
        </p>

        {/* Yearly savings callout */}
        <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-teal-500/30 bg-teal-500/5 p-8 shadow-lg shadow-teal-500/5 text-center">
          <p className="mb-1 text-sm text-slate-400 uppercase tracking-widest font-semibold">vs. a full-time receptionist at $4,000/month</p>
          <p className="text-5xl sm:text-6xl font-extrabold text-teal-400 mb-2">Save $47,700/yr</p>
          <p className="text-base text-slate-300 font-medium mb-6">
            Starting from just $25/month — same professional front desk, zero overhead.
          </p>
          <div className="mb-6 inline-flex flex-col gap-3 text-left">
            {[
              'We will notify you when you are nearing your call limit',
              'We will ask for your approval before any extra charges',
              'You will never see a surprise bill from us — ever',
            ].map((promise) => (
              <div key={promise} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />
                {promise}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/10">
              <Shield className="size-4 text-teal-400" />
            </div>
            <p className="text-sm font-semibold text-white">
              Transparent pricing. Your costs stay predictable. Your business stays in control.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
