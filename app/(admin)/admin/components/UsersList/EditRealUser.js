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
import { editRealUser } from "@/actions/user";
import EditableServices from "./EditableServices";
import OperationUser from "./OperationUser";

const EditRealUser = ({ data, services }) => {
  const normalizeIranPhone = (phone) => {
    if (!phone) return "";
    let p = phone.toString().trim();
    if (p.startsWith("09")) {
      return "98" + p.slice(1);
    }
    if (p.startsWith("+98")) {
      return p.slice(1);
    }
    if (p.startsWith("98")) {
      return p;
    }

    return p;
  };

  const initialSelectedServices =
    data.services?.map((id) => {
      const service = services.find((s) => s.id === id);
      return service ? service : { id, name: `سرویس ${id}` };
    }) || [];

  const [selectedServices, setSelectedServices] = useState(
    initialSelectedServices
  );
  const [state, formAction] = useActionState(editRealUser, {});
  const router = useRouter();

  const [hasFile, setHasFile] = useState(
    Boolean(data?.real_user?.contract_file)
  );
  const [existingFile, setExistingFile] = useState(
    data?.real_user?.contract_file || null
  );
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  const fileRef = useRef(null);

  const [selectedPlan, setSelectedPlan] = useState(data?.plan || 1);

  const [formData, setFormData] = useState({
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    register_date: data?.register_date
      ? (() => {
          // فرض می‌کنیم data.register_date به صورت "YYYY/MM/DD" هست
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

    email: data?.email || "",
    phone: normalizeIranPhone(data?.phone),
    username: data?.username || "",
    password: "",
    rePassword: "",
    address: data?.real_user?.address || "",
    floor: data?.real_user?.floor || "",
    unit: data?.real_user?.unit || "",
    postal_code: data?.real_user?.postal_code || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log("🚀 formData to send:", formData);
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
        {/* نام و نام خانوادگی */}
        <div className="flex items-center gap-x-4">
          <Input
            placeholder="نام"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <Input
            placeholder="نام خانوادگی"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        {/* تاریخ */}
        <div className="editrealuser input-shadow flex items-center justify-between gap-x-2.5 w-full h-[46px] border border-[#EDF1F3] rounded-[10px] px-3.5">
          <svg className="w-4 h-4 text-[#ACB5BB] shrink-0">
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
          onChange={(phone) =>
            setFormData((prev) => ({
              ...prev,
              phone,
            }))
          }
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

        <EditableServices
          allServices={services}
          selected={selectedServices}
          onChange={(updated) => setSelectedServices(updated)}
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
          {existingFile && (
            <a
              href={existingFile}
              target="_blank"
              className="text-xs text-blue-600 underline inline-block"
            >
              <svg className="w-6 h-6 shrink-0">
                <use href="#paper-download" />
              </svg>
            </a>
          )}
        </div>

        {/* اطلاعات ورود */}
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
          <svg
            className="w-4 h-4 text-[#ACB5BB]"
            onClick={() => setShowPass((value) => !value)}
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

        {/* تکرار پسورد */}
        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          <svg
            className="w-4 h-4 text-[#ACB5BB]"
            onClick={() => setShowRePass((value) => !value)}
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

        {/* پلن */}
        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="سطح پلن کاربر" w="w-[90px]" />
        </div>

        <UserPlans
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        <input
          type="hidden"
          name="services"
          value={JSON.stringify(selectedServices.map((s) => s.id))}
        />

        <input type="hidden" name="user_type" value="real" />
        <input type="hidden" name="plan" value={selectedPlan} />
        <input type="hidden" name="real_user" value="real" />

        <OperationUser userId={data.id} isActive={data.is_active} />

        <SubmitButton title="ویرایش کاربر حقیقی" />
      </div>
      <input type="hidden" name="id" value={data?.id} />
    </form>
  );
};

export default EditRealUser;
