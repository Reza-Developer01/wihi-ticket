"use server";

import { cookies } from "next/headers";

const toEnglishDigits = (str = "") =>
  str
    .toString()
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

const createRealUser = async (state, formData) => {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  let phone = formData.get("phone");
  const zip_code = formData.get("zip_code");
  const address = formData.get("address");
  const floor = formData.get("floor");
  const unit = formData.get("unit");

  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");
  const plan = formData.get("plan");
  const user_type = formData.get("user_type");
  const register_date = formData.get("register_date");
  const services = formData.get("services");
  let servicesArr = [];
  if (services) {
    try {
      servicesArr = JSON.parse(services);
      servicesArr = servicesArr.map((id) => Number(id));
    } catch (err) {
      console.warn("services JSON invalid:", services);
    }
  }

  phone = toEnglishDigits(phone);
  const normalizedFloor = toEnglishDigits(floor);
  const normalizedUnit = toEnglishDigits(unit);
  const normalizedZipCode = toEnglishDigits(zip_code);

  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("98")) phone = "0" + phone.slice(2);

  const realUserObj = {
    address,
    floor: normalizedFloor,
    unit: normalizedUnit,
    postal_code: normalizedZipCode ?? "",
  };

  console.log("🔵 createRealUser - collected values:");
  console.log({
    first_name,
    last_name,
    email,
    phone,
    username,
    password: password ? "*****" : null,
    rePassword: rePassword ? "*****" : null,
    plan,
    user_type,
    real_user: realUserObj,
  });
  console.log("===================================");

  // -------------------------
  //   Validation (دست‌نخورده)
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

  if (!normalizedFloor || isNaN(normalizedFloor))
    return { status: false, message: "شماره طبقه معتبر نیست." };

  if (!normalizedUnit || isNaN(normalizedUnit))
    return { status: false, message: "شماره واحد معتبر نیست." };

  if (!realUserObj.postal_code || !/^\d{10}$/.test(realUserObj.postal_code))
    return { status: false, message: "کد پستی باید ۱۰ رقم باشد." };

  if (!username || username.trim().length < 3)
    return { status: false, message: "نام کاربری باید حداقل ۳ کاراکتر باشد." };

  if (!password || password.length < 6)
    return { status: false, message: "رمز عبور باید حداقل ۶ کاراکتر باشد." };

  if (password !== rePassword)
    return { status: false, message: "تکرار رمز عبور با رمز اصلی یکسان نیست." };

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
  body.append("real_user.address", realUserObj.address);
  body.append("real_user.floor", realUserObj.floor);
  body.append("real_user.unit", realUserObj.unit);
  body.append("real_user.postal_code", realUserObj.postal_code);

  if (!servicesArr.length) {
    return { status: false, message: "حداقل یک سرویس باید انتخاب شود." };
  }

  servicesArr.forEach((id) => {
    body.append("services", id);
  });

  console.log(`SERVICES => ${services}`);

  const file = formData.get("contract_file");
  console.log("📎 Uploaded file:", file);

  if (file && file.size > 0) {
    body.append("real_user.contract_file", file);
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
    console.log("🔵 API Response:", data);

    if (!res.ok)
      return {
        status: false,
        message: data?.message || "نام کاربری یا شماره تماس تکراری است.",
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
  const email = formData.get("email");
  let phone = formData.get("phone");

  const registration_number = formData.get("registration_number");
  const national_id = formData.get("national_id");
  const economic_code = formData.get("economic_code");

  const address = formData.get("address");
  const floor = formData.get("floor");
  const unit = formData.get("unit");
  const postal_code = formData.get("postal_code");

  const username = formData.get("username");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");
  const plan = formData.get("plan");
  const register_date = formData.get("register_date");

  // ✅ فقط این ۵ خط اضافه شده (نرمال‌سازی)
  phone = toEnglishDigits(phone);
  const normalizedFloor = toEnglishDigits(floor);
  const normalizedUnit = toEnglishDigits(unit);
  const normalizedPostalCode = toEnglishDigits(postal_code);
  const normalizedRegistrationNumber = toEnglishDigits(registration_number);

  // اصلاح شماره موبایل
  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("98")) phone = "0" + phone.slice(2);

  // ساخت آبجکت legal_user (دقیقاً مثل real)
  const legalUserObj = {
    company_name,
    registration_number: normalizedRegistrationNumber, // 👈 فقط مقدار
    national_id,
    economic_code,
    address,
    floor: normalizedFloor, // 👈 فقط مقدار
    unit: normalizedUnit, // 👈 فقط مقدار
    postal_code: normalizedPostalCode ?? "",
  };

  // 🔥 لاگ کامل برای دیباگ
  console.log("🔵 createLegalUser - collected values:");
  console.log({
    first_name,
    last_name,
    email,
    phone,
    username,
    password: password ? "*****" : null,
    rePassword: rePassword ? "*****" : null,
    plan,
    legal_user: legalUserObj,
  });
  console.log("===================================");

  // -------------------------
  // Validation (دست‌نخورده)
  // -------------------------
  if (!company_name?.trim())
    return { status: false, message: "نام شرکت الزامی است." };

  if (!first_name?.trim())
    return { status: false, message: "نام مدیرعامل الزامی است." };

  if (!last_name?.trim())
    return { status: false, message: "نام خانوادگی مدیرعامل الزامی است." };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: false, message: "ایمیل معتبر نیست." };

  if (!phone || !/^09\d{9}$/.test(phone))
    return { status: false, message: "شماره موبایل معتبر نیست." };

  if (!address || address.trim().length < 3)
    return { status: false, message: "آدرس باید حداقل ۳ کاراکتر باشد." };

  if (!normalizedFloor || isNaN(normalizedFloor))
    return { status: false, message: "شماره طبقه معتبر نیست." };

  if (!normalizedUnit || isNaN(normalizedUnit))
    return { status: false, message: "شماره واحد معتبر نیست." };

  if (!legalUserObj.postal_code || !/^\d{10}$/.test(legalUserObj.postal_code))
    return { status: false, message: "کد پستی باید ۱۰ رقم باشد." };

  if (!username || username.trim().length < 3)
    return { status: false, message: "نام کاربری باید حداقل ۳ کاراکتر باشد." };

  if (!password || password.length < 6)
    return { status: false, message: "رمز عبور باید حداقل ۶ کاراکتر باشد." };

  if (password !== rePassword)
    return { status: false, message: "تکرار رمز عبور با رمز اصلی یکسان نیست." };

  const servicesRaw = formData.get("services");
  let servicesArr = [];
  try {
    servicesArr = JSON.parse(servicesRaw);
    if (!Array.isArray(servicesArr) || servicesArr.length === 0) {
      return { status: false, message: "حداقل یک سرویس باید انتخاب شود." };
    }
  } catch (err) {
    return { status: false, message: "سرویس‌ها نامعتبر هستند." };
  }

  console.log(servicesArr);

  // ----------------------------
  // ساخت FormData (دقیقاً مشابه real)
  // ----------------------------
  const body = new FormData();

  body.append("username", username);
  body.append("password", password);
  body.append("email", email);
  body.append("phone", phone);
  body.append("first_name", first_name);
  body.append("last_name", last_name);
  body.append("user_type", "legal");
  body.append("plan", plan);
  body.append("register_date", register_date);

  // legal_user fields (مثل real_user)
  body.append("legal_user.company_name", legalUserObj.company_name);
  body.append(
    "legal_user.registration_number",
    legalUserObj.registration_number
  );
  body.append("legal_user.national_id", legalUserObj.national_id);
  body.append("legal_user.economic_code", legalUserObj.economic_code);
  body.append("legal_user.address", legalUserObj.address);
  body.append("legal_user.floor", legalUserObj.floor);
  body.append("legal_user.unit", legalUserObj.unit);
  body.append("legal_user.postal_code", legalUserObj.postal_code);

  // فایل قرارداد
  const file = formData.get("contract_file");
  console.log("📎 Uploaded file:", file);

  if (file && file.size > 0) {
    body.append("legal_user.contract_file", file);
  }

  servicesArr.forEach((id) => {
    body.append("services", id);
  });

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
        message: data?.message || "نام کاربری یا شماره تماس تکراری است.",
      };

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
  const userId = formData.get("id");
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

  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("09")) phone = "98" + phone.slice(2);

  if (password && password !== rePassword)
    return { status: false, message: "تکرار رمز عبور صحیح نیست." };

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

  // ✅ اصلاح اصلی
  if (file && file.size > 0) {
    body.append("real_user.contract_file", file);
  }

  const services = formData.get("services");
  if (services) {
    const serviceIds = JSON.parse(services);
    serviceIds.forEach((id) => body.append("services", id));
  }

  const token = cookies().get("access_token")?.value;

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
    return { status: false, message: data?.message || "خطا در ویرایش کاربر." };

  return { status: true, message: "کاربر با موفقیت ویرایش شد." };
};

