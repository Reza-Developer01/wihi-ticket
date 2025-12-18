"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const createService = async (formData) => {
  const name = formData.get("name");

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!name || name.trim() === "") {
    return {
      status: false,
      message: "پر کردن نام سرویس الزامی است.",
    };
  }

  try {
    const data = await postFetch(
      "service-tickets/",
      { name },
      {
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    );

    console.log(data);

    if (data) {
      return {
        status: true,
        message: "سرویس با موفقیت ساخته شد.",
      };
    } else {
      return {
        status: false,
        message: "خطا در ایجاد سرویس. لطفاً دوباره تلاش کنید.",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: false,
      message: "خطا در اتصال به سرور.",
    };
  }
};

export { createService };
