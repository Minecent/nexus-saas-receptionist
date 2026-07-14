import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { HeaderUserMenu } from './header-user-menu'
import { MobileNav } from './mobile-nav'

export default async function Header() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          NEXUS<span className="text-teal-400">.</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm sm:flex">
          <Link href="#features" className="text-slate-300 transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#pricing" className="text-slate-300 transition-colors hover:text-white">
            Pricing
          </Link>
          <Link href="/blog" className="text-slate-300 transition-colors hover:text-white">
            Blog
          </Link>
          <Link href="/about" className="text-slate-300 transition-colors hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-slate-300 transition-colors hover:text-white">
            Contact
          </Link>
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-2 sm:flex">
          {user ? (
            <HeaderUserMenu email={user.email as string} />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-slate-700 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Get Started CTA + hamburger */}
        <div className="flex items-center gap-2 sm:hidden">
          {user ? (
            <HeaderUserMenu email={user.email as string} />
          ) : (
            <Link
              href="/signup"
              className="rounded-lg bg-teal-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-600"
            >
              Get Started
            </Link>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
