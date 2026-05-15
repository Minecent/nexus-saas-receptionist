'use client'

import { useState } from 'react'
import { Phone, Copy, Check, Loader2 } from 'lucide-react'

export default function PhoneCard({
  phoneNumber,
  provisioningStatus,
}: {
  phoneNumber: string | null
  provisioningStatus: string
}) {
  const [copied, setCopied] = useState(false)

  const isProvisioning = !phoneNumber || (provisioningStatus !== 'active' && provisioningStatus !== 'assistant_ready')

  const copy = () => {
    if (!phoneNumber) return
    navigator.clipboard.writeText(phoneNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <Phone className="size-4 mb-2 text-slate-400" />
      {isProvisioning ? (
        <>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Loader2 className="size-3.5 text-slate-500 animate-spin" />
            <p className="text-sm text-slate-500">Provisioning…</p>
          </div>
          <p className="text-xs text-slate-600">AVA number</p>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className="text-sm font-mono font-bold text-white truncate">{phoneNumber}</p>
            <button onClick={copy} className="text-slate-500 hover:text-teal-400 transition-colors shrink-0">
              {copied ? <Check className="size-3.5 text-teal-400" /> : <Copy className="size-3.5" />}
            </button>
          </div>
          <p className="text-xs text-slate-500">AVA number</p>
        </>
      )}
    </div>
  )
}
