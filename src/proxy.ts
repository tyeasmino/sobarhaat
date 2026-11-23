import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth";

const authPages = new Set(["/login", "/register"]);
const privatePages = ["/create-event", "/manage-events", "/joined-events"];

function isPrivate(pathname: string) {
  return privatePages.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const needsAuth = isPrivate(pathname);
  const isAuthPage = authPages.has(pathname);

  if (!needsAuth && !isAuthPage) return NextResponse.next();

  // Fast path: no cookie at all means there is no session to look up.
  if (!getSessionCookie(request)) {
    if (needsAuth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Next.js 16 Proxy uses the Node.js runtime, so the MongoDB-backed
  // BetterAuth adapter works here. Sir-er pattern: getSession(headers).
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user;

  if (needsAuth && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged-in users have no reason to see the auth screens.
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/create-event",
    "/manage-events",
    "/manage-events/:path*",
    "/joined-events",
  ],
};
