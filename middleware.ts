import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/session'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // First update the session
  const response = await updateSession(request)
  
  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Redirect already-authenticated users away from auth pages
  if (pathname === '/signup' || pathname === '/login') {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll() {},
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      return Response.redirect(new URL('/onboarding', request.url))
    }
  }

  // Check if accessing onboarding routes
  if (pathname.startsWith('/onboarding')) {
    // Allow access to onboarding index (will redirect based on status)
    if (pathname === '/onboarding') {
      return response
    }
    
    // Check authentication
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {
            // No-op in middleware
          },
        },
      }
    )
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      // Not authenticated, redirect to login
      return Response.redirect(new URL('/login?next=' + pathname, request.url))
    }
    
    // Check if onboarding is completed
    const { data: onboarding } = await supabase
      .from('user_onboarding')
      .select('is_completed')
      .eq('user_id', user.id)
      .single()
    
    // If onboarding completed and trying to access onboarding, redirect to dashboard
    if (onboarding?.is_completed) {
      return Response.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
