// Paste your real Calendly link here — it's the only place you need to change it.
export const CALENDLY_URL = "https://calendly.com/nexusconsultancy-sales/30min"

export const CONTACT_EMAIL = "sales@nexusconsultancy.app"

// Free test-call allowances per plan, used by /dashboard/test-ava and the
// /api/test-calls endpoints. `calls: null` or `maxDurationSeconds: null` means unlimited.
export const TEST_CALL_LIMITS: Record<string, { calls: number | null; maxDurationSeconds: number | null }> = {
  lite:   { calls: 5,  maxDurationSeconds: 300 },
  pro:    { calls: 15, maxDurationSeconds: 300 },
  scale:  { calls: 30, maxDurationSeconds: 300 },
  custom: { calls: null, maxDurationSeconds: null },
}

export const DEFAULT_TEST_CALL_LIMITS = TEST_CALL_LIMITS.lite
