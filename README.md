# Sobar Haat

**Community service, closer to home.**

**Live site:** https://sobar-haat.vercel.app _(replace with the final Vercel URL after deployment)_

## Project ta ki?

Sobar Haat ekta **Social Development Events Platform** — manush nijer elake social
service drive khuje, join kore, ar track korte pare. Example: Mirpur 10-e winter
clothes distribution, Mohammadpur-e blanket distribution, community food drive,
flood relief, blood donation camp, tree plantation.

Goal: jekono manush (login charao) dekhte pare ki ki drive cholchhe, kothay cholchhe,
kar organization-e, ar kobe. Logged-in user nijeo drive create korte, join korte ar
nijer event manage korte pare. Age-r drive-gulo archive-e thake — pokhktok injo
last month-er blood donation camp kemon silo, kothay silo, kitai kora hoyechilo
tai dekha jay.

## Project-e ki ki kora jay?

**Jekono visitor (login charao):**
- Home-e banner, features, how-it-works, 6 ta recent upcoming event, 6 ta past event recap, gallery ar newsletter dekha jay.
- `/events` page-e shob upcoming event grid-e dekha, search ar cause filter diye khuja jay.
- Event card-e click kore details page-e date, time, location, description, organizer ar volunteers count dekha jay.
- `/archived-events` page-e shob age-r drive dekha jay.
- Light/dark theme toggle kora jay.

**Account thakle:**
- Email/password ba Google diye login/register (name, photo URL, validated password).
- Naya event create kora — title, type (Cleanup/Plantation/Donation/Winter Support/Food Support/Flood Relief/Health), location, future date, time, thumbnail URL ar description.
- Konok event-e Join kora jay (per user ekbar) ar `/joined-events`-e nijer join-gulo event date-anusare dekha jay.
- Shudhu nije create kora event edit/delete kora jay `/manage-events` theke.
- Profile dropdown theke Create / Manage / Joined event-e jawa ar logout kora jay.
- Private page reload korleo login-e redirect hoy na.

## Features

- **Database-driven** — event data MongoDB-thake ashe; home-er 6 ta card `GET /events/recent?limit=6` (MongoDB `.limit()`) theke load hoy.
- **Public archive** — past event-gulo server-e date diye filter kore `/events/archived`-e dey; details page-e join-er bodole recap notice dekha jay.
- **Real volunteer count** — `joins` collection-e count kore; fake/seed number kakhono dekha jay na, naya event 0 theke shuru.
- **Owner-only manage** — event-e `creatorEmail` store hoy, edit/delete-e abar check hoy.
- **JWT protected** — create/edit/delete/join — sob mutation-e fresh `Authorization: Bearer <token>` pathano hoy; Express API remote JWKS diye verify kore.
- **Validation + toast** — password-e uppercase, lowercase ar min 6 char; event form-e sob field validation ar past date block. Kono `alert()` nei, shob message toast.
- **Theme + responsive** — semantic CSS token diye poora system light/dark hoy, saved theme first paint-er age apply hoy. Mobile/tablet/desktop-e equal-height card grid.

## Next.js tech ar kothay use hoyeche

