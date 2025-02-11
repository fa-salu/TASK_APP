import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isUserProtectedRoute = (route: string) => route.startsWith("/task");

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  console.log("to", token);

  if (pathname === "/") {
    if (token) {
      url.pathname = "/task";
    } else {
      url.pathname = "/login";
    }
    return NextResponse.redirect(url);
  }

  if (!token && isUserProtectedRoute(pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    url.pathname = "/task";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except public ones like `/home`
    "/((?!_next|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
