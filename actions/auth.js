"use server";

import { cookies, headers } from "next/headers";
import { getFetch, postFetch } from "@/utils/fetch";

const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64").toString());
  } catch {
    return null;
  }
};

const setAuthCookies = (tokens) => {
  const cookieStore = cookies();
  console.log(tokens);

  const accessPayload = decodeJwt(tokens.access);
  const refreshPayload = decodeJwt(tokens.refresh);

  const now = Math.floor(Date.now() / 1000);
  const accessMaxAge = accessPayload?.exp ? accessPayload.exp - now : 3600;
  const refreshMaxAge = refreshPayload?.exp
    ? refreshPayload.exp - now
    : 7 * 24 * 3600;

  // بررسی اینکه سرور HTTPS واقعی دارد یا نه
  const isSecure =
    process.env.NODE_ENV === "production" &&
    (process.env.USE_HTTPS === "true" ||
      headers().get("x-forwarded-proto") === "https");

  const cookieOptions = {
    httpOnly: true,
    path: "/",
    secure: isSecure,
    sameSite: isSecure ? "none" : "lax",
  };

  // Access Token
  cookieStore.set("access_token", tokens.access, {
    ...cookieOptions,
    maxAge: accessMaxAge,
  });

  // Refresh Token
  cookieStore.set("refresh_token", tokens.refresh, {
    ...cookieOptions,
    maxAge: refreshMaxAge,
  });

  // Role
  cookieStore.set("role", tokens.user?.role || "", {
    path: "/",
    secure: isSecure,
    sameSite: isSecure ? "none" : "lax",
    maxAge: 3600,
  });
};

const login = async (state, formData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    return { status: "error", message: "پر کردن تمام موارد اجباری است." };
  }

  const data = await postFetch("users/login/", { username, password });

  if (data.non_field_errors) {
    return { status: "error", message: data.non_field_errors };
  }

  return data;
};

const checkOtp = async (state, formData) => {
  let code = formData.get("code");

  code = code
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

  if (!code) {
    return { status: "error", message: "پر کردن تمام موارد اجباری است." };
  }

  const data = await postFetch("users/verify-otp/", { code });

  if (data.non_field_errors) {
    return { status: "error", message: data.non_field_errors };
  }

  setAuthCookies(data.tokens);

  // استفاده از همان منطق isSecure برای role
  const isSecure =
    process.env.NODE_ENV === "production" &&
    (process.env.USE_HTTPS === "true" ||
      headers().get("x-forwarded-proto") === "https");

  cookies().set("role", data.user.role, {
    path: "/",
    secure: isSecure,
    sameSite: isSecure ? "none" : "lax",
    maxAge: 3600,
  });

  return {
    status: "success",
    message: data.message,
    user: data.user,
  };
};

const refreshToken = async () => {
  const cookieStore = cookies();
  let refresh = cookieStore.get("refresh_token")?.value;
  console.log(refresh);

  if (!refresh) {
    const raw = headers().get("cookie") || "";
    refresh = raw
      .split("; ")
      .find((c) => c.startsWith("refresh_token="))
      ?.split("=")[1];
  }

  if (!refresh) return null;

  const data = await postFetch("token/refresh/", { refresh });
  console.log(data);

  if (data.access) {
    setAuthCookies({
      access: data.access,
      refresh,
    });

    return data.access;
  }

  return null;
};

const getMe = async () => {
  const cookieStore = cookies();
  let token = cookieStore.get("access_token")?.value;

  if (!token) {
    token = await refreshToken();
    if (!token) return { authenticated: false, user: null };
  }

  const data = await getFetch("users/me/", {
    Authorization: `Bearer ${token}`,
  });

  if (data.code === "token_not_valid") {
    token = await refreshToken();
    if (!token) return { authenticated: false, user: null };

    const retry = await getFetch("users/me/", {
      Authorization: `Bearer ${token}`,
    });

    if (retry?.authenticated) {
      return { authenticated: true, user: retry.user };
    }

    return { authenticated: false, user: null };
  }

  if (data?.authenticated) {
    return { authenticated: true, user: data.user };
  }

  return { authenticated: false, user: null };
};

export { login, checkOtp, getMe };
