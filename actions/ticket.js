"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const closeTicket = async (state, formData) => {
  const ticketNumber = formData.get("ticket_number");
  const comment = formData.get("comment");

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!comment) {
    return {
      status: false,
      message: "وارد کردن دلیل ، اجباری است",
    };
  }

  const data = await postFetch(
    `tickets/${ticketNumber}/close_ticket/`,
    {
      comment,
      ticket_number: ticketNumber,
    },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  if (data) {
    console.log(data);
    return {
      status: true,
      message: data.detail,
    };
  }
};

export { closeTicket };
