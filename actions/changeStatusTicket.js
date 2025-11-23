"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const changeStatus = async (ticket_number, status) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  const data = await postFetch(
    `tickets/${ticket_number}/change_status/`,
    { ticket_number, status },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  if (data.detail) {
    return {
      status: true,
      message: data.message,
    };
  } else {
    return {
      status: false,
      message: data.message,
    };
  }
};

export default changeStatus;
