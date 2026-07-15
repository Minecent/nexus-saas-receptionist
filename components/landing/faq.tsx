'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FadeIn } from './fade-in'

const faqs = [
  {
    q: 'What can NEXUS actually do?',
    a: 'NEXUS answers calls in 1 ring, 24/7/365. It collects caller information, answers questions about your business, books appointments, qualifies leads, and sends you instant summaries after every call. It can also transfer urgent calls to you or your team when needed — so nothing falls through the cracks.',
  },
  {
    q: 'How fast does NEXUS answer calls?',
    a: 'NEXUS answers in 1 ring — faster than most call centers. Callers never wait on hold or hear a busy signal. Every call is answered instantly, even during your busiest hours.',
  },
  {
    q: 'Can NEXUS handle multiple calls at once?',
    a: 'Yes. NEXUS handles unlimited parallel calls simultaneously. No busy signals, no hold times — every caller gets answered instantly, even during peak hours or when your team is already on other calls.',
  },
  {
    q: 'Does NEXUS work after business hours?',
    a: 'Yes. NEXUS answers calls 24/7/365, including nights, weekends, and public holidays. Every lead that calls outside your office hours gets answered, qualified, and logged — so you never miss an opportunity.',
  },
  {
    q: 'How does NEXUS learn about my business?',
    a: "During onboarding, we train NEXUS on your website, services, pricing, and booking policies. You customise the greeting, responses, and transfer rules to match how your business operates. NEXUS gets smarter over time based on your feedback — the more you use it, the better it gets.",
  },
  {
    q: 'Will callers know they are talking to AI?',
    a: "Most don't realise it. Those who do typically prefer getting help immediately over navigating phone trees or leaving voicemail. You can choose to disclose upfront that callers are speaking with an AI assistant — many businesses do, and it doesn't hurt satisfaction at all.",
  },
  {
    q: 'Can I keep my existing phone number?',
    a: 'Yes. You keep your current business number and set up call forwarding to NEXUS — a 5-minute change with your phone provider. No number porting required. We send you step-by-step instructions for your specific carrier after signup.',
  },
  {
    q: 'What integrations does NEXUS support?',
    a: 'Pro and above includes a Zapier webhook that connects AVA to 7,000+ apps — CRMs, spreadsheets, email tools, project management platforms, and more. Scale customers also get direct connections to Outlook, Salesforce, and HubSpot. Custom Build customers get hands-on integration setup with our team for fully custom workflows.',
  },
  {
    q: 'How does the Zapier integration work — do I need technical knowledge?',
    a: "No technical knowledge needed. When you sign up for the Pro plan, you receive a unique webhook URL, a 5-minute setup guide, and a set of pre-built templates for common tools (HubSpot, Google Sheets, Slack, Gmail, and more). You paste your webhook URL into Zapier, pick a template, connect your app, and you are done. NEXUS delivers your call data — you decide where it goes. Zapier's own support team handles any questions about your specific workflow. If you would rather have our team build and manage your integrations end-to-end, that is available on the Scale plan.",
  },
  {
    q: 'What happens if NEXUS cannot answer a question?',
    a: "NEXUS is trained on your business information, but when a caller asks something outside its knowledge, it doesn't guess. It takes a detailed message, captures the caller's contact info, and immediately notifies you via SMS or email so you can follow up. No caller is ever left without a response.",
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
                className="flex w-full items-start gap-4 py-5 text-left min-h-[56px]"
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
                    <p className="text-sm leading-relaxed text-slate-100">{faq.a}</p>
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
