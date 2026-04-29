import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Lite',
    badge: null,
    price: '$25',
    period: 'per month',
    volume: '50 minutes (~15–20 calls)',
    description: 'Get a 24/7 AI receptionist answering every call — starting today.',
    cta: 'Try NEXUS risk-free',
    href: '/signup',
    highlight: false,
    crossOut: 'Full-time receptionist: $3,200/mo',
    overage: '$1.00 per extra call after limit',
    features: [
      '50 minutes included per month',
      '24/7 AI call answering',
      'Basic call routing',
      'Email summaries via Gmail',
    ],
  },
  {
    name: 'Premium',
    badge: 'Most Popular',
    price: '$99',
    period: 'per month',
    volume: '500 minutes (~165 calls)',
    description: 'Most businesses choose this.',
    cta: 'Get Started',
    href: '/signup',
    highlight: true,
    crossOut: null,
    overage: '$0.75 per extra call after 500 minutes',
    features: [
      'Everything in Lite',
      'Booking, cancel & reschedule via Google Calendar',
      'SMS + email confirmations',
      'Custom voice persona',
      'Real-time Slack alerts',
      'Call recordings',
    ],
  },
  {
    name: 'Custom Build',
    badge: 'Enterprise',
    price: 'Custom',
    period: null,
    volume: 'Unlimited minutes',
    description: 'For complex integrations and high-volume operations.',
    cta: 'Contact our sales team',
    href: 'mailto:sales@nexus.ai',
    highlight: false,
    crossOut: null,
    overage: null,
    features: [
      'Everything in Premium',
      'Multi-location call routing',
      'Outlook, Salesforce & HubSpot integrations',
      'Custom CRM integrations',
      'Custom n8n workflows',
      'Dedicated success manager',
      'White-glove setup',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-6 transition-all',
                tier.highlight
                  ? 'border-teal-500 bg-slate-900 shadow-xl shadow-teal-500/10'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              )}
            >
              {/* Badge */}
              <div className="mb-4 flex items-center justify-between">
                {tier.badge ? (
                  <span
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-semibold',
                      tier.highlight
                        ? 'border-teal-500/40 bg-teal-500/10 text-teal-400'
                        : 'border-slate-700 bg-slate-800 text-slate-400'
                    )}
                  >
                    {tier.badge}
                  </span>
                ) : (
                  <span />
                )}
              </div>

              {/* Price */}
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                {tier.period && (
                  <span className="text-sm text-slate-400">/ {tier.period}</span>
                )}
              </div>

              {/* Crossed-out comparison */}
              {tier.crossOut && (
                <p className="mb-1 text-xs text-slate-600 line-through">{tier.crossOut}</p>
              )}

              <p className={cn('mb-1 text-sm font-semibold', tier.highlight ? 'text-teal-400' : 'text-slate-400')}>
                {tier.volume}
              </p>
              <p className="mb-4 text-sm text-slate-500">{tier.description}</p>

              {/* Overage */}
              {tier.overage && (
                <div className="mb-4 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-500">
                  {tier.overage}
                </div>
              )}

              {/* Features */}
              <ul className="mb-6 flex flex-grow flex-col gap-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-teal-400" />
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
      </div>
    </section>
  )
}
