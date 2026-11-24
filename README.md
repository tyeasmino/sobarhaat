# Sobar Haat

**Community service, closer to home.** Sobar Haat is a community-driven social development events platform where people can create, join and track local service drives — winter clothes distribution, blanket donations, food support, flood relief, blood donation camps and more.

**Live site:** https://sobar-haat.vercel.app _(replace with the deployed Vercel URL after release)_

## Features

- **Discover local drives** — browse upcoming community events with thumbnails, type, location, date and details.
- **Recent events on the home page** — the six newest upcoming events are loaded from MongoDB with `.limit(6)` and sorted by date.
- **Create & manage events** — logged-in users can create events with validation, then edit or delete only their own events.
- **Join events** — authenticated users can join a drive; joined events are stored against both the user and the event and shown sorted by date.
- **Email/password + social login** — registration and login with validated passwords, plus a Google sign-in option.
- **Protected routes** — create, manage and joined-events pages require a valid JWT; refreshing a private route keeps the user signed in.
- **Light/dark theme toggle** — a single switch restyles the whole interface using semantic CSS tokens.
- **Responsive design** — consistent cards, spacing and heading styles across mobile, tablet and desktop.
- **Friendly feedback** — toasts for auth and event actions instead of browser default alerts.

## Tech stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS v4 with shadcn UI primitives
- Express.js REST API with MongoDB
- BetterAuth with MongoDB adapter and JWT validation

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment

Create `.env.local` (or `.env` for local development) with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<long-random-secret>
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

All `.env*` files are gitignored. `NEXT_PUBLIC_API_URL` is baked into the
browser bundle at build time, so set it **before** the production build.

## Deployment

Deploy this app on Vercel and the Express API on Render:

1. Vercel → Project Settings → Environment Variables: set `NEXT_PUBLIC_API_URL`
   to the Render service URL, `BETTER_AUTH_URL` to the deployed Vercel origin,
   plus `BETTER_AUTH_SECRET`, `MONGODB_URI`, `GOOGLE_CLIENT_ID` and
   `GOOGLE_CLIENT_SECRET`. Add the Vercel origin to the Google OAuth redirect
   URLs.
2. Render → Environment: set `MONGODB_URI`, `BETTER_AUTH_URL` to the **same**
   Vercel origin (it is the JWT issuer/audience), and `CORS_ORIGINS` to that
   origin. Start command: `npm start`.
3. Next.js handles route reloads, so no route returns 404. The live URL above
   is updated once the production deploy is live.

See the [server README](../sobarhat-server/README.md) for the full API list.
