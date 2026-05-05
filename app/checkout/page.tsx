'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, Lock, Shield, CreditCard, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLANS: Record<string, {
  name: string
  price: string
  priceNum: number
  period: string
  volume: string
  features: string[]
}> = {
  lite: {
    name: 'Lite',
    price: '$25',
    priceNum: 25,
    period: '/month',
    volume: '30 calls / 90 minutes',
    features: [
      '30 calls / 90 minutes',
      '24/7 AI answering',
      'Google Calendar booking',
      'Email & SMS notifications',
      'Forward calls to your phone',
    ],
  },
  pro: {
    name: 'Pro',
    price: '$149',
    priceNum: 149,
    period: '/month',
    volume: '150 calls / 450 minutes',
    features: [
      '150 calls / 450 minutes',
      'SMS + email confirmations',
      'Real-time Slack alerts',
      'Call recordings (30 days)',
      'Advanced call routing',
      'Priority support',
    ],
  },
  scale: {
    name: 'Scale',
    price: '$349',
    priceNum: 349,
    period: '/month',
    volume: '450 calls / 1,350 minutes',
    features: [
      '450 calls / 1,350 minutes',
      'Multi-location call routing',
      'Call recordings (90 days)',
      '1 custom automation workflow',
      'Outlook, Salesforce & HubSpot',
      'Priority support',
    ],
  },
}

function CheckoutInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get('plan') || 'pro'
  const redirect = searchParams.get('redirect') || '/dashboard'
  const plan = PLANS[planId]

  const [email, setEmail] = useState('')
  const [cardName, setCardName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!plan) {
    router.replace('/#pricing')
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !cardName) { setError('Please fill in all fields.'); return }
    setError('')
    setLoading(true)

    // TODO: Wire up Stripe here.
    // 1. Install: npm install @stripe/stripe-js @stripe/react-stripe-js stripe
    // 2. Add env vars: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY
    // 3. Create /app/api/create-checkout/route.ts that calls stripe.checkout.sessions.create()
    //    with the correct price_id for the selected plan, and success_url pointing to `redirect`
    // 4. Replace the setTimeout below with:
    //    const res = await fetch('/api/create-checkout', { method: 'POST', body: JSON.stringify({ planId, redirect }) })
    //    const { url } = await res.json()
    //    router.push(url)

    setTimeout(() => {
      router.push(redirect)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            NEXUS<span className="text-teal-400">.</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="size-3 text-teal-400" />
            Secure checkout
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
        {/* Left — Order summary */}
        <div>
          <Link
            href="/#pricing"
            className="mb-6 flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Change plan
          </Link>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Your order
            </p>
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <p className="text-xl font-bold text-white">NEXUS {plan.name}</p>
                <p className="text-sm text-slate-400">{plan.volume}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">{plan.price}</p>
                <p className="text-xs text-slate-500">{plan.period}</p>
              </div>
            </div>

            <div className="my-5 border-t border-slate-800" />

            <ul className="space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-teal-400" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="my-5 border-t border-slate-800" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Due today</span>
              <span className="font-bold text-white">{plan.price}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
              <span>Then {plan.price}/month, billed monthly</span>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Lock, label: 'SSL encrypted' },
              { icon: Shield, label: 'No surprise bills' },
              { icon: CreditCard, label: 'Cancel anytime' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
                <Icon className="size-4 text-teal-400" />
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Payment form */}
        <div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Payment details
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-teal-500"
                />
              </div>

              {/* Card name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Name on card
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-teal-500"
                />
              </div>

              {/* Stripe Elements placeholder */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Card details
                </label>
                <div className="rounded-lg border border-dashed border-slate-600 bg-slate-950 p-4 text-center">
                  <CreditCard className="mx-auto mb-2 size-6 text-slate-600" />
                  <p className="text-xs text-slate-500">
                    Stripe card fields will load here
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Add <code className="text-slate-500">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to enable
                  </p>
                </div>
              </div>

              {error && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'w-full rounded-lg py-3 text-sm font-semibold transition-all',
                  loading
                    ? 'cursor-not-allowed bg-teal-500/50 text-white/50'
                    : 'bg-teal-500 text-white hover:bg-teal-600 active:scale-[0.99]'
                )}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="size-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </span>
                ) : (
                  `Pay ${plan.price}/month`
                )}
              </button>

              <p className="text-center text-xs text-slate-600">
                By subscribing you agree to our{' '}
                <Link href="/legal/terms" className="text-slate-500 hover:text-slate-300 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy" className="text-slate-500 hover:text-slate-300 underline">
                  Privacy Policy
                </Link>.
              </p>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-slate-600">
            Pricing is in USD. Cancel anytime. No setup fees.
          </p>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="size-8 animate-spin rounded-full border-b-2 border-teal-500" />
      </div>
    }>
      <CheckoutInner />
    </Suspense>
  )
}
