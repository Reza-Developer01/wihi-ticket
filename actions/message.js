"use server";

import { postFetch } from "@/utils/fetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const sendMessage = async (state, formAction) => {
  const message = formAction.get("message");
  const ticket = formAction.get("ticket");
  const currentPath = formAction.get("path");

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  console.log({ message, ticket });

  if (!message) {
    return { status: false, message: "وارد کردن متن پیام ، اجباری است." };
  }

  const data = await postFetch(
    "ticket-messages/",
    { message, ticket },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  if (data) {
    revalidatePath(currentPath);
    return {
      status: true,
      message: "پیام با موفقیت ارسال شد.",
    };
  }
};

export { sendMessage };
