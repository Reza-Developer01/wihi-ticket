"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const pollSystem = async (state, formData) => {
  const rating = formData.get("rating");
  const comment = formData.get("comment");
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;
  const ticket_id = (await cookieStore).get("ticket_id")?.value;

  if (!rating || rating === "0") {
    return { status: false, message: "پر کردن امتیاز اجباری است." };
  }

  const data = await postFetch(
    "ticket-ratings/",
    { rating, comment, ticket: ticket_id },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  if (data) {
    return {
      status: true,
      message: "ثبت نظر با موفقیت انجام شد.",
    };
  }
};

export { pollSystem };
