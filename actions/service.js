"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const BASE_URL = "http://preview.kft.co.com/ticket/api";

const createService = async (formData) => {
  const name = formData.get("name");
  const id = formData.get("id");

  console.log(`NAME => ${name}, ID => ${id}`);

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

const deleteService = async (id) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    const res = await fetch(`${BASE_URL}/service-tickets/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      return {
        status: false,
        message: errorBody?.message || "خطا در حذف سرویس",
      };
    }

    return { status: true, message: "سرویس با موفقیت حذف شد." };
  } catch (err) {
    console.error(err);
    return { status: false, message: "خطا در اتصال به سرور." };
  }
};

export { createService, deleteService };
