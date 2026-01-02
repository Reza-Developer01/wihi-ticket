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

const setAuthCookies = async (tokens) => {
  try {
    const cookieStore = await cookies();
    const headerList = await headers();

    const accessPayload = decodeJwt(tokens.access);
    const refreshPayload = decodeJwt(tokens.refresh);

    const now = Math.floor(Date.now() / 1000);

    const accessMaxAge = accessPayload?.exp
      ? accessPayload.exp - now + 60
      : 3600;
    const refreshMaxAge = refreshPayload?.exp
      ? refreshPayload.exp - now
      : 7 * 24 * 3600;

    const isSecure =
      process.env.NODE_ENV === "production" &&
      (process.env.USE_HTTPS === "true" ||
        headerList.get("x-forwarded-proto") === "https");

    const cookieOptions = {
      httpOnly: true,
      path: "/",
      secure: isSecure,
      sameSite: isSecure ? "none" : "lax",
    };

    if (tokens.access) {
      cookieStore.set("access_token", tokens.access, {
        ...cookieOptions,
        maxAge: accessMaxAge,
      });
    }

    if (tokens.refresh) {
      cookieStore.set("refresh_token", tokens.refresh, {
        ...cookieOptions,
        maxAge: refreshMaxAge,
      });
    }

    if (tokens.user?.role) {
      cookieStore.set("role", tokens.user.role, {
        path: "/",
        secure: isSecure,
        sameSite: isSecure ? "none" : "lax",
        maxAge: 7 * 24 * 3600,
      });
    }
  } catch (err) {
    console.error("--- [COOKIE SET ERROR] ---", err.message);
  }
};

const login = async (state, formData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    return { status: "error", message: "پر کردن تمام موارد اجباری است." };
  }

  let data;
  try {
    data = await postFetch("users/login/", { username, password });
  } catch (err) {
    return {
      status: "error",
      message:
        err?.response?.non_field_errors?.[0] || "کاربری با این مشخصات یافت نشد",
    };
  }

  if (data.non_field_errors) {
    return { status: "error", message: data.non_field_errors[0] };
  }

  return { status: "success", ...data };
};

const checkOtp = async (state, formData) => {
  let code = formData.get("code");

  code = code
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

  if (!code) {
    return { status: "error", message: "پر کردن تمام موارد اجباری است." };
  }

  try {
    const data = await postFetch("users/verify-otp/", { code });

    if (data.non_field_errors && data.non_field_errors.length > 0) {
      return { status: "error", message: data.non_field_errors[0] };
    }

    await setAuthCookies(data.tokens);

    const isSecure =
      process.env.NODE_ENV === "production" &&
      (process.env.USE_HTTPS === "true" ||
        headers().get("x-forwarded-proto") === "https");

    const cookieStore = await cookies();
    cookieStore.set("role", data.user.role, {
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
  } catch (err) {
    let message = "خطایی رخ داده";

    try {
      const bodyMatch = err.message.match(/body: (.*)$/);
      if (bodyMatch && bodyMatch[1]) {
        const bodyJson = JSON.parse(bodyMatch[1]);
        if (bodyJson.non_field_errors && bodyJson.non_field_errors.length > 0) {
          message = bodyJson.non_field_errors[0];
        }
      }
    } catch (e) {}

    return { status: "error", message };
  }
};

const refreshToken = async () => {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh_token")?.value;

  if (!refresh) return null;

  try {
    const data = await postFetch("token/refresh/", { refresh });

    if (data.access) {
      return data.access;
    }
  } catch (e) {
    return null;
  }
  return null;
};

const getMe = async () => {
  const cookieStore = await cookies();
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
