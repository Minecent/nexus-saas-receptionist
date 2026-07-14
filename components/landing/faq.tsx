'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What does NEXUS actually do when someone calls?',
    a: 'NEXUS answers calls in 1 ring, 24/7/365. It collects caller information, answers questions about your business, books appointments, qualifies leads, and sends you instant summaries after every call. It can also transfer urgent calls to you or your team when needed — so nothing falls through the cracks.',
  },
  {
    q: 'Will callers know they are talking to an AI?',
    a: 'NEXUS sounds natural and conversational — most callers have smooth, quick conversations without friction. We believe in transparency: NEXUS can introduce itself as an AI assistant if you prefer, or simply as your receptionist.',
  },
  {
    q: 'Does NEXUS work outside business hours?',
    a: 'Yes. NEXUS answers calls 24/7/365, including nights, weekends, and public holidays. Every lead that calls outside your office hours gets answered, qualified, and logged — so you never miss an opportunity.',
  },
  {
    q: 'Can I keep my existing phone number?',
    a: 'Absolutely. You simply forward your existing number to NEXUS — no porting, no new number needed unless you want one. Setup takes minutes and your customers keep calling the same number they always have.',
  },
  {
    q: 'What happens if NEXUS can\u2019t answer a question?',
    a: 'NEXUS gracefully takes a message and flags the call for follow-up, or transfers the caller to you if it\u2019s urgent. You define the rules — NEXUS follows them. Every interaction is logged so you always have full context.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most businesses are live within 24–48 hours. You tell us about your business, choose a voice, and forward your calls. NEXUS handles the rest — no hardware, no downloads, no IT department required.',
  },
  {
    q: 'Can NEXUS book appointments into my calendar?',
    a: 'Yes. NEXUS integrates with Google Calendar out of the box and can check availability, book, and confirm appointments in real time while the caller is still on the phone.',
  },
  {
    q: 'What if I get more calls than my plan includes?',
    a: 'You can upgrade anytime, and we\u2019ll notify you before you hit your limit. Extra calls are billed at a simple per-call rate — no surprise fees, no cut-off calls.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-800 bg-slate-900"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm font-semibold text-white sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`size-4 shrink-0 text-teal-400 transition-transform ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-100">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
