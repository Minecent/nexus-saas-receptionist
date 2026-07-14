import Link from 'next/link'
import { Check } from 'lucide-react'
import { FadeIn } from '@/components/landing/fade-in'

const plans = [
  {
    name: 'Lite',
    price: '$25',
    period: '/month',
    description: 'For solo operators who need calls answered without the overhead.',
    features: [
      '30 calls/month included',
      '24/7/365 AI answering',
      'Google Calendar booking',
      'Email call summaries',
      'Keep your existing number',
    ],
    cta: 'Start with Lite',
    href: '/signup?plan=lite',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$149',
    period: '/month',
    description: 'For growing teams that live on the phone.',
    features: [
      '200 calls/month included',
      'Everything in Lite',
      'Lead qualification',
      'SMS confirmations',
      'Zapier integration (7,000+ apps)',
      'Priority support',
    ],
    cta: 'Start with Pro',
    href: '/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '$349',
    period: '/month',
    description: 'For multi-location businesses and high call volumes.',
    features: [
      '600 calls/month included',
      'Everything in Pro',
      'Multiple phone lines',
      'Custom call flows',
      'Dedicated onboarding',
      'API access',
    ],
    cta: 'Start with Scale',
    href: '/signup?plan=scale',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Pricing
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple pricing that pays for itself
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-100">
              All plans include 24/7/365 call answering. Scale up as you grow. No contracts.
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <FadeIn key={plan.name}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-6 ${
                  plan.highlighted
                    ? 'border-teal-500 bg-slate-950 shadow-[0_0_40px_rgba(20,184,166,0.15)]'
                    : 'border-slate-800 bg-slate-950'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-flex w-fit rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-400">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-100">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-100">{plan.description}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="mt-0.5 size-4 shrink-0 text-teal-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-1 items-end">
                  <Link
                    href={plan.href}
                    className={`w-full rounded-lg px-5 py-3 text-center text-sm font-semibold transition-colors ${
                      plan.highlighted
                        ? 'bg-teal-500 text-white hover:bg-teal-600'
                        : 'border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-100">
          Need more than 600 calls/month?{' '}
          <Link href="/contact" className="font-medium text-teal-400 hover:text-teal-300">
            Talk to us about custom plans
          </Link>
        </p>
      </div>
    </section>
  )
}
