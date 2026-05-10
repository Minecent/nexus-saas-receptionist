# NEXUS Architecture Reference

## Multi-Tenant Call Handling

### How it works today

One n8n workflow handles every client's inbound calls. When Vapi fires a tool call, the workflow:

1. Receives the tool call at `/webhook/nexus-call-tools-v2`
2. Extracts the `assistant_id` from the Vapi payload
3. Calls `get_config_by_assistant_id` RPC in Supabase → returns that client's full config row
4. Routes to the correct tool handler (book, cancel, reschedule, message, callback, hours)
5. Uses `calendar_id` from the config to target the right Google Calendar

**Key principle:** `agent_config` is the source of truth per client. Every dynamic value (calendar ID, business name, timezone, appointment duration, notification email) comes from that row — the workflow itself is stateless and client-agnostic.

### Supabase schema (relevant columns)

```
agent_config
  user_id            uuid  PK (FK to auth.users)
  vapi_assistant_id  text  — links Vapi to this client's config
  calendar_id        text  — Google Calendar ID for bookings
  timezone           text  — e.g. "America/New_York"
  appointment_duration_minutes  int
  notification_email text
  ...

appointments
  user_id              uuid
  preferred_time       text        — raw string from LLM (legacy)
  preferred_time_iso   timestamptz — normalized ISO timestamp (v2+)
  preferred_time_human text        — human-readable fallback display
  gcal_event_id        text        — Google Calendar event ID
```

---

## Google Calendar: Multi-Tenant Strategy

### Phase 1 — Testing (now)
Single OAuth credential (your personal Google account) hardcoded in n8n.
`calendar_id` in `agent_config` points to your test calendar.

### Phase 2 — First 1–3 customers (manual)
For each new customer:
1. Customer provides their Google Calendar ID during onboarding (already collected in Step 3 of the onboarding flow)
2. You manually add their Google OAuth credential to n8n (10 min per customer — Credentials → New → Google Calendar OAuth2)
3. You manually wire that credential to the Google Calendar nodes for their calls

**Why this works at small scale:** The n8n workflow already uses `calendar_id` dynamically from Supabase. The only manual step is adding and selecting the OAuth credential in n8n. The rest is automatic.

**Limitation:** This approach means all clients share the same n8n credential unless you duplicate the workflow per client — not scalable past ~5 customers.

### Phase 3 — 5–10 customers (proper OAuth flow)
Build "Sign in with Google" during onboarding (same pattern as Calendly, Cal.com):

1. Client clicks "Connect Google Calendar" in the NEXUS onboarding or settings page
2. Google OAuth consent screen → user grants calendar access
3. NEXUS receives `access_token` + `refresh_token` → stores in Supabase (encrypted, in `agent_config` or a separate `oauth_tokens` table)
4. n8n workflow swaps the Google Calendar node for direct HTTP requests to the Calendar API, using the per-client token fetched from Supabase
5. Token refresh logic runs in an n8n Code node before each Calendar API call

**Why wait:** Building OAuth token storage, refresh logic, and the consent UI is ~2–3 days of work. Not worth it until the workflow is proven with real clients.

---

## Vapi → n8n → Google Calendar data flow

```
Caller speaks
    ↓
Vapi (GPT-4o-mini) decides to call a tool
    ↓
POST /webhook/nexus-call-tools-v2  (n8n)
    ↓
Extract Tool Call  →  Fetch Customer Config (Supabase RPC by assistant_id)
    ↓
Merge Config + Tool
    ↓
Route by Tool (switch: book / check / cancel / reschedule / message / callback / hours)
    ↓
[book_appointment branch]
Validate & Parse Time  →  Time Valid?
    ├─ true  →  Create Calendar Event (Google Calendar API, uses client's calendar_id)
    │            →  Save Booking to Supabase (preferred_time_iso + preferred_time_human)
    │            →  Trigger Zapier  →  Respond - Booked
    └─ false →  Respond - Bad Time (asks caller to re-state the time)
```

---

## Edge Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `provision-vapi` | Onboarding completion | Creates Vapi assistant + buys phone number, saves IDs to agent_config |
| `update-vapi-assistant` | Settings save (AVA config section) | PATCHes existing Vapi assistant with updated system prompt + tools |
| `vapi-webhook` | Every Vapi call event | Logs call start/end, saves transcript, updates call status |

---

## Environment Variables

| Var | Where used |
|-----|-----------|
| `VAPI_API_KEY` | Edge functions — create/update Vapi assistants |
| `N8N_CALL_TOOLS_URL` | Edge functions — passed to Vapi as the tool server URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge functions — admin operations |
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Browser — VapiWidget for test calls |
| `ENABLE_ACCOUNT_DELETION` | API route — feature flag for danger zone |

---

## Decision Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-05 | Single n8n workflow, multi-tenant via Supabase config lookup | Simpler ops, no per-client workflow duplication |
| 2026-05 | Skip service account for Google Calendar | Too much friction for SMB (property managers must share calendar with robot email) |
| 2026-05 | Skip per-customer OAuth for now | Premature; manual credential setup is fine for first 3 clients |
| 2026-05 | ISO 8601 enforcement in Vapi tool schema | LLM was passing relative strings ("tomorrow") causing Invalid Date in bookings |
| 2026-05 | preferred_time_iso + preferred_time_human columns | Decouple what the LLM said from the parsed timestamp; preserve both for display |
