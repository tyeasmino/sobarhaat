import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
// The auth API lives in this app at /api/auth (see src/app/api/auth/[...all]/route.ts),
// so the client can use the current origin. No public env var is needed here.
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});
