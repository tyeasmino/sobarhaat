<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo notes

## Project intent (do not drift)
- This is **Sobar Haat**, a Social Development Events Platform — community service events, not travel/ticketing. Think winter clothes, blanket/food distribution, flood relief, blood donation camps.
- Required pages: public home (banner, features, 6 recent upcoming events via MongoDB `.limit(6)`, gallery, newsletter), upcoming events, event details + join, login/register; private create/manage/joined events; footer everywhere.
- Auth: email/password + one social provider, BetterAuth + MongoDB adapter + JWT. Private routes must survive reload; profile dropdown holds Create/Manage/Joined + Logout. Password: uppercase, lowercase, min 6 chars.
- Express + MongoDB server: keep creator email on each event, store joins against event + user, and only allow owners to update/delete their own events.
- No Lorem ipsum and no browser default `alert()` — use toasts. Theme toggle must restyle everything through semantic tokens. SPA-safe hosting: no 404 on route reload. Client ≥15 notable commits, server ≥8.

## Setup / verification
- npm only (`package-lock.json`). Scripts are just `dev`, `build`, `start`, `lint`: no test runner, no `typecheck` script, no CI workflows. Verify with `npm run lint` then `npm run build` (the build type-checks). In this Windows PowerShell, `npm.ps1` is blocked by execution policy — use `npm.cmd run lint` / `npm.cmd run build`.
- App code lives under `src/`; `@/*` maps to `src/*`. Entry points are `src/app/page.tsx` and `src/app/layout.tsx`.
- `next-env.d.ts` is generated and gitignored (though `tsconfig.json` includes it); don't hand-edit or try to commit it.

## Next 16 configuration here
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, `reactCompiler`, and Turbopack with a custom `@tailwindcss/turbopack` CSS loader. Tailwind is CSS-first in `src/app/globals.css`; there is no `tailwind.config.*`.
- With `cacheComponents`, dynamic reads (`fetch`, `cookies()`, `headers()`, search params) must be inside `<Suspense>` or cached with `"use cache"`; `runtime` segment exports are unsupported. Errors print fix options and a `/docs/messages/...` link — read that page before patching. `next build --debug-prerender` surfaces all failing routes. Reference: `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md`.
- React Compiler is on: verify with `npm run dev` / `npm run build` instead of adding manual memoization reflexively.
- `next dev` writes its PID/port to `.next/dev/lock`; if a server is already running, reuse it rather than starting another. Browser console errors/warnings are forwarded to the dev terminal.

## UI conventions
- `src/components/ui/` is generated shadcn v4 (`base-mira` style, RSC, Base UI primitives — not Radix) from `components.json`. Add primitives with `npx shadcn add <name>` (local `shadcn` dependency) rather than hand-writing old Radix-style wrappers. Hugeicons is the icon library.
- `cn` comes from the `cn` package (`src/lib/utils.ts` re-exports it; generated components import `"cn"` directly). Don't add clsx/tailwind-merge shims from older shadcn templates.
- Dark mode is a `.dark` class variant. Fonts are loaded in `src/app/layout.tsx`: `Inter` supplies `--font-sans`, Geist Mono supplies `--font-mono`.
