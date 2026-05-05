"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Phone, Calendar, GitBranch, Settings, LogOut, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard',                    label: 'Overview',        icon: LayoutDashboard },
  { href: '/dashboard/calls',              label: 'Calls',           icon: Phone },
  { href: '/dashboard/appointments',       label: 'Appointments',    icon: Calendar },
  { href: '/dashboard/forwarding-rules',   label: 'Forwarding Rules',icon: GitBranch },
  { href: '/dashboard/settings',           label: 'Settings',        icon: Settings },
]

interface Props {
  businessName: string
  plan: string
  email: string
}

export default function DashboardSidebar({ businessName, plan, email }: Props) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-950">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <span className="text-lg font-bold tracking-tight">
          NEXUS<span className="text-teal-400">.</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-teal-500/10 text-teal-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Plan badge */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
          <Zap className="size-3 text-teal-400 shrink-0" />
          <span className="text-xs font-semibold capitalize text-teal-400">{plan} plan</span>
        </div>
      </div>

      {/* User footer */}
      <div className="border-t border-slate-800 px-4 py-4 space-y-1">
        <p className="text-xs font-medium text-white truncate">{businessName}</p>
        <p className="text-xs text-slate-500 truncate">{email}</p>
        <Link
          href="/logout"
          className="mt-2 flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors"
        >
          <LogOut className="size-3" />
          Sign out
        </Link>
      </div>
    </aside>
  )
}
