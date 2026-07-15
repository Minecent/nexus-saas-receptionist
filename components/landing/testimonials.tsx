import { Star } from 'lucide-react'

// TODO: Replace placeholder quotes with real customer testimonials before launch.
const testimonials = [
  {
    quote:
      "We used to miss 3–4 calls every evening. NEXUS picks up every single one now. Two of those after-hours calls turned into jobs the very first week.",
    name: "Marcus D.",
    title: "Owner",
    company: "MDK Plumbing & HVAC",
    industry: "Home Services",
    avatar: "MD",
    rating: 5,
  },
  {
    quote:
      "Our front desk was constantly overwhelmed. NEXUS handles appointment bookings automatically — it's like having a second receptionist who never takes a day off.",
    name: "Dr. Priya S.",
    title: "Practice Owner",
    company: "Sunrise Family Dental",
    industry: "Healthcare",
    avatar: "PS",
    rating: 5,
  },
  {
    quote:
      "Tenants call at all hours about maintenance. NEXUS takes the message, logs the request, and sends me a summary. I wake up knowing exactly what happened overnight.",
    name: "James R.",
    title: "Property Manager",
    company: "Clearview Properties",
    industry: "Property Management",
    avatar: "JR",
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="border-b border-slate-500 bg-slate-700 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">
            Customer stories
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Businesses that never miss a call
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-100">
            From solo tradespeople to multi-location practices — NEXUS works for any business that
            can&apos;t afford to let calls go to voicemail.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-slate-500 bg-slate-600 p-6"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-xs font-bold text-teal-400">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-200">
                    {t.title} · {t.company}
                  </p>
                </div>
                <span className="ml-auto rounded-full border border-slate-500 bg-slate-600 px-2 py-0.5 text-xs text-slate-200">
                  {t.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
