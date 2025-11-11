"use server";

import { cookies } from "next/headers";

const createRealUser = async (state, formData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const register_date = formData.get("register_date");
  const email = formData.get("email");
  let phone = formData.get("phone");
  const address = formData.get("address");
  const floor = formData.get("floor");
  const unit = formData.get("unit");
  const zip_code = formData.get("zip_code");
  const file = formData.get("file");
  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");
  const user_type = formData.get("user_type");
  const plan = formData.get("plan");

  console.log(user_type);

  // اصلاح شماره موبایل
  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("98")) {
    phone = "0" + phone.slice(2);
  }

  if (!first_name || first_name.trim() === "")
    return { status: false, message: "نام نمی‌تواند خالی باشد." };

  if (!last_name || last_name.trim() === "")
    return { status: false, message: "نام خانوادگی نمی‌تواند خالی باشد." };

  if (!register_date)
    return { status: false, message: "تاریخ ثبت‌نام الزامی است." };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: false, message: "ایمیل معتبر نیست." };

  if (!phone || !/^09\d{9}$/.test(phone))
    return { status: false, message: "شماره موبایل معتبر نیست." };

  if (!address || address.trim().length < 3)
    return { status: false, message: "آدرس باید حداقل ۳ کاراکتر باشد." };

  if (!floor || isNaN(floor))
    return { status: false, message: "شماره طبقه معتبر نیست." };

  if (!unit || isNaN(unit))
    return { status: false, message: "شماره واحد معتبر نیست." };

  if (!zip_code || !/^\d{10}$/.test(zip_code))
    return { status: false, message: "کد پستی باید ۱۰ رقم باشد." };

  //   if (!file || file.size === 0)
  //     return { status: false, message: "انتخاب فایل قرارداد الزامی است." };

  if (file.size > 50 * 1024 * 1024)
    return {
      status: false,
      message: "حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.",
    };

  if (!username || username.trim().length < 3)
    return { status: false, message: "نام کاربری باید حداقل ۳ کاراکتر باشد." };

  if (!password || password.length < 6)
    return { status: false, message: "رمز عبور باید حداقل ۶ کاراکتر باشد." };

  if (password !== rePassword)
    return { status: false, message: "تکرار رمز عبور با رمز اصلی یکسان نیست." };

  const body = new FormData();
  body.append("first_name", first_name);
  body.append("last_name", last_name);
  body.append("register_date", register_date);
  body.append("email", email);
  body.append("phone", phone);
  body.append("address", address);
  body.append("floor", floor);
  body.append("unit", unit);
  body.append("zip_code", zip_code);
  body.append("username", username);
  body.append("password", password);
  body.append("file", file);
  body.append("user_type", user_type);
  body.append("plan", plan);

  const token = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      "http://preview.kft.co.com/ticket/api/users/customers/",
      {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body,
      }
    );

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return {
        status: false,
        message: data?.message || "خطا در ایجاد کاربر.",
      };
    }

    return {
      status: true,
      message: "کاربر با موفقیت ایجاد شد.",
    };
  } catch (error) {
    return {
      status: false,
      message: "خطا در ارسال اطلاعات: " + error.message,
    };
  }
};

const createLegalUser = async (state, formData) => {
  const company_name = formData.get("company_name");
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const register_date = formData.get("register_date");
  const registration_number = formData.get("registration_number");
  const national_id = formData.get("national_id");
  const economic_code = formData.get("economic_code");

  const email = formData.get("email");
  let phone = formData.get("phone");
  const address = formData.get("address");
  const floor = formData.get("floor");
  const unit = formData.get("unit");
  const postal_code = formData.get("postal_code");
  const file = formData.get("file");

  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");

  const user_type = formData.get("user_type");
  const plan = formData.get("plan");

  // اصلاح شماره موبایل
  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("98")) phone = "0" + phone.slice(2);

  // -------------------------------
  // ولیدیشن
  // -------------------------------
  if (!company_name || company_name.trim() === "")
    return { status: false, message: "نام شرکت الزامی است." };

  if (!first_name || first_name.trim() === "")
    return { status: false, message: "نام مدیرعامل نمی‌تواند خالی باشد." };

  if (!last_name || last_name.trim() === "")
    return {
      status: false,
      message: "نام خانوادگی مدیرعامل نمی‌تواند خالی باشد.",
    };

  // if (!registration_number)
  //   return { status: false, message: "تاریخ ثبت شرکت الزامی است." };

  // if (!national_id || national_id.length !== 11)
  //   return { status: false, message: "شناسه ملی باید ۱۱ رقم باشد." };

  // if (!economic_code || economic_code.length < 5)
  //   return { status: false, message: "کد اقتصادی معتبر نیست." };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: false, message: "ایمیل معتبر نیست." };

  if (!phone || !/^09\d{9}$/.test(phone))
    return { status: false, message: "شماره موبایل معتبر نیست." };

  if (!address || address.trim().length < 3)
    return { status: false, message: "آدرس باید حداقل ۳ کاراکتر باشد." };

  if (!floor || isNaN(floor))
    return { status: false, message: "شماره طبقه معتبر نیست." };

  if (!unit || isNaN(unit))
    return { status: false, message: "شماره واحد معتبر نیست." };

  if (!postal_code || !/^\d{10}$/.test(postal_code))
    return { status: false, message: "کد پستی باید ۱۰ رقم باشد." };

  if (file?.size > 50 * 1024 * 1024)
    return {
      status: false,
      message: "حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.",
    };

  if (!username || username.trim().length < 3)
    return { status: false, message: "نام کاربری باید حداقل ۳ کاراکتر باشد." };

  if (!password || password.length < 6)
    return { status: false, message: "رمز عبور باید حداقل ۶ کاراکتر باشد." };

  if (password !== rePassword)
    return { status: false, message: "تکرار رمز عبور با رمز اصلی یکسان نیست." };

  // -------------------------------
  // ساخت FormData
  // -------------------------------
  const body = new FormData();

  body.append("company_name", company_name);
  body.append("first_name", first_name);
  body.append("last_name", last_name);
  body.append("register_date", register_date);
  body.append("registration_number", registration_number);
  body.append("national_id", national_id);
  body.append("economic_code", economic_code);

  body.append("email", email);
  body.append("phone", phone);
  body.append("address", address);
  body.append("floor", floor);
  body.append("unit", unit);
  body.append("postal_code", postal_code);
  body.append("username", username);
  body.append("password", password);
  body.append("file", file);

  body.append("user_type", user_type);
  body.append("plan", plan);

  const token = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      "http://preview.kft.co.com/ticket/api/users/customers/",
      {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body,
      }
    );

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return {
        status: false,
        message: data?.message || "خطا در ایجاد کاربر حقوقی.",
      };
    }

    return {
      status: true,
      message: "کاربر حقوقی با موفقیت ایجاد شد.",
    };
  } catch (error) {
    return {
      status: false,
      message: "خطا در ارسال اطلاعات: " + error.message,
    };
  }
};

export { createRealUser, createLegalUser };
