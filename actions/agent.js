"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const createAgent = async (state, formData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const register_date = formData.get("register_date");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const category = formData.get("category");
  const user_name = formData.get("user_name");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (
    (!first_name ||
      !last_name ||
      !register_date ||
      !email ||
      !phone ||
      !category ||
      !user_name,
    !password)
  ) {
    return {
      status: false,
      message: "پر کردن تمام موارد الزامی است.",
    };
  }

  if (password !== rePassword) {
    return {
      status: false,
      message: "پسورد و تکرار پسورد باهم مقایرت ندارد.",
    };
  }

  const data = await postFetch(
    `users/agents/`,
    {
      first_name,
      last_name,
      register_date,
      email,
      phone,
      category,
      user_name,
      password,
    },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  if (data) {
    console.log(data);
    return {
      status: true,
      message: "کارشناس با موفقیت ساخته شد.",
    };
  }
};

export { createAgent };
