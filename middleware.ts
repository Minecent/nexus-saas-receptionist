import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/session'

export async function middleware(request: NextRequest) {
  const { response, claims, supabase } = await updateSession(request)

  const pathname = request.nextUrl.pathname

  // Redirect already-authenticated users away from auth pages
  if (pathname === '/signup' || pathname === '/login') {
    if (claims) {
      return Response.redirect(new URL('/onboarding', request.url))
    }
  }

  // Onboarding routes
  if (pathname.startsWith('/onboarding')) {
    if (pathname === '/onboarding') {
      return response
    }

    if (!claims) {
      return Response.redirect(new URL('/login?next=' + pathname, request.url))
    }

    const { data: onboarding } = await supabase
      .from('user_onboarding')
      .select('is_completed')
      .eq('user_id', claims.sub)
      .single()

    if (onboarding?.is_completed) {
      return Response.redirect(new URL('/dashboard', request.url))
    }
  }

  // Protect dashboard — require completed onboarding
  if (pathname.startsWith('/dashboard')) {
    if (!claims) {
      return Response.redirect(new URL('/login?next=' + pathname, request.url))
    }

    const { data: onboarding } = await supabase
      .from('user_onboarding')
      .select('is_completed')
      .eq('user_id', claims.sub)
      .single()

    if (!onboarding?.is_completed) {
      return Response.redirect(new URL('/onboarding', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
