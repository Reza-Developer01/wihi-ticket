"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const requestCall = async (state, formData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const service = formData.get("service");
  const issue = formData.get("issue");
  const phone_number = formData.get("phone_number");
  const file = formData.get("file");

  const token = cookies().get("access_token")?.value;

  // ✅ ولیدیشن لازم طبق API
  if (!title || !description || !category || !issue || !phone_number) {
    return {
      status: false,
      message: "پر کردن تمام موارد الزامی است.",
    };
  }

  // ✅ ساخت FormData
  const body = new FormData();
  body.append("title", title);
  body.append("description", description);
  body.append("category", category);
  body.append("issue", issue);
  body.append("phone_number", phone_number);

  // service nullable هست
  if (service) {
    body.append("service", service);
  }

  // فایل اختیاری
  if (file && file.size > 0) {
    body.append("file", file);
  }

  // ✅ ارسال به API واقعی
  const res = await fetch(
    `http://preview.kft.co.com/ticket/api/callrequests/`,
    {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body,
    }
  );

  const data = await res.json();

  cookies().set("call_id", data.call_request_number, {
    httpOnly: false,
    path: "/",
  });
  // redirect("/successfully-call");

  if (!res.ok) {
    return {
      status: false,
      message: data?.message ?? "خطا در ارسال درخواست.",
    };
  }

  return {
    status: true,
    message: "درخواست تماس با موفقیت ثبت شد.",
    data,
  };
};

const changeStatus = async (state, formData) => {
  const comment = formData.get("comment");
  const call_request_number = formData.get("call_request_number");
  const status = formData.get("status");

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  console.log({ comment, call_request_number, status });

  if (!comment) {
    return {
      status: false,
      message: "پر کردن تمام موارد الزامی است.",
    };
  }

  const data = await postFetch(
    `callrequests/${call_request_number}/change_status/`,
    {
      comment,
      call_request_number,
      status,
    },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  console.log(data);
  return {
    status: false,
    message: data.detail,
  };
};

const guidedStatus = async (state, formData) => {
  const assigned_to_id = formData.get("assigned_to_id");
  const call_request_number = formData.get("call_request_number");
  const status = formData.get("status");

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  console.log({ assigned_to_id, call_request_number, status });

  const data = await postFetch(
    `callrequests/${call_request_number}/change_status/`,
    {
      assigned_to_id,
      call_request_number,
      status,
    },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  console.log(data);
  return {
    status: false,
    message: data.detail,
  };
};

export { requestCall, changeStatus, guidedStatus };
