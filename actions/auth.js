"use server";

import { cookies } from "next/headers";
import { getFetch, postFetch } from "@/utils/fetch";

const login = async (state, formData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === "" || password === "") {
    return {
      status: "error",
      message: "پر کردن تمام موارد ، اجباری است.",
    };
  }

  const data = await postFetch("users/login/", { username, password });

  console.log(data);

  if (data.non_field_errors) {
    return {
      status: "error",
      message: data.non_field_errors,
    };
  } else {
    return data;
  }
};

const checkOtp = async (state, formData) => {
  let code = formData.get("code");
  code = code
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

  if (code === "") {
    return {
      status: "error",
      message: "پر کردن تمام موارد ، اجباری است.",
    };
  }

  const data = await postFetch("users/verify-otp/", { code });

  console.log(data);

  if (data.non_field_errors) {
    return {
      status: "error",
      message: data.non_field_errors,
    };
  }

  const cookieStore = cookies();
  cookieStore.set("access_token", data.tokens.access, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });

  cookieStore.set("refresh_token", data.tokens.refresh, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("role", data.user.role, {
    path: "/",
    maxAge: 60 * 60,
  });

  return {
    status: "success",
    message: data.message,
    user: data.user,
  };
};

const getMe = async () => {
  const cookieStore = cookies();
  let token = cookieStore.get("access_token")?.value;

  if (!token) {
    token = await refreshToken();
    if (!token) {
      return { authenticated: false, user: null };
    }
  }

  const data = await getFetch("users/me/", {
    Authorization: `Bearer ${token}`,
  });

  if (data.code === "token_not_valid") {
    token = await refreshToken();

    if (!token) {
      return { authenticated: false, user: null };
    }

    // دوباره درخواست getMe
    const retryData = await getFetch("users/me/", {
      Authorization: `Bearer ${token}`,
    });

    if (retryData.authenticated) {
      return { authenticated: true, user: retryData.user };
    }

    return { authenticated: false, user: null };
  }

  if (data.authenticated) {
    return { authenticated: true, user: data.user };
  }

  return { authenticated: false, user: null };
};

const refreshToken = async () => {
  const cookieStore = cookies();
  const refresh = cookieStore.get("refresh_token")?.value;

  if (!refresh) return null;

  const data = await postFetch("users/refresh/", { refresh });

  if (data.access) {
    // ست کردن access جدید
    cookieStore.set("access_token", data.access, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });
    return data.access;
  }

  return null;
};

export { login, checkOtp, getMe };
