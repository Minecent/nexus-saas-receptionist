import Link from 'next/link'
import { Check, Shield } from 'lucide-react'

const trustItems = [
  { icon: Shield, label: '14-day guarantee on Lite & Pro' },
  { icon: Check, label: 'No credit card to start' },
  { icon: Check, label: 'Cancel anytime' },
  { icon: Check, label: 'Live in 48 hours' },
]

export default function CtaBanner() {
  return (
    <section className="bg-slate-950 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-12 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
          Ready to put AI to work for your business?
        </h2>
        <p className="mb-8 text-base text-teal-100">
          Start with the plan that fits your business. Scale up as you grow.
          Your first call answered in under 48 hours.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/signup"
            className="rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-50 text-center"
          >
            Get Started — from $25/mo
          </Link>
          <Link
            href="mailto:contact@nexus.ai"
            className="rounded-lg border border-white/40 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 text-center"
          >
            Talk to us first
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="size-3.5 text-teal-200" />
              <span className="text-xs text-teal-100">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
