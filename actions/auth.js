"use server";

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

  if (data.non_field_errors) {
    return {
      status: "error",
      message: data.non_field_errors,
    };
  } else {
    return data;
  }
};

export { login };
