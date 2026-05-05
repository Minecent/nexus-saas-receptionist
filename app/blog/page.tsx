import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — NEXUS AI Receptionist',
  description: 'Guides, comparisons, and resources to help you choose the right AI receptionist for your business.',
}

const posts = [
  {
    slug: 'nexus-vs-ruby-receptionists',
    title: 'NEXUS vs Ruby Receptionists (2026)',
    description: 'Ruby starts at $235/month for 50 live minutes. NEXUS starts at $25/month with 24/7 AI answering. Full pricing and feature comparison.',
    badge: 'Comparison',
    date: 'April 2026',
  },
  {
    slug: 'nexus-vs-smith-ai',
    title: 'NEXUS vs Smith.ai (2026)',
    description: 'Smith.ai starts at $292.50/month for 30 calls. NEXUS Pro is $149/month for 500 minutes with no per-call fees. Side-by-side breakdown.',
    badge: 'Comparison',
    date: 'April 2026',
  },
  {
    slug: 'nexus-vs-answerconnect',
    title: 'NEXUS vs AnswerConnect (2026)',
    description: 'AnswerConnect charges per minute with overage fees. NEXUS charges flat-rate with no surprise bills. Full comparison of pricing, availability, and features.',
    badge: 'Comparison',
    date: 'April 2026',
  },
  {
    slug: 'nexus-vs-davinci-virtual',
    title: 'NEXUS vs Davinci Virtual (2026)',
    description: 'Davinci Virtual charges $129/month for just 50 live minutes during business hours. NEXUS starts at $25/month with 24/7 coverage.',
    badge: 'Comparison',
    date: 'April 2026',
  },
  {
    slug: 'nexus-vs-patlive',
    title: 'NEXUS vs PATLive (2026)',
    description: 'PATLive starts at $235/month for 75 minutes with per-minute overage fees. NEXUS starts at $25/month flat-rate with 24/7 AI answering.',
    badge: 'Comparison',
    date: 'April 2026',
  },
  {
    slug: 'nexus-vs-abby-connect',
    title: 'NEXUS vs Abby Connect (2026)',
    description: 'Abby Connect starts at $299/month for 100 minutes of live answering. NEXUS starts at $25/month with unlimited simultaneous calls and 24/7 coverage.',
    badge: 'Comparison',
    date: 'April 2026',
  },
]

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            NEXUS<span className="text-teal-400">.</span>
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
          >
            Try NEXUS
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-400">Blog</p>
          <h1 className="text-4xl font-bold tracking-tight">Resources & Comparisons</h1>
          <p className="mt-3 text-base text-slate-400">
            Guides and honest comparisons to help you choose the right AI receptionist for your business.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-slate-700 hover:bg-slate-900/80"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-teal-400">
                  {post.badge}
                </span>
                <span className="text-xs text-slate-500">{post.date}</span>
              </div>
              <h2 className="mb-2 text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-400">{post.description}</p>
              <p className="mt-3 text-xs font-semibold text-teal-500">Read comparison &rarr;</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
