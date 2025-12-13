"use server";

import { toGregorian } from "jalaali-js";
import { cookies } from "next/headers";

const createRealUser = async (state, formData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  let phone = formData.get("phone");

  // **توجه**: در فرانت شما فیلد کدپستی اسمش "zip_code" هست — همین رو می‌خونیم
  const zip_code = formData.get("zip_code");
  // ولی داخل real_user API اسمش postal_code ست، پس موقع JSON کردن تبدیل می‌کنیم.
  const address = formData.get("address");
  const floor = formData.get("floor");
  const unit = formData.get("unit");

  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");
  const plan = formData.get("plan");
  const user_type = formData.get("user_type");
  const register_date = formData.get("register_date");

  // اصلاح شماره موبایل +98 → 09
  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("98")) phone = "0" + phone.slice(2);

  // ساختار نهایی real_user که قرار است به API برود
  const realUserObj = {
    address,
    floor,
    unit,
    postal_code: zip_code ?? "", // از zip_code فرانت استفاده می‌کنیم و اسمش را به postal_code تغییر می‌دهیم
  };

  // 🔥 لاگ کامل ورودی‌ها و ساختار نهایی real_user (برای دیباگ)
  console.log("🔵 createRealUser - collected values:");
  console.log({
    first_name,
    last_name,
    email,
    phone,
    username,
    password: password ? "*****" : null, // از لاگ کردن پسورد خام جلوگیری جزئی
    rePassword: rePassword ? "*****" : null,
    plan,
    user_type,
    real_user: realUserObj,
  });
  console.log("===================================");

  // -------------------------
  //   Validation
  // -------------------------
  if (!first_name || first_name.trim() === "")
    return { status: false, message: "نام نمی‌تواند خالی باشد." };

  if (!last_name || last_name.trim() === "")
    return { status: false, message: "نام خانوادگی نمی‌تواند خالی باشد." };

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

  if (!realUserObj.postal_code || !/^\d{10}$/.test(realUserObj.postal_code))
    return { status: false, message: "کد پستی باید ۱۰ رقم باشد." };

  if (!username || username.trim().length < 3)
    return { status: false, message: "نام کاربری باید حداقل ۳ کاراکتر باشد." };

  if (!password || password.length < 6)
    return { status: false, message: "رمز عبور باید حداقل ۶ کاراکتر باشد." };

  if (password !== rePassword)
    return { status: false, message: "تکرار رمز عبور با رمز اصلی یکسان نیست." };

  // ----------------------------
  //   ساختار FormData برای API
  //   <-- **نکته مهم**: دیگر address/floor/unit/postal_code را به‌صورت top-level append نمی‌کنیم
  // ----------------------------

  const body = new FormData();

  body.append("username", username);
  body.append("password", password);
  body.append("email", email);
  body.append("phone", phone);
  body.append("first_name", first_name);
  body.append("last_name", last_name);
  body.append("user_type", "real");
  body.append("plan", plan);
  body.append("register_date", register_date);

  // 🔥 فیلدهای real_user را تک‌به‌تک append می‌کنیم
  body.append("real_user.address", realUserObj.address);
  body.append("real_user.floor", realUserObj.floor);
  body.append("real_user.unit", realUserObj.unit);
  body.append("real_user.postal_code", realUserObj.postal_code);

  const file = formData.get("file");
  if (file) body.append("contract_file", file);

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
    console.log("🔵 API Response:", data);

    if (!res.ok)
      return {
        status: false,
        message: data?.message || "خطا در ایجاد کاربر.",
      };

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
  const legal_user = formData.get("legal_user");

  // اصلاح شماره موبایل
  phone = phone?.replace(/\D/g, "");

  console.log(`legal_user : ${legal_user}`);

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

  body.append("username", username);
  body.append("password", password);
  body.append("email", email);
  body.append("phone", phone);
  body.append("first_name", first_name);
  body.append("last_name", last_name);
  body.append("user_type", "legal");
  body.append("plan", plan);

  body.append("legal_user.company_name", company_name);
  body.append("legal_user.register_date", register_date);
  body.append("legal_user.registration_number", registration_number);
  body.append("legal_user.national_id", national_id);
  body.append("legal_user.economic_code", economic_code);

  body.append("legal_user.address", address);
  body.append("legal_user.floor", floor);
  body.append("legal_user.unit", unit);
  body.append("legal_user.postal_code", postal_code);

  if (file) {
    body.append("file", file);
  }

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

