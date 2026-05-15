'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Mic, Calendar } from 'lucide-react'
import { dismissNudge } from './actions'

export default function NudgeCard({ hasCalendar }: { hasCalendar: boolean }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const handleDismiss = async () => {
    setDismissed(true)
    await dismissNudge('setup')
  }

  return (
    <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-5 mb-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2.5">
          <p className="text-sm font-semibold text-teal-300">Get started with AVA</p>
          <Link
            href="/dashboard/test-ava"
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <Mic className="size-3.5 shrink-0 text-teal-400" />
            Run a test call to verify AVA is working
          </Link>
          {!hasCalendar && (
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <Calendar className="size-3.5 shrink-0 text-teal-400" />
              Connect your Google Calendar in Settings
            </Link>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-600 hover:text-slate-400 transition-colors shrink-0 mt-0.5"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
