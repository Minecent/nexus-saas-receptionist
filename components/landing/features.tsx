import { PhoneCall, CalendarCheck, MessageSquare, Zap, BarChart3, Globe } from 'lucide-react'
import { FadeIn } from '@/components/landing/fade-in'

const features = [
  {
    icon: PhoneCall,
    title: '24/7/365 Availability',
    description:
      'Never miss a call again. NEXUS answers instantly, day or night, weekends and holidays included.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Booking',
    description:
      'Books directly into your Google Calendar. Callers pick a time, NEXUS confirms it, done.',
  },
  {
    icon: MessageSquare,
    title: 'Perfect Messages',
    description:
      'Every call is transcribed and summarized. Get instant notifications with exactly what the caller needed.',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description:
      'Forward your calls and go live in minutes. No hardware, no downloads, no IT department needed.',
  },
  {
    icon: BarChart3,
    title: 'Call Analytics',
    description:
      'See call volume, peak times, and booking rates. Know exactly what happens on your phone lines.',
  },
  {
    icon: Globe,
    title: 'Sounds Natural',
    description:
      'Callers talk to a warm, professional voice that understands context — not a robotic phone tree.',
  },
]

export default function Features() {
  return (
    <section id="features" className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
              Features
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything a great receptionist does. And more.
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FadeIn key={feature.title}>
              <div className="h-full rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <feature.icon className="mb-4 size-6 text-teal-400" />
                <h3 className="mb-2 text-base font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-100">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