| Next.js / related tech | Project-e use |
| --- | --- |
| **Next.js 16.4.6 App Router** | File-system routing under `src/app/` — `page.tsx`, `layout.tsx`, dynamic `/events/[id]`, `/manage-events/[id]/edit`, catch-all API route `/api/auth/[...all]` |
| **Server Components (default)** | `layout.tsx`, home/about/impact/archived page-gulo server-e render hoy; interactivity lagle-i `"use client"` |
| **Client Components** | `site-header`, `auth-form`, `event-form`, `event-details`, theme toggle, toast provider, auth provider — sob interactivity ar hooks |
| **Cache Components** | `next.config.ts`-e enabled; dynamic fetch thake `<Suspense>`-er bhitor (home-e `RecentEvents` + `ArchivedEvents`, fallback `EventsSkeleton`) |
| **Partial Prefetching** | Link prefetch ar streaming er jonno enabled |
| **React Compiler** | `babel-plugin-react-compiler` config-e on — manual `useMemo`/`useCallback` barai lagbe na |
| **Turbopack** | `next dev` / `next build`; `*.css` er jonno custom `@tailwindcss/turbopack` loader |
| **Route Handlers** | `src/app/api/auth/[...all]/route.ts` BetterAuth (login, register, Google, `/api/auth/token`, `/api/auth/jwks`) handle kore |
| **Proxy (Next 16 middleware)** | `src/proxy.ts` — private route-e cookie/session check kore anonymous user-ke `/login`-e pathay, logged-in user-ke auth page-e jete dey na |
| **Metadata API** | `layout.tsx`-e default title/description, archive page-e alada metadata |
| **`next/link`** | Navbar, footer, card button — client-side navigation + prefetch |
| **`next/image`** | Event thumbnail, gallery, hero — optimized/responsive image |
| **`next/navigation`** | `useRouter` diye login/create/edit-er por redirect |
| **`next/font/google`** | `Inter` + `Geist Mono` layout-e load, CSS variable (`--font-sans`, `--font-mono`) |
| **Tailwind CSS v4 (CSS-first)** | `src/app/globals.css`-e semantic tokens + `.dark` variant; kono `tailwind.config.*` nei |
| **shadcn UI v4 + Base UI** | `src/components/ui/` generated components (Radix na) — Button, Card, Dialog, Select, Calendar, Avatar, Sheet, Toast etc. |
| **Hugeicons** | `ArrowRight02Icon`, `HandHeartIcon` etc. poora UI-te icon |
| **TypeScript + `@/*` alias** | `src/*` path alias, build-e type-check hoy |

## Pages and routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Banner, features, how-it-works, 6 recent upcoming + 6 archived, gallery, newsletter |
| `/events` | Public | Shob upcoming event, search + cause filter |
| `/events/[id]` | Public | Details, organizer, real count, Join button (login charole details dekha jay) |
| `/archived-events` | Public | Shob past event, newest first, searchable |
| `/login`, `/register` | Public | Email/password + Google, photo URL, validated password |
| `/create-event` | Private | Naya drive create |
| `/manage-events`, `/manage-events/[id]/edit` | Private | Nijer event edit/delete |
| `/joined-events` | Private | Join kora event, event date-anusare sorted |
| `/about`, `/impact` | Public | Amader story ar impact |

Private routes dui layer-e guarded: proxy + client-side `ProtectedRoute`. Tai
reload korle logged-in user login-e redirect hoy na.

## Shuru kora

```bash
npm install
cp .env.example .env.local   # nijer value boshao
npm run dev
```

Open http://localhost:3000. Event data-er jonno Express API (`http://localhost:8000`)
cholate hobey.

### Environment

| Variable | Kothay use hoy |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Browser → Express base URL (build-e bake hoy) |
| `BETTER_AUTH_URL` | App-er origin; JWT issuer/audience ar `/api/auth/jwks` |
| `BETTER_AUTH_SECRET` | BetterAuth signing secret |
| `MONGODB_URI` | API-er sathe same Atlas cluster |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in |

`.env*` gitignore korche. Template: `.env.example`.

### Scripts

| Command | Kaj |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build + type-check |
| `npm run start` | Production serve |
| `npm run lint` | ESLint |

Verify: `npm run lint` then `npm run build`.

## Deployment

1. Vercel-e deploy koro; uporer env-gulo set koro — `NEXT_PUBLIC_API_URL` Render
   service URL, `BETTER_AUTH_URL` Vercel origin.
2. Google OAuth redirect URL-e Vercel origin add koro.
3. API-te same `BETTER_AUTH_URL` ar matching `CORS_ORIGINS` set koro
   ([server README](../sobarhat-server/README.md)).
4. App Router direct route reload handle kore — kono route-e 404 ashe na.

## Related

- [Express + MongoDB API README](../sobarhat-server/README.md)
