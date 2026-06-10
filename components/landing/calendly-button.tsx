'use client'

import type { ReactNode } from 'react'
import { CALENDLY_URL } from '@/lib/config'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

export function CalendlyButton({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.Calendly?.initPopupWidget({ url: CALENDLY_URL })}
      className={className}
    >
      {children}
    </button>
  )
}
