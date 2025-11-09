"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const createAgent = async (state, formData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const register_date = formData.get("register_date");
  const email = formData.get("email");
  let phone = formData.get("phone");
  const category = formData.get("category");
  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");

  phone = phone.replace(/\D/g, "");
  if (phone.startsWith("98")) {
    phone = "0" + phone.slice(2);
  }

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (
    !first_name ||
    !last_name ||
    !register_date ||
    !email ||
    !phone ||
    !category ||
    !username ||
    !password
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
      username,
      password,
    },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  console.log(data);

  if (data) {
    return {
      status: true,
      message: "کارشناس با موفقیت ساخته شد.",
    };
  }
};

export { createAgent };
