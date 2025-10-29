"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const pollSystem = async (state, formData) => {
  const rating = formData.get("rating");
  const comment = formData.get("comment");
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!rating || !comment) {
    return { status: false, message: "لطفاً امتیاز خود را انتخاب کنید" };
  }

  const data = await postFetch("ticket-ratings/", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  console.log(data);
};

export { pollSystem };
