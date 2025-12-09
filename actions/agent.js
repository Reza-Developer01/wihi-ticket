"use server";

import { postFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

const createAgent = async (state, formData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const register_date = formData.get("register_date");
  const email = formData.get("email");
  let phone = formData.get("phone");
  let categories = formData.get("category_agent");
  categories = categories ? JSON.parse(categories).map((c) => c.id) : [];
  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");
  const permissions = JSON.parse(formData.get("permissions") || "[]");

  console.log(`permissions : ${permissions}`);

  phone = phone.replace(/\D/g, "");
  if (phone.startsWith("98")) {
    phone = "0" + phone.slice(2);
  }

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (
    !first_name ||
    !last_name ||
    !register_date ||
    !email ||
    !phone ||
    !categories ||
    !username ||
    !password
  ) {
    return {
      status: false,
      message: "پر کردن تمام موارد الزامی است.",
    };
  }

  if (password !== rePassword) {
    return {
      status: false,
      message: "پسورد و تکرار پسورد باهم مقایرت ندارد.",
    };
  }

  const data = await postFetch(
    `users/agents/`,
    {
      first_name,
      last_name,
      register_date,
      email,
      phone,
      categories,
      username,
      password,
      permissions,
    },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  console.log(data);

  if (data) {
    return {
      status: true,
      message: "کارشناس با موفقیت ساخته شد.",
    };
  }
};

const editAgent = async (state, formData) => {
  const id = formData.get("id");
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const register_date = formData.get("register_date");
  const email = formData.get("email");
  let phone = formData.get("phone");
  let categories = formData.get("category_agent");
  categories = categories ? JSON.parse(categories).map((c) => c.id) : [];
  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");
  const permissions = JSON.parse(formData.get("permissions") || "[]");

  phone = phone.replace(/\D/g, "");
  if (phone.startsWith("98")) phone = "0" + phone.slice(2);

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (
    !first_name ||
    !last_name ||
    !register_date ||
    !email ||
    !phone ||
    !categories ||
    !username
  ) {
    return { status: false, message: "پر کردن تمام موارد الزامی است." };
  }

  if (password && password !== rePassword) {
    return { status: false, message: "پسورد و تکرار پسورد باهم مطابقت ندارد." };
  }

  const payload = {
    id,
    first_name,
    last_name,
    register_date,
    email,
    phone,
    categories,
    username,
    permissions,
  };

  console.log("PAYLOAD : ", payload);

  if (password) payload.password = password;

  const data = await fetch(
    `http://preview.kft.co.com/ticket/api/users/agents/${id}/`,
    {
      method: "PATCH",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  ).then((res) => res.json());

  console.log("DATA => ", data);

  if (data) {
    return { status: true, message: "کارشناس با موفقیت ویرایش شد." };
  } else {
    return { status: false, message: "ویرایش کارشناس با خطا مواجه شد." };
  }
};

const createTicket = async (state, formData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const category_agent = formData.get("category_agent");
  const service = formData.get("service");
  const issue = formData.get("issue");
  const phone_number = formData.get("phone_number");
  const file = formData.get("file");

  const token = cookies().get("access_token")?.value;

  // ✅ ولیدیشن لازم طبق API
  if (!title || !description || !category_agent || !issue || !phone_number) {
    return {
      status: false,
      message: "پر کردن تمام موارد الزامی است.",
    };
  }

  // ✅ ساخت FormData
  const body = new FormData();
  body.append("title", title);
  body.append("description", description);
  body.append("category_agent", category_agent);
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

const createCategoryAgent = async (state, formData) => {
  const name = formData.get("name");

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!name || name === "") {
    return {
      status: false,
      message: "پر کردن عنوان دسته بندی اجباری است.",
    };
  }

  const data = await postFetch(
    `users/agents-categories/`,
    {
      name,
    },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  console.log(data);

  if (data) {
    return {
      status: true,
      message: "دسته بندی کارشناس با موفقیت ساخته شد.",
    };
  }
};

const deleteCategoryAgent = async (state, formData) => {
  const id = formData.get("id");

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  const res = await fetch(
    `http://preview.kft.co.com/ticket/api/users/agents-categories/${id}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
    }
  );

  if (res.ok) {
    return {
      status: true,
      message: "دسته‌بندی کارشناس با موفقیت حذف شد.",
    };
  } else {
    return {
      status: false,
      message: "حذف دسته‌بندی موفقیت‌آمیز نبود.",
    };
  }
};

const assignAgent = async (comment, ticket_number, assigned_to_id) => {
  console.log({ ticket_number, assigned_to_id });
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  const data = await postFetch(
    `tickets/${ticket_number}/assign/`,
    { comment, assigned_to_id },
    {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  );

  console.log(`data : ${data}`);

  if (data) {
    return {
      status: true,
      message: data.message,
    };
  } else {
    return {
      status: false,
      message: "با خطا مواجه شد",
    };
  }
};

const changeAgentStatus = async (id, is_active) => {
  console.log({ id, is_active });
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  const res = await fetch(
    `http://preview.kft.co.com/ticket/api/users/agents/${id}/`,
    {
      method: "PATCH",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_active }),
    }
  );

  const data = await res.json();

  console.log(data);

  return {
    status: res.ok,
    message: res.ok
      ? "وضعیت کارشناس با موفقیت تغییر کرد."
      : data?.message || "تغییر وضعیت ناموفق بود.",
  };
};

const getAgentChangeLogs = async (id) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  try {
    const res = await fetch(
      `http://preview.kft.co.com/ticket/api/users/agents/${id}/change-logs/`,
      {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
        cache: "no-store", // 📌 چون لاگ‌ها باید همیشه آپدیت شده باشند
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        status: false,
        message: data?.message || "دریافت تاریخچه تغییرات با خطا مواجه شد.",
      };
    }

    return {
      status: true,
      data,
    };
  } catch (err) {
    console.log("ERROR change logs:", err);
    return {
      status: false,
      message: "مشکلی در ارتباط با سرور به وجود آمد.",
    };
  }
};

export {
  createAgent,
  createTicket,
  createCategoryAgent,
  deleteCategoryAgent,
  assignAgent,
  editAgent,
  changeAgentStatus,
  getAgentChangeLogs,
};
