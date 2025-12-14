"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const pollSystem = async (state, formData) => {
  const rating = formData.get("rating");
  const comment = formData.get("comment");
  const ticket = formData.get("ticket");
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!rating || rating === "0") {
    return { status: false, message: "پر کردن امتیاز اجباری است." };
  }

  if (!comment || comment === "") {
    return { status: false, message: "پر کردن کامنت اجباری است." };
  }

  try {
    const data = await postFetch(
      "ticket-ratings/",
      { rating, comment, ticket },
      {
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    );

    return {
      status: true,
      message: "ثبت نظر با موفقیت انجام شد.",
      data,
    };
  } catch (err) {
    console.error("pollSystem error:", err);

    const bodyMatch = err.message.match(/- body: (.+)$/);
    let bodyMessage = bodyMatch ? bodyMatch[1] : "خطای ناشناخته";

    bodyMessage = bodyMessage.replace(/^\[["']?/, "").replace(/["']?\]$/, "");

    return {
      status: false,
      message: bodyMessage,
    };
  }
};

export { pollSystem };
