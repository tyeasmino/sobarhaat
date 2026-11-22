import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const authPages = new Set(["/login", "/register"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Logged-in users have no reason to see the auth screens. This is an
  // optimistic check based on the BetterAuth session cookie; the actual
  // session is validated by BetterAuth on the client via `useSession()`.
  if (authPages.has(pathname) && getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
