# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npx tsc --noEmit # Type-check without building
```

No test framework is configured yet.

## Stack

- **Next.js 16** with the App Router (React 19)
- **Supabase** (`@supabase/ssr` + `@supabase/supabase-js`) for auth and database
- **Tailwind CSS v4** — configured via CSS imports in `app/globals.css`, not a `tailwind.config.*` file
- **shadcn/ui** (`base-nova` style, CSS variables for theming, `neutral` base color)
- **`@base-ui/react`** as the underlying primitive layer for shadcn components
- **Lucide React** for icons
- **TypeScript** strict mode

## Architecture

`app/` uses the Next.js App Router. `app/layout.tsx` is the root layout (Geist fonts, global CSS).

`components/ui/` holds shadcn components. Add new ones with `npx shadcn add <component>`.

`lib/utils.ts` exports `cn()` — the standard `clsx` + `tailwind-merge` helper. Always use `cn()` for conditional class composition.

## Path Aliases

`@/*` maps to the project root. Use `@/components/...`, `@/lib/...`, etc.

## Styling Notes

Tailwind v4 is imported via `@import "tailwindcss"` in `app/globals.css` — there is no `tailwind.config.ts`. Theme tokens (colors, radius, fonts) are defined as CSS custom properties in `globals.css` under `@theme inline`. Dark mode uses the `.dark` class variant.

## Base UI / shadcn Notes

shadcn components here use `@base-ui/react` primitives, **not** Radix UI. Key differences:
- Use `render={<Link href="..." />}` prop for polymorphic rendering — **not** `asChild`
- Dropdown menus are already `"use client"` — wrap interactive header/nav state in a separate client component when the parent is a Server Component

## Supabase

### Client helpers

| File | Use when |
|------|----------|
| `lib/supabase/client.ts` | Client Components (`"use client"`) |
| `lib/supabase/server.ts` | Server Components, Route Handlers, Server Actions |
| `lib/supabase/session.ts` | Middleware only — exports `updateSession()` |

Env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (set in `.env.local`).

### Auth flows

- **Session refresh**: `middleware.ts` calls `updateSession()` on every request via `getClaims()`. No route protection is configured yet — add redirect logic to `lib/supabase/session.ts` when a protected route (e.g. `/dashboard`) is added.
- **Sign up**: `supabase.auth.signUp()` with `emailRedirectTo` pointing to `/auth/callback`
- **Login**: `supabase.auth.signInWithPassword()` → redirect to `/`
- **Logout**: navigate to `/logout` — it's a Route Handler (`app/logout/route.ts`) that calls `signOut()` then redirects to `/`
- **Password reset**: `resetPasswordForEmail()` with `redirectTo: /auth/callback?next=/reset-password` → callback exchanges code → `/reset-password` calls `updateUser({ password })`
- **Auth callback** (`app/auth/callback/route.ts`): exchanges `?code=` via `exchangeCodeForSession()`, then redirects to `?next=` (defaults to `/`)

### Auth-aware Server Components

Read the session with:
```typescript
const supabase = await createClient()
const { data } = await supabase.auth.getClaims()
const user = data?.claims  // has .email, .sub, etc.
```

### Landing page

`components/landing/` contains the marketing page sections: `header.tsx` (Server Component, auth-aware), `hero.tsx`, `features.tsx`, `pricing.tsx`, `footer.tsx`. The header's interactive dropdown is isolated in `header-user-menu.tsx` (client component) so the parent stays a Server Component.
