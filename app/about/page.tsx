import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'NEXUS AI builds AI-powered receptionists for businesses of all sizes. Learn about our mission to make professional phone answering accessible to every business, not just the ones with big budgets.',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header />
      <main className="flex-1">
        <section className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              About NEXUS
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Every business deserves a great front desk.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-100">
              NEXUS started with a simple observation: businesses of every size lose thousands of dollars
              every month to missed calls — not because they don&apos;t care, but because they
              can&apos;t be everywhere at once.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-100">
              Hiring a full-time receptionist costs $48,000+ per year. Traditional answering
              services are impersonal and expensive. So most businesses just accept the missed
              calls — and the missed revenue.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-100">
              We built NEXUS to change that. Our AI receptionists answer every call instantly,
              book appointments, take perfect messages, and treat every caller like your best
              customer — for a fraction of the cost of traditional options.
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-block rounded-lg bg-teal-500 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-600"
              >
                Try NEXUS free
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
