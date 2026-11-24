import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
// The auth API lives in this app at /api/auth (see src/app/api/auth/[...all]/route.ts),
// so the client can use the current origin. No public env var is needed here.
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

/**
 * Fresh short-lived JWT from BetterAuth's `jwt()` plugin. The browser sends the
 * session cookie to /api/auth/token automatically; the returned token is then
 * forwarded to Express as `Authorization: Bearer <token>`.
 *
 * Sir-er pattern:
 *   const jwtToken = await getAuthToken();
 *   const token = jwtToken?.token;
 */
export async function getAuthToken(): Promise<string | undefined> {
  try {
    const response = await fetch("/api/auth/token", {
      credentials: "include",
      cache: "no-store",
    });
    if (!response.ok) return undefined;

    const jwtToken = (await response.json().catch(() => null)) as {
      token?: string;
    } | null;
    return jwtToken?.token;
  } catch {
    // Signed out, offline, or auth API unreachable.
    return undefined;
  }
}
