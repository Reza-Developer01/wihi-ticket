"use server";

import { cookies } from "next/headers";
import { postFetch } from "@/utils/fetch";

const login = async (state, formData) => {
  const phone = formData.get("phone");
  const password = formData.get("password");

  if (phone === "" || password === "") {
    return {
      status: "error",
      message: "پر کردن تمام موارد ، اجباری است.",
    };
  }

  const data = await postFetch("users/login/", { phone, password });

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

  return {
    status: "success",
    message: data.message,
    user: data.user,
  };
};

export { login, checkOtp };
