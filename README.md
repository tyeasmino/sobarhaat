# Sobar Haat

**Community service, closer to home.**

**Live site:** https://sobar-haat.vercel.app _(replace with the final Vercel URL after deployment)_

## Overview

Sobar Haat is a **Social Development Events Platform** that enables community
members to discover, create, join and track local service drives. Examples
include winter clothes distribution in Mirpur 10, blanket distribution in
Mohammadpur, community food drives, flood relief programmes, blood donation
camps and tree plantation drives.

The platform serves two audiences. Unauthenticated visitors can browse upcoming
events and read full event details without creating an account. Registered users
can organise their own drives, volunteer for events created by others, review
the events they have joined and manage only the events they created. Completed
drives remain publicly accessible in an archive, so the community can review
past activities — for example, where the previous monthly blood donation camp
was held and what work was carried out.

## What You Can Do

### As a visitor

- Browse the home page banner, platform features, step-by-step guide, six recent
  upcoming events, six archived recaps, a community gallery and a newsletter
  section.
- Browse all upcoming events in a responsive grid, with keyword search and
  filters by cause.
- Open any event details page to review the date, time, location, description,
  organiser, real volunteer count and joining instructions.
- Browse the complete public archive of past events, sorted from newest to
  oldest and searchable by title, cause or location.
- Switch between light and dark themes; the selected theme is preserved across
  reloads.

### As a registered user

- Register with a name, email address, optional photo URL and a validated
  password, or sign in with Google.
- Create an event with a title, type, location, future date, start time,
  thumbnail URL and description.
- Join an upcoming event; each user can join a given event once, and joined
  events are listed in chronological order by event date.
- Edit or delete only the events created by that account.
- Access private pages from the profile dropdown and sign out securely.
- Reload private routes without being redirected to the login page.

## Key Features

- **Database-driven listings** — the home page retrieves its six upcoming cards
  from `GET /events/recent?limit=6`, which uses MongoDB's `.limit(6)` operator.
  No sample data is displayed once the API is configured.
- **Public event archive** — completed drives are filtered by date on the
  server and returned by `GET /events/archived`. Event details pages replace the
  join action with a recap notice once an event has passed.
- **Accurate volunteer counts** — counts are computed from the `joins`
  collection on every read. Seeded values are ignored and new events start at
  zero.
- **Owner-only event management** — the creator's email address is stored on
  each event and verified again before edits or deletions are permitted.
- **JWT-protected mutations** — create, update, delete and join requests send a
  fresh `Authorization: Bearer <token>` obtained from `/api/auth/token`. The
  Express API validates it against BetterAuth's remote JWKS endpoint.
- **Validation and user feedback** — passwords require an uppercase letter, a
  lowercase letter and at least six characters. Event forms validate all fields
  and reject past dates. All feedback is delivered through toasts instead of
  browser alerts.
- **Theming and responsiveness** — semantic CSS tokens restyle the entire
  interface from a single toggle, with the saved theme applied before the first
  paint. Card grids maintain equal dimensions on mobile, tablet and desktop.

## Pages and Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Banner, features, how-it-works, six recent upcoming events, six archived recaps, gallery and newsletter |
| `/events` | Public | All upcoming events with search and cause filters |
| `/events/[id]` | Public | Full event details, organiser, real volunteer count and join action |
| `/archived-events` | Public | All past events, newest first, with search |
| `/login`, `/register` | Public | Email/password and Google authentication; photo URL and password validation on registration |
| `/create-event` | Private | Create a new service drive |
| `/manage-events`, `/manage-events/[id]/edit` | Private | Edit or delete events owned by the signed-in user |
| `/joined-events` | Private | Events joined by the signed-in user, sorted by event date |
| `/about`, `/impact` | Public | Project story and community impact |

Private routes are protected at two levels: the Next.js proxy redirects
anonymous visitors, while the client-side `ProtectedRoute` keeps authenticated
users on the page after a hard reload.

## Next.js Implementation Details

| Technology | Usage in this project |
| --- | --- |
| Next.js 16.4.6 App Router | File-system routes in `src/app/`, including dynamic segments `/events/[id]` and `/manage-events/[id]/edit`, plus the catch-all API route `/api/auth/[...all]` |
| Server Components | `layout.tsx` and the home, about, impact and archive pages render on the server by default |
| Client Components | The header, authentication form, event form, event details, theme toggle, toast provider and auth provider are marked `"use client"` |
| Cache Components | Enabled in `next.config.ts`; dynamic data reads are wrapped in `<Suspense>` with `EventsSkeleton` as the fallback |
| Partial Prefetching | Enabled for faster client-side navigation between routes |
| React Compiler | Enabled through `babel-plugin-react-compiler`, reducing the need for manual memoisation |
| Turbopack | Used by `next dev` and `next build`, with a custom `@tailwindcss/turbopack` CSS loader |
| Route Handlers | `src/app/api/auth/[...all]/route.ts` exposes BetterAuth endpoints for login, registration, Google sign-in, token issuance and JWKS |
| Proxy (Next.js 16 middleware) | `src/proxy.ts` validates the session cookie on private routes and redirects unauthenticated users |
| Metadata API | Global title and description in `layout.tsx`, with route-specific metadata on the archive page |
| `next/link` | Navigation in the header, footer and event cards with client-side prefetching |
| `next/image` | Optimised, responsive rendering of event thumbnails, gallery images and the hero illustration |
| `next/navigation` | `useRouter` handles redirects after authentication and event creation or editing |
| `next/font/google` | Inter and Geist Mono are loaded in `layout.tsx` and exposed as CSS variables |
| Tailwind CSS v4 | CSS-first configuration in `src/app/globals.css`, using semantic tokens and a `.dark` variant; no `tailwind.config.*` |
| shadcn UI v4 with Base UI | Generated primitives in `src/components/ui/` for buttons, cards, dialogs, selects, calendars, avatars and sheets |
| Hugeicons | Icon set used throughout the interface |
| TypeScript | Strict typing with the `@/*` path alias mapped to `src/*`; `npm run build` performs type checking |

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The Express API must be running at
http://localhost:8000 for event data to load.

### Environment Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Browser-to-Express base URL; embedded at build time |
| `BETTER_AUTH_URL` | Application origin; JWT issuer, audience and `/api/auth/jwks` base URL |
| `BETTER_AUTH_SECRET` | BetterAuth signing secret |
| `MONGODB_URI` | MongoDB Atlas connection string shared with the API |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |

Environment files are gitignored. See `.env.example` for a template.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build and type-check the project |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

Verify changes with `npm run lint` followed by `npm run build`.

## Deployment

1. Deploy the application to Vercel and set all environment variables above.
   `NEXT_PUBLIC_API_URL` must point to the deployed Render service, and
   `BETTER_AUTH_URL` must match the Vercel origin.
2. Add the Vercel origin to the Google OAuth redirect URLs.
3. Configure the API with the same `BETTER_AUTH_URL` and matching
   `CORS_ORIGINS`, as described in the [server README](../sobarhat-server/README.md).
4. App Router serves direct route requests, so reloading any route does not
   produce a 404 error.

## Related

- [Express and MongoDB API README](../sobarhat-server/README.md)
