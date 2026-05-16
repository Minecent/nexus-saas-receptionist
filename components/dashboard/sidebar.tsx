"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CalendarDays, MessageSquare, PhoneCall, Settings, LogOut, Zap, Mic, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard',            label: 'Overview',   icon: LayoutDashboard },
  { href: '/dashboard/bookings',   label: 'Bookings',   icon: CalendarDays },
  { href: '/dashboard/messages',   label: 'Messages',   icon: MessageSquare },
  { href: '/dashboard/callbacks',  label: 'Callbacks',  icon: PhoneCall },
  { href: '/dashboard/test-ava',   label: 'Test AVA',   icon: Mic },
  { href: '/dashboard/settings',   label: 'Settings',   icon: Settings },
]

interface Props {
  businessName: string
  plan: string
  email: string
}

export default function DashboardSidebar({ businessName, plan, email }: Props) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-950">
        <div className="flex h-16 items-center px-6 border-b border-slate-800">
          <span className="text-lg font-bold tracking-tight">
            NEXUS<span className="text-teal-400">.</span>
          </span>
        </div>

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

        <div className="px-4 pb-2 space-y-1.5">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
            <Zap className="size-3 text-teal-400 shrink-0" />
            <span className="text-xs font-semibold capitalize text-teal-400">{plan} plan</span>
          </div>
          {plan === 'lite' && (
            <Link
              href="/checkout?plan=pro"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-400 hover:bg-teal-500/20 transition-colors"
            >
              <ArrowUpRight className="size-3" /> Upgrade plan
            </Link>
          )}
        </div>

        <div className="border-t border-slate-800 px-4 py-4 space-y-1">
          <p className="text-xs font-medium text-white truncate">{businessName}</p>
          <p className="text-xs text-slate-500 truncate">{email}</p>
          <Link href="/logout" className="mt-2 flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
            <LogOut className="size-3" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex overflow-x-auto border-t border-slate-800 bg-slate-950">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors',
                active ? 'text-teal-400' : 'text-slate-500 hover:text-white'
              )}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
