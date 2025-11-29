import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("refresh_token")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  // --- 1. NOT LOGGED IN ---
  if (!token) {
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    return NextResponse.next();
  }

  // --- 2. ADMIN RULES ---
  if (role === "admin") {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // --- 3. AGENT RULES (only /agent allowed) ---
  if (role === "agent") {
    if (!pathname.startsWith("/agent")) {
      return NextResponse.redirect(new URL("/agent", req.url));
    }
    return NextResponse.next();
  }

  // --- 4. CUSTOMER RULES ---
  if (pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
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
