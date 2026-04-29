'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FadeIn } from './fade-in'

const faqs = [
  {
    q: 'Does NEXUS sound like a real person?',
    a: 'Yes. NEXUS uses the latest voice AI technology — natural pacing, realistic intonation, and context-aware responses. Most callers can\'t tell they\'re speaking with AI. You can also choose from multiple voice options and customize the greeting, tone, and persona to match your brand.',
  },
  {
    q: "What happens if NEXUS can't answer a question?",
    a: "NEXUS is trained on your business information, but when a caller asks something outside its knowledge, it doesn't guess. It takes a detailed message, captures the caller's contact info, and immediately notifies you via SMS or email so you can follow up. No caller is ever left hanging.",
  },
  {
    q: 'Can NEXUS transfer calls to my team?',
    a: 'Absolutely. You set the rules — NEXUS can transfer to specific team members based on call type, time of day, or urgency. Emergency calls can be routed immediately. Routine inquiries can be handled and logged without interrupting your team.',
  },
  {
    q: 'Is my data private and secure?',
    a: 'Yes. All calls and data are encrypted in transit and at rest. We do not sell or share your data with third parties. For medical offices, NEXUS follows HIPAA-conscious practices. You own your data and can export or delete it at any time from your dashboard.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most businesses are live in under 5 minutes. You provide your business details, set your availability and call rules, choose a voice, and connect your phone number. There\'s no code, no IT team required, and no lengthy onboarding process.',
  },
  {
    q: 'What languages does NEXUS speak?',
    a: 'NEXUS currently supports 31 languages including English, Spanish, French, Portuguese, Mandarin, Hindi, Arabic, and more. Language detection is automatic — NEXUS responds in the language the caller uses without any configuration required.',
  },
  {
    q: 'What tools does NEXUS integrate with?',
    a: 'NEXUS connects with popular calendars (Google Calendar, Outlook), CRMs (HubSpot, Salesforce, Zoho), and practice management software. It also supports Zapier and webhooks for custom workflows. The integration library is growing every month.',
  },
  {
    q: 'What happens if there is an outage?',
    a: 'NEXUS is built on enterprise-grade infrastructure with 99.9% uptime. In the rare event of a disruption, incoming calls are automatically forwarded to a backup number you specify — typically your direct line. You will never have unanswered calls due to a NEXUS outage.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              FAQ
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Common questions
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col divide-y divide-slate-800">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 40}>
              <button
                className="flex w-full items-start gap-4 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <ChevronDown
                  className={cn(
                    'mt-0.5 size-4 shrink-0 text-teal-400 transition-transform duration-200',
                    openIndex === i && 'rotate-180'
                  )}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{faq.q}</p>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openIndex === i ? 'mt-3 max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="text-sm leading-relaxed text-slate-400">{faq.a}</p>
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
