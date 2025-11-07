import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("refresh_token")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/expert") && role !== "expert" && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/customer") && role !== "customer") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|images).*)"],
};
