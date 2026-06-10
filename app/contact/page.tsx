import type { Metadata } from 'next'
import { Calendar, Mail } from 'lucide-react'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import { CalendlyButton } from '@/components/landing/calendly-button'
import { CONTACT_EMAIL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact NEXUS AI',
  description:
    'Questions about NEXUS? Book a call with our team or email us at sales@nexusconsultancy.app.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        <section className="px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Contact
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              We&apos;d love to hear from you
            </h1>
            <p className="mb-10 text-lg text-slate-400">
              Questions about NEXUS, partnership enquiries, or just want to talk through whether
              it&apos;s the right fit for your business — reach out directly.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <CalendlyButton className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-600">
                <Calendar className="size-5" />
                Book a call
              </CalendlyButton>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-8 py-3.5 text-base font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                <Mail className="size-5" />
                {CONTACT_EMAIL}
              </a>
            </div>

            <p className="mt-10 text-sm text-slate-600">
              NEXUS AI · Registered in Delaware, USA
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