const editLegalUser = async (state, formData) => {
  const userId = formData.get("id");
  if (!userId) return { status: false, message: "شناسه کاربر یافت نشد." };

  const company_name = formData.get("company_name");
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const registration_number = formData.get("registration_number");
  const national_id = formData.get("national_id");
  const economic_code = formData.get("economic_code");
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
  const register_date = formData.get("register_date");
  const file = formData.get("file");
  const servicesRaw = formData.get("services");

  phone = phone?.replace(/\D/g, "");
  if (phone?.startsWith("09")) phone = "98" + phone.slice(2);

  if (password && password !== rePassword)
    return { status: false, message: "تکرار رمز عبور صحیح نیست." };

  // ✅ FormData (به‌جای JSON)
  const body = new FormData();

  body.append("username", username);
  body.append("first_name", first_name);
  body.append("last_name", last_name);
  body.append("email", email);
  body.append("phone", phone);
  body.append("plan", plan);
  body.append("register_date", register_date);

  body.append("legal_user.company_name", company_name);
  body.append("legal_user.registration_number", registration_number);
  body.append("legal_user.national_id", national_id);
  body.append("legal_user.economic_code", economic_code);
  body.append("legal_user.address", address);
  body.append("legal_user.floor", floor);
  body.append("legal_user.unit", unit);
  body.append("legal_user.postal_code", postal_code);

  if (password) body.append("password", password);

  // ✅ ارسال صحیح فایل
  if (file && file.size > 0) {
    body.append("legal_user.contract_file", file);
  }

  if (servicesRaw) {
    try {
      const services = JSON.parse(servicesRaw);
      services.forEach((serviceId) => {
        body.append("services", serviceId); // API انتظار دارد چند مقدار services
      });
    } catch (err) {
      console.error("خطا در پارس کردن سرویس‌ها:", err);
    }
  }

  console.log(servicesRaw);

  const token = cookies().get("access_token")?.value;

  const res = await fetch(
    `http://preview.kft.co.com/ticket/api/users/customers/${userId}/`,
    {
      method: "PATCH",
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
      body,
    }
  );

  const data = await res.json();

  if (!res.ok)
    return {
      status: false,
      message: data?.message || "خطا در ویرایش کاربر حقوقی.",
    };

  return { status: true, message: "کاربر حقوقی با موفقیت ویرایش شد." };
};

export const changeUserStatus = async (userId, status) => {
  try {
    const token = cookies().get("access_token")?.value;

    const res = await fetch(
      `http://preview.kft.co.com/users/customers/${userId}/change-status/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({
          is_active: status,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        status: false,
        message: data?.message || "خطا در تغییر وضعیت کاربر",
      };
    }

    return {
      status: true,
      message: "وضعیت کاربر تغییر کرد",
    };
  } catch (err) {
    return { status: false, message: "خطای سرور" };
  }
};

export {
  createRealUser,
  createLegalUser,
  editRealUser,
  editLegalUser,
  changeUserStatus,
};
