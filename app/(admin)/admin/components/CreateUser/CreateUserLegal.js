"use client";

import { DatePicker } from "zaman";
import { toJalaali } from "jalaali-js";
import Input from "../Input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useActionState, useEffect, useRef, useState } from "react";
import SubmitButton from "../SubmitButton";
import SubTitle from "../SubTitle";
import { createLegalUser } from "@/actions/user";
import toast from "react-hot-toast";
import UserPlans from "./UserPlans";
import { useRouter } from "next/navigation";
import Services from "./Services";

const CreateUserLegal = ({ services: allServices }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [hasFile, setHasFile] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    first_name: "",
    last_name: "",
    register_date: "",
    registration_number: "",
    email: "",
    phone: "",
    address: "",
    floor: "",
    unit: "",
    postal_code: "",
    file: "",
    username: "",
    password: "",
    rePassword: "",
    economic_code: "",
    national_id: "",
  });
  const router = useRouter();
  const fileRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [state, formAction] = useActionState(createLegalUser, {});

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state?.message);
      router.push("/");
    } else toast.error(state?.message);
  }, [state]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-y-4">
        <input
          name="company_name"
          type="text"
          value={formData.company_name}
          onChange={handleChange}
          placeholder="نام شرکت , سازمان"
          className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
        />

        {/* نام و نام خانوادگی */}
        <div className="flex items-center gap-x-4">
          <input
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="نام (مدیرعامل)"
            className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
          />

          <input
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="نام خانوادگی (مدیرعامل)"
            className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
          />
        </div>

        {/* تاریخ */}
        <div className="input-shadow flex items-center gap-x-2.5 w-full h-[46px] border border-[#EDF1F3] rounded-[10px] px-3.5 relative">
          <svg className="w-4 h-4 text-[#ACB5BB]">
            <use href="#calendar-due" />
          </svg>

          <div className="date-picker h-full flex items-center text-sm/[19.6px] text-[#1A1C1E] font-medium bg-white outline-none placeholder:text-[#1A1C1E]">
            <DatePicker
              value={
                formData.register_date
                  ? new Date(
                      formData.register_date.getFullYear(),
                      formData.register_date.getMonth(),
                      formData.register_date.getDate()
                    )
                  : null
              }
              onChange={(e) => {
                // مقدار انتخابی میلادی را ذخیره می‌کنیم
                setFormData((prev) => ({ ...prev, register_date: e.value }));
              }}
              format={(date) => {
                if (!date) return "";
                // نمایش شمسی
                const j = toJalaali(date);
                return `${j.jy}/${j.jm}/${j.jd}`;
              }}
            />

            {!formData.register_date && (
              <span className="absolute top-1/2 -translate-y-1/2 text-[#8C8C8C] pointer-events-none text-xs">
                تاریخ ثبت
              </span>
            )}

            {/* hidden input برای ارسال میلادی */}
            <input
              type="hidden"
              name="register_date"
              value={
                formData.register_date instanceof Date
                  ? formData.register_date.toISOString().split("T")[0] // yyyy-mm-dd میلادی
                  : formData.register_date
              }
            />
          </div>
        </div>

        <input
          name="registration_number"
          type="text"
          value={formData.registration_number}
          onChange={handleChange}
          placeholder="شماره ثبت"
          className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
        />

        <input
          name="national_id"
          type="text"
          value={formData.national_id}
          onChange={handleChange}
          placeholder="شناســـه ملی"
          className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
        />

        <input
          name="economic_code"
          type="text"
          value={formData.economic_code}
          onChange={handleChange}
          placeholder="کد اقتصادی"
          className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
        />

        {/* ایمیل */}
        <Input
          placeholder="Loisbecket@gmail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ textAlign: "left", direction: "ltr" }}
        />

        {/* شماره تماس */}
        <PhoneInput
          name="phone"
          value={formData.phone}
          onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
          defaultCountry="ir"
          className="input-shadow w-full h-[46px] text-sm/[19.6px] text-[#1A1C1E] font-medium rounded-[10px] outline-none"
          inputClassName="!h-full !pl-2.5 !bg-white !text-[#1A1C1E] placeholder:!text-[#1A1C1E] !text-left !grow !outline-none !shadow-none !ring-0 !p-0 !rounded-r-[10px] !border-[#EDF1F3]"
          countrySelectorStyleProps={{
            buttonClassName:
              "!w-[62px] !h-full !bg-transparent !rounded-l-[10px] !border-[#EDF1F3] flag__button",
            dropdownClassName: "!bg-white !shadow-lg !rounded-md",
            flagClassName: "custom__flag",
          }}
          style={{ direction: "ltr" }}
        />

        {/* <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="سرویــس‌های کاربر" w="w-[90px]" />
        </div> */}

        <Services
          allServices={allServices}
          selected={selectedServices}
          onChange={setSelectedServices}
        />

        <input
          type="hidden"
          name="services"
          value={JSON.stringify(selectedServices.map((s) => s.id))}
        />

        <input
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="آدرس را وارد کنید"
          className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
        />

        <div className="flex items-center gap-x-4">
          <input
            name="floor"
            type="tel"
            value={formData.floor}
            onChange={handleChange}
            placeholder="طبقـــــه"
            className="input-shadow text-right w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
          />

          <input
            name="unit"
            type="tel"
            value={formData.unit}
            onChange={handleChange}
            placeholder="واحــــــد"
            className="input-shadow text-right w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
          />
        </div>

        <input
          name="postal_code"
          type="text"
          value={formData.postal_code}
          onChange={handleChange}
          placeholder="کد پستی"
          className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
        />

        <div
          className={`custom-shadow relative flex items-center w-full h-12 rounded-[10px] overflow-hidden transition-all duration-300 ${
            hasFile ? "bg-[#00C96B33]" : "bg-[#EFF0F6]"
          }`}
        >
          <button
            type="button"
            className="flex items-center justify-between grow pr-6 pl-[15px]"
          >
            <span
              className={`font-semibold text-xs/[16.8px] ${
                hasFile ? "text-[#00C96B]" : "text-[#8C8C8C]"
              } tracking-[-0.12px]`}
            >
              {hasFile ? "فایل انتخاب شد" : "آپلود فایل قرارداد"}
              <span className="font-normal text-[8px]/[11.2px]">
                ( تا حجم 50 مگابایت )
              </span>
            </span>
            <svg
              className={`w-[25px] h-[25px] ${
                hasFile ? "text-[#00C96B]" : "text-[#8C8C8C]"
              }`}
            >
              <use href="#upload" />
            </svg>
          </button>

          <input
            ref={fileRef}
            type="file"
            name="contract_file"
            className="absolute w-full h-full text-transparent cursor-pointer"
            // disabled={hasFile}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 50 * 1024 * 1024) {
                toast.error("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.");
                e.target.value = "";
                setHasFile(false);
                setFormData((prev) => ({ ...prev, file: "" }));
              } else {
                setHasFile(true);
                setFormData((prev) => ({ ...prev, file }));
              }
            }}
          />
        </div>

        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="اطلاعات ورود کاربر" w="w-[90px]" />
        </div>

        {/* نام کاربری */}
        <input
          type="text"
          placeholder="نام کاربری را وارد کنید"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input-shadow w-full h-[46px] px-3.5 bg-white text-[#1A1C1E] font-medium text-xs/[19.6px] border border-[#EDF1F3] rounded-[10px] tracking-[-0.12px] outline-none placeholder:text-[#8C8C8C]"
        />

        {/* پسورد */}
        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          {showPass ? (
            <svg
              className="w-4 h-4 text-[#ACB5BB]"
              onClick={() => setShowPass((value) => !value)}
            >
              <use href="#eye-on" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-[#ACB5BB]"
              onClick={() => setShowPass((value) => !value)}
            >
              <use href="#eye-off" />
            </svg>
          )}

          <input
            name="password"
            type={showPass ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="*******"
            className="text-left outline-none placeholder:text-[#1A1C1E] font-medium text-sm/[19.6px] tracking-[-0.12px]"
            style={{ direction: "ltr", width: "100%" }}
          />
        </div>

        {/* تکرار پسورد */}
        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          {showRePass ? (
            <svg
              className="w-4 h-4 text-[#ACB5BB]"
              onClick={() => setShowRePass((value) => !value)}
            >
              <use href="#eye-on" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-[#ACB5BB]"
              onClick={() => setShowRePass((value) => !value)}
            >
              <use href="#eye-off" />
            </svg>
          )}

          <input
            name="rePassword"
            type={showRePass ? "text" : "password"}
            value={formData.rePassword}
            onChange={handleChange}
            placeholder="*******"
            className="text-left outline-none placeholder:text-[#1A1C1E] font-medium text-sm/[19.6px] tracking-[-0.12px]"
            style={{ direction: "ltr", width: "100%" }}
          />
        </div>

        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="سطح پلن کاربر" w="w-[90px]" />
        </div>

        <input type="hidden" name="user_type" value="legal" />

        <UserPlans
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
        <input type="hidden" name="plan" value={selectedPlan} />

        <input type="hidden" name="legal_user" value="legal" />

        <SubmitButton title="افزودن کاربر حقوقی" />
      </div>
    </form>
  );
};

export default CreateUserLegal;
