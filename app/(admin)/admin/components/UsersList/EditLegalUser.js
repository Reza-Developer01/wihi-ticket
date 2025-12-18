"use client";

import { DatePicker } from "zaman";
import { toJalaali } from "jalaali-js";
import Input from "../Input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useActionState, useEffect, useRef, useState } from "react";
import SubmitButton from "../SubmitButton";
import SubTitle from "../SubTitle";
import toast from "react-hot-toast";
import UserPlans from "../CreateUser/UserPlans";
import { useRouter } from "next/navigation";
import EditableServices from "./EditableServices";
import { editLegalUser } from "@/actions/user";

const EditLegalUser = ({ data, services }) => {
  const [state, formAction] = useActionState(editLegalUser, {});
  const [hasFile, setHasFile] = useState(
    Boolean(data?.legal_user?.contract_file)
  );
  const [existingFile, setExistingFile] = useState(
    data?.legal_user?.contract_file || null
  );
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const router = useRouter();
  const fileRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState(data?.plan || 1);

  // تنظیم سرویس‌های اولیه
  const initialSelectedServices =
    data.services?.map((id) => {
      const service = services.find((s) => s.id === id);
      return service ? service : { id, name: `سرویس ${id}` };
    }) || [];

  const [selectedServices, setSelectedServices] = useState(
    initialSelectedServices
  );

  const [formData, setFormData] = useState({
    company_name: data?.legal_user?.company_name || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    register_date: data?.register_date
      ? (() => {
          const parts = data.register_date.split("/");
          const gy = parseInt(parts[0]);
          const gm = parseInt(parts[1]);
          const gd = parseInt(parts[2]);
          const { jy, jm, jd } = toJalaali(gy, gm, gd);
          return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(
            2,
            "0"
          )}`;
        })()
      : "",
    register_date_gregorian: data?.register_date
      ? (() => {
          const parts = data.register_date.split("/");
          return `${parts[0]}-${parts[1]}-${parts[2]}`;
        })()
      : "",
    registration_number: data?.legal_user?.registration_number || "",
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.legal_user?.address || "",
    floor: data?.legal_user?.floor || "",
    unit: data?.legal_user?.unit || "",
    postal_code: data?.legal_user?.postal_code || "",
    file: data?.legal_user?.contract_file || "",
    username: data?.username || "",
    password: "",
    rePassword: "",
    economic_code: data?.legal_user?.economic_code || "",
    national_id: data?.legal_user?.national_id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;
    if (state.status) {
      toast.success(state.message);
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-5">
      <div className="flex flex-col gap-y-4">
        {/* اطلاعات شرکت */}
        <input
          name="company_name"
          type="text"
          value={formData.company_name}
          onChange={handleChange}
          placeholder="نام شرکت , سازمان"
          className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
        />

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

        {/* تاریخ ثبت */}
        <div className="input-shadow flex items-center justify-between gap-x-2.5 w-full h-[46px] border border-[#EDF1F3] rounded-[10px] px-3.5">
          <svg className="w-4 h-4 text-[#ACB5BB]">
            <use href="#calendar-due" />
          </svg>
          <div className="relative w-full">
            {formData.register_date && (
              <span className="custom__jalali absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1C1E] pointer-events-none font-medium text-sm">
                {formData.register_date}
              </span>
            )}
            <DatePicker
              value={
                formData.register_date_gregorian
                  ? new Date(formData.register_date_gregorian)
                  : null
              }
              onChange={(e) => {
                const d = new Date(e.value);
                const { jy, jm, jd } = toJalaali(d);
                const jDateFormatted = `${jy}/${String(jm).padStart(
                  2,
                  "0"
                )}/${String(jd).padStart(2, "0")}`;
                const gDateFormatted = `${d.getFullYear()}-${String(
                  d.getMonth() + 1
                ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                setFormData((prev) => ({
                  ...prev,
                  register_date: jDateFormatted,
                  register_date_gregorian: gDateFormatted,
                }));
              }}
            />
            <input
              type="hidden"
              name="register_date"
              value={formData.register_date_gregorian || ""}
            />
          </div>
        </div>

        {/* سایر فیلدهای اطلاعات پایه */}
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

        <Input
          placeholder="Loisbecket@gmail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ textAlign: "left", direction: "ltr" }}
        />

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

        {/* آدرس */}
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
            type="text"
            value={formData.floor}
            onChange={handleChange}
            placeholder="طبقـــــه"
            className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
          />
          <input
            name="unit"
            type="text"
            value={formData.unit}
            onChange={handleChange}
            placeholder="واحــــــد"
            className="input-shadow w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#8C8C8C] font-medium text-xs/[19.6px] tracking-[-0.12px]"
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

        {/* Editable Services */}
        <EditableServices
          allServices={services}
          selected={selectedServices}
          onChange={(updated) => setSelectedServices(updated)}
        />

        {/* فایل قرارداد */}
        <div
          className={`custom-shadow relative flex items-center w-full h-12 rounded-[10px] overflow-hidden transition-all duration-300 pl-6 ${
            hasFile
              ? existingFile
                ? "bg-blue-50"
                : "bg-[#00C96B33]"
              : "bg-[#EFF0F6]"
          }`}
        >
          <button
            type="button"
            className="flex items-center justify-between grow pr-6"
          >
            <span
              className={`font-semibold text-xs/[16.8px] tracking-[-0.12px] ${
                hasFile
                  ? existingFile
                    ? "text-blue-600"
                    : "text-[#00C96B]"
                  : "text-[#8C8C8C]"
              }`}
            >
              {hasFile
                ? existingFile
                  ? "فایل قرارداد قبلاً آپلود شده"
                  : "فایل جدید انتخاب شد"
                : "آپلود فایل قرارداد"}
              <span className="font-normal text-[8px]/[11.2px]">
                ( تا حجم 50 مگابایت )
              </span>
            </span>
          </button>

          <input
            ref={fileRef}
            type="file"
            name="file"
            disabled={Boolean(existingFile)}
            className={`absolute w-full h-full text-transparent cursor-pointer ${
              existingFile ? "pointer-events-none" : ""
            }`}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 50 * 1024 * 1024) {
                toast.error("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.");
                e.target.value = "";
                return;
              }
              setHasFile(true);
              setExistingFile(null);
            }}
          />
        </div>

        {/* اطلاعات ورود */}
        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="اطلاعات ورود کاربر" w="w-[90px]" />
        </div>

        <input
          type="text"
          placeholder="نام کاربری را وارد کنید"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input-shadow w-full h-[46px] px-3.5 bg-white text-[#1A1C1E] font-medium text-xs/[19.6px] border border-[#EDF1F3] rounded-[10px] tracking-[-0.12px] outline-none placeholder:text-[#8C8C8C]"
        />

        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          <svg
            className="w-4 h-4 text-[#ACB5BB]"
            onClick={() => setShowPass((v) => !v)}
          >
            <use href="#eye-off" />
          </svg>
          <input
            name="password"
            type={showPass ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="*******"
            className="text-left outline-none placeholder:text-[#1A1C1E] font-medium text-sm/[19.6px] tracking-[-0.12px]"
            style={{ direction: "ltr" }}
          />
        </div>

        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          <svg
            className="w-4 h-4 text-[#ACB5BB]"
            onClick={() => setShowRePass((v) => !v)}
          >
            <use href="#eye-off" />
          </svg>
          <input
            name="rePassword"
            type={showRePass ? "text" : "password"}
            value={formData.rePassword}
            onChange={handleChange}
            placeholder="*******"
            className="text-left outline-none placeholder:text-[#1A1C1E] font-medium text-sm/[19.6px] tracking-[-0.12px]"
            style={{ direction: "ltr" }}
          />
        </div>

        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="سطح پلن کاربر" w="w-[90px]" />
        </div>

        <UserPlans
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
        <input type="hidden" name="plan" value={selectedPlan} />
        <input type="hidden" name="user_type" value="legal" />

        {/* Hidden services for form submit */}
        <input
          type="hidden"
          name="services"
          value={JSON.stringify(selectedServices.map((s) => s.id))}
        />

        <SubmitButton title="ویرایش کاربر حقوقی" />
      </div>

      <input type="hidden" name="id" value={data?.id} />
    </form>
  );
};

export default EditLegalUser;
