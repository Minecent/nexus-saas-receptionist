import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/onboarding'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.user) {
      // Ensure onboarding and agent_config records exist now that the session is active.
      // Uses upsert so re-clicking the email link is idempotent.
      await supabase.from('user_onboarding').upsert(
        { user_id: data.user.id, current_step: 1, completed_steps: [], is_completed: false },
        { onConflict: 'user_id', ignoreDuplicates: true }
      )
      await supabase.from('agent_config').upsert(
        { user_id: data.user.id },
        { onConflict: 'user_id', ignoreDuplicates: true }
      )
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}
