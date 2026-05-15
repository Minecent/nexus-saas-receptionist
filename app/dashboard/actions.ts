'use server'

import { createClient } from '@/lib/supabase/server'

export async function dismissNudge(nudgeKey: string) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) return

  const { data: onboarding } = await supabase
    .from('user_onboarding')
    .select('dismissed_nudges')
    .eq('user_id', data.claims.sub)
    .single()

  const existing = (onboarding?.dismissed_nudges as string[]) ?? []
  if (existing.includes(nudgeKey)) return

  await supabase
    .from('user_onboarding')
    .update({ dismissed_nudges: [...existing, nudgeKey] })
    .eq('user_id', data.claims.sub)
}
