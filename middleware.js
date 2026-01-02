import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const role = req.cookies.get("role")?.value;

  let response = NextResponse.next();
  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(
        "http://preview.kft.co.com/ticket/api/token/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (refreshRes.ok) {
        const data = await refreshRes.json();

        response.cookies.set("access_token", data.access, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 3600,
        });
      }
    } catch (error) {
      console.error("Middleware Silent Refresh Error:", error);
    }
  }

  if (!refreshToken) {
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    return response;
  }

  if (role === "admin") {
    if (pathname === "/")
      return NextResponse.redirect(new URL("/admin", req.url));
    return response;
  }

  if (role === "agent") {
    if (!pathname.startsWith("/agent"))
      return NextResponse.redirect(new URL("/agent", req.url));
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|images).*)"],
};
