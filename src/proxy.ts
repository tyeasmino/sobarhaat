import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const privatePages = ["/create-event", "/manage-events", "/joined-events"];

function isPrivate(pathname: string) {
  return privatePages.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Do not call BetterAuth/MongoDB here. The proxy runs before the app and a
  // session lookup in this layer can fail on Vercel, turning /login and private
  // routes into a 500. A cookie check is enough for the redirect; the real
  // session check happens in /api/auth and the Express API checks the JWT.
  if (isPrivate(pathname) && !getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-event",
    "/manage-events",
    "/manage-events/:path*",
    "/joined-events",
  ],
};