const editRealUser = async (state, formData) => {
  const userId = formData.get("id"); // باید در فرم hidden گذاشته شود
  if (!userId) return { status: false, message: "شناسه کاربر یافت نشد." };

  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const register_date = formData.get("register_date");
  const email = formData.get("email");
  let phone = formData.get("phone");

  const address = formData.get("address");
  const floor = formData.get("floor");
  const unit = formData.get("unit");
  const postal_code = formData.get("postal_code");

  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");

  const plan = formData.get("plan");
  const file = formData.get("file");

  // اصلاح شماره موبایل
  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("98")) phone = "0" + phone.slice(2);

  // -------------------------
  // Validation
  // -------------------------
  if (!first_name)
    return { status: false, message: "نام نمی‌تواند خالی باشد." };
  if (!last_name)
    return { status: false, message: "نام خانوادگی نمی‌تواند خالی باشد." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: false, message: "ایمیل معتبر نیست." };
  if (!phone || !/^09\d{9}$/.test(phone))
    return { status: false, message: "شماره موبایل معتبر نیست." };
  if (password && password !== rePassword)
    return { status: false, message: "تکرار رمز عبور صحیح نیست." };
  if (file && file.size > 50 * 1024 * 1024)
    return { status: false, message: "حداکثر حجم فایل ۵۰ مگابایت است." };

  // -------------------------
  // ساخت FormData برای PATCH
  // -------------------------
  const body = new FormData();

  body.append("first_name", first_name);
  body.append("last_name", last_name);
  body.append("email", email);
  body.append("phone", phone);
  body.append("username", username);
  body.append("plan", plan);
  body.append("register_date", register_date);

  body.append("real_user.address", address);
  body.append("real_user.floor", floor);
  body.append("real_user.unit", unit);
  body.append("real_user.postal_code", postal_code);

  if (password) body.append("password", password);
  if (file) body.append("contract_file", file);

  const token = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      `http://preview.kft.co.com/ticket/api/users/customers/${userId}/`,
      {
        method: "PATCH",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        body,
      }
    );

    const data = await res.json();
    console.log(data);

    if (!res.ok)
      return {
        status: false,
        message: data?.message || "خطا در ویرایش کاربر.",
      };

    return { status: true, message: "کاربر با موفقیت ویرایش شد." };
  } catch (err) {
    return { status: false, message: "خطا در ارتباط با سرور: " + err.message };
  }
};

const editLegalUser = async (state, formData) => {
  const userId = formData.get("id");
  if (!userId) return { status: false, message: "شناسه کاربر یافت نشد." };

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
  const plan = formData.get("plan");

  // اصلاح شماره موبایل
  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("98")) phone = "0" + phone.slice(2);

  // -------------------
  // Validation
  // -------------------
  if (!company_name?.trim())
    return { status: false, message: "نام شرکت الزامی است." };
  if (!first_name?.trim())
    return { status: false, message: "نام مدیرعامل نمی‌تواند خالی باشد." };
  if (!last_name?.trim())
    return {
      status: false,
      message: "نام خانوادگی مدیرعامل نمی‌تواند خالی باشد.",
    };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: false, message: "ایمیل معتبر نیست." };
  if (!phone || !/^09\d{9}$/.test(phone))
    return { status: false, message: "شماره موبایل معتبر نیست." };
  if (!address?.trim() || address.length < 3)
    return { status: false, message: "آدرس باید حداقل ۳ کاراکتر باشد." };
  if (!floor || isNaN(floor))
    return { status: false, message: "شماره طبقه معتبر نیست." };
  if (!unit || isNaN(unit))
    return { status: false, message: "شماره واحد معتبر نیست." };
  if (!postal_code || !/^\d{10}$/.test(postal_code))
    return { status: false, message: "کد پستی باید ۱۰ رقم باشد." };
  if (file && file.size > 50 * 1024 * 1024)
    return { status: false, message: "حداکثر حجم فایل ۵۰ مگابایت است." };
  if (!username?.trim() || username.length < 3)
    return { status: false, message: "نام کاربری باید حداقل ۳ کاراکتر باشد." };
  if (password && password.length < 6)
    return { status: false, message: "رمز عبور باید حداقل ۶ کاراکتر باشد." };
  if (password && password !== rePassword)
    return { status: false, message: "تکرار رمز عبور صحیح نیست." };

  // -------------------
  // ساخت FormData
  // -------------------
  const body = new FormData();

  body.append("username", username);
  if (password) body.append("password", password);
  body.append("email", email);
  body.append("phone", phone);
  body.append("plan", plan);
  body.append("register_date", register_date);

  // JSON کردن legal_user داخل FormData
  const legalUserObj = {
    company_name,
    registration_number,
    national_id,
    economic_code,
    address,
    floor,
    unit,
    postal_code,
  };
  body.append("legal_user", JSON.stringify(legalUserObj));

  if (file) body.append("file", file);

  const token = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      `http://preview.kft.co.com/ticket/api/users/customers/${userId}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body,
      }
    );

    const data = await res.json();
    console.log("PATCH Response =>", data);

    if (!res.ok)
      return {
        status: false,
        message: data?.message || "خطا در ویرایش کاربر حقوقی.",
      };

    return { status: true, message: "کاربر حقوقی با موفقیت ویرایش شد." };
  } catch (err) {
    return { status: false, message: "خطا در ارتباط با سرور: " + err.message };
  }
};

export { createRealUser, createLegalUser, editRealUser, editLegalUser };
