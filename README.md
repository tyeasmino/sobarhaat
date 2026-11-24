# Sobar Haat

**Community service, closer to home.** Sobar Haat is a Social Development Events
Platform where neighbours create, join and track local service drives — winter
clothes distribution in Mirpur 10, blanket distribution in Mohammadpur, food
packs, flood relief, blood donation camps and tree plantation.

**Live site:** https://sobar-haat.vercel.app _(update with the final Vercel URL after deployment)_

## What the app does

Visitors can browse upcoming drives and open any event details page without an
account. Logging in unlocks creating events, joining drives, managing only the
events they created, and a personal joined-events list. Past drives stay public
in a separate archive so anyone can see what happened, where and who organised
it — like checking last month's blood donation camp before joining this month's.

## Pages and routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Banner, features, how-it-works, 6 recent upcoming events, 6 archived recaps, gallery, newsletter |
| `/events` | Public | All upcoming events in a grid, with search and cause filters |
| `/events/[id]` | Public | Full details, organiser info, real volunteer count and Join button |
| `/archived-events` | Public | Every past drive, newest first, searchable |
| `/login`, `/register` | Public | Email/password + Google; name, photo URL and validated password on sign-up |
| `/create-event` | Private | Create a drive with title, type, location, future date, time, thumbnail and description |
| `/manage-events`, `/manage-events/[id]/edit` | Private | Edit or delete only your own events |
| `/joined-events` | Private | Drives you joined, sorted by event date |
| `/about`, `/impact` | Public | Story and impact pages |

Private routes are guarded twice: the Next.js proxy redirects anonymous
visitors, and `ProtectedRoute` keeps a signed-in user on the page after a hard
reload instead of bouncing them to Login.

## Features

- **Real data from MongoDB** — the home page loads its six upcoming cards from
  `GET /events/recent?limit=6`, which uses MongoDB's `.limit(6)` operator. No
  sample-data fallback is shown once the API is configured.
- **Public archive** — completed drives are filtered by date on the server and
  exposed through `GET /events/archived`; the details page swaps the Join button
  for a recap notice when an event has passed.
- **Honest volunteer counts** — the API counts records in the `joins`
  collection on every read. Seed numbers are ignored, new events start at 0, and
  joining updates the count from the real join records.
- **Owner-only management** — creator email is stored on each event and checked
  again on edit/delete, so nobody can touch another volunteer's drive.
- **JWT-protected mutations** — create, edit, delete and join send a fresh
  short-lived `Authorization: Bearer <token>` acquired from `/api/auth/token`;
  the Express API verifies it against BetterAuth's remote JWKS endpoint.
- **Validation and friendly feedback** — registration requires an uppercase
  letter, a lowercase letter and at least 6 characters; event forms validate all
  fields and reject past dates. All messages are toasts, never `alert()`.
- **Theme and responsiveness** — a single toggle restyles the whole interface
  through semantic CSS tokens and applies the saved choice before first paint.
  Equal-height cards and grids work on mobile, tablet and desktop.

## Tech stack

- Next.js 16 (App Router, Cache Components, React Compiler, Turbopack)
- React 19, TypeScript, Tailwind CSS v4 (CSS-first, no `tailwind.config.*`)
- Generated shadcn UI v4 components on Base UI primitives, Hugeicons icons
- BetterAuth 1.7 with MongoDB adapter and `jwt()` plugin
- Express 5 + MongoDB Atlas API (separate repository — see link below)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open http://localhost:3000. The Express API must be running on
`http://localhost:8000` for event data to load.

### Environment

| Variable | Where it is used |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Browser → Express base URL (baked in at build time) |
| `BETTER_AUTH_URL` | This app's origin; JWT issuer/audience and `/api/auth/jwks` |
| `BETTER_AUTH_SECRET` | BetterAuth signing secret |
| `MONGODB_URI` | Same Atlas cluster the API uses |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in (optional but required for the button) |

`.env*` files are gitignored. See `.env.example` for a template.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build; also type-checks |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

Verify changes with `npm run lint` then `npm run build`.

## Deployment

1. Deploy this app to Vercel. Set all five environment variables above;
   `NEXT_PUBLIC_API_URL` must point to the deployed Render service and
   `BETTER_AUTH_URL` to the Vercel origin.
2. Add the Vercel origin to the Google OAuth redirect URLs.
3. Configure the API with the same `BETTER_AUTH_URL` and matching
   `CORS_ORIGINS` (see the [server README](../sobarhat-server/README.md)).
4. App Router handles direct route reloads, so no route returns 404.

## Related

- [Express + MongoDB API README](../sobarhat-server/README.md)
