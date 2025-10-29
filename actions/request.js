"use server";

import { cookies } from "next/headers";

const createRequest = async (state, formData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const issue = formData.get("issue");
  const file = formData.get("file");
  const token = cookies().get("access_token")?.value;

  if (!title || !description || !category || !issue) {
    return {
      status: false,
      message: "پر کردن تمام موارد الزامی است.",
    };
  }

  const body = new FormData();
  body.append("title", title);
  body.append("description", description);
  body.append("category", category);
  body.append("issue", issue);

  if (file && file.size > 0) {
    body.append("file", file);
  }

  const data = await fetch(`http://preview.kft.co.com/ticket/api/tickets/`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body,
  }).then((res) => res.json());

  if (data) {
    return {
      status: true,
      message: "ثبت درخواست با موفقیت انجام شد.",
    };
  } else {
    return {
      status: false,
      message: "خطا در ارسال درخواست.",
    };
  }
};

export { createRequest };
