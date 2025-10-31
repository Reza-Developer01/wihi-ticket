import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("refresh_token");
  const pathname = req.nextUrl.pathname;

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|images).*)"],
};
