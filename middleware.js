import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("refresh_token")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    return NextResponse.next();
  }

  if (role === "admin" && pathname === "/") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (role === "admin") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/agent")) {
    if (role !== "agent") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (
    pathname.startsWith("/main") ||
    pathname.startsWith("/call") ||
    pathname.startsWith("/requests") ||
    pathname.startsWith("/faqs")
  ) {
    if (role !== "customer") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|images).*)"],
};
