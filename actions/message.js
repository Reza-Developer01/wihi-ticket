"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const sendMessage = async (state, formData) => {
  const message = formData.get("message");
  const ticket = formData.get("ticket");
  const currentPath = formData.get("path");
  const file = formData.get("file");

  const token = cookies().get("access_token")?.value;

  if (!message) {
    return {
      status: false,
      message: "وارد کردن متن پیام الزامی است.",
    };
  }

  const body = new FormData();
  if (message) body.append("message", message);
  if (ticket) body.append("ticket", ticket);
  if (file && file.size > 0) body.append("file", file);

  try {
    const res = await fetch(
      `http://preview.kft.co.com/ticket/api/tickets/${ticket}/messages/`,
      {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body,
      }
    );

    const data = await res.json();

    if (data) {
      revalidatePath(currentPath);
      return {
        status: true,
        message: "پیام با موفقیت ارسال شد.",
      };
    } else {
      return {
        status: false,
        message: "خطا در ارسال پیام.",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "خطا در ارسال پیام: " + error.message,
    };
  }
};

export { sendMessage };
