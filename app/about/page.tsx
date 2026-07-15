import type { Metadata } from 'next'
import { Calendar } from 'lucide-react'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import { CalendlyButton } from '@/components/landing/calendly-button'
import { CONTACT_EMAIL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'About NEXUS AI — The Team Behind Your 24/7 AI Receptionist',
  description:
    'NEXUS AI builds AI-powered receptionists for businesses of all sizes. Learn about our mission to make professional phone answering accessible to every business, not just the ones with big budgets.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-700">
      <Header />
      <main>
        {/* Hero */}
        <section className="border-b border-slate-500 bg-slate-700 px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Our story
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built for businesses that can&apos;t afford to miss a call
            </h1>
            <p className="text-lg leading-relaxed text-slate-100">
              NEXUS started with a simple observation: businesses of every size lose thousands of dollars
              every month to missed calls — not because they don&apos;t care, but because
              they&apos;re busy running their business. We built the solution we wished existed.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="border-b border-slate-500 bg-slate-700 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
                  Our mission
                </p>
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
                  Professional phone answering for every business
                </h2>
                <p className="text-slate-100 leading-relaxed">
                  A Fortune 500 company can afford a full reception team. A local plumbing company,
                  a two-person law firm, or a solo physiotherapist can&apos;t. NEXUS closes that gap
                  — giving every business the same quality of first impression, 24 hours a day.
                </p>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
                  How we work
                </p>
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
                  AI that sounds human, works like a machine
                </h2>
                <p className="text-slate-100 leading-relaxed">
                  NEXUS uses the latest conversational AI to handle inbound calls naturally — booking
                  appointments, taking messages, qualifying leads, and routing urgent calls. It
                  integrates with the tools you already use and gets set up in under 48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-b border-slate-500 bg-slate-700 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
                What we stand for
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Our principles
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  title: 'Radical transparency',
                  body: 'Flat-rate pricing. No per-minute fees, no surprise overages. You always know what you pay.',
                },
                {
                  title: 'No lock-in',
                  body: 'Cancel anytime. No annual contracts. We earn your business every month.',
                },
                {
                  title: 'Built for results',
                  body: 'Every feature exists because it helps you answer more calls and win more business.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-2xl border border-slate-500 bg-slate-600 p-6">
                  <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
                  <p className="text-sm text-slate-100 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-slate-700 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Get in touch
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
              We&apos;d love to hear from you
            </h2>
            <p className="mb-8 text-slate-100">
              Questions about NEXUS, partnership enquiries, or just want to talk through whether
              it&apos;s the right fit for your business — reach out directly.
            </p>
            <div className="flex flex-col items-center gap-3">
              <CalendlyButton className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600">
                <Calendar className="size-4" />
                Book a call
              </CalendlyButton>
              <p className="text-sm text-slate-200">
                Prefer email?{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="underline underline-offset-2 hover:text-slate-100"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <p className="mt-8 text-sm text-slate-300">
              NEXUS AI · Registered in Delaware, USA
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
