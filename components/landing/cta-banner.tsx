import Link from 'next/link'

export default function CtaBanner() {
  return (
    <section className="bg-slate-950 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-12 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
          Ready to put AI to work for your business?
        </h2>
        <p className="mb-8 text-base text-teal-100">
          Start with the plan that fits your business. Scale up as you grow. No contracts. Cancel
          anytime.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-50"
          >
            Get Started
          </Link>
          <Link
            href="mailto:contact@nexus.ai"
            className="rounded-lg border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  )
}
