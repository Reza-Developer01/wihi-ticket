import { DatePicker } from "zaman";
import { toJalaali } from "jalaali-js";
import Input from "../Input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import SubTitle from "../SubTitle";

const CreateUserReal = () => {
  const [hasFile, setHasFile] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    register_date: "",
    email: "",
    phone: "",
    address: "",
    floor: "",
    unit: "",
    zip_code: "",
    file: "",
    username: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action="#">
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
        <div className="input-shadow flex items-center justify-between gap-x-2.5 w-full h-[46px] border border-[#EDF1F3] rounded-[10px] px-3.5">
          <svg className="w-4 h-4 text-[#ACB5BB]">
            <use href="#calendar-due" />
          </svg>

          <div
            className="date-picker h-full flex items-center justify-end text-sm/[19.6px] text-[#1A1C1E] font-medium bg-white outline-none placeholder:text-[#1A1C1E]"
            style={{ textAlignLast: "left" }}
          >
            <DatePicker
              value={formData.register_date}
              onChange={(e) => {
                const d = new Date(e.value);
                const { jy, jm, jd } = toJalaali(d);

                const jDate = `${jy}-${String(jm).padStart(2, "0")}-${String(
                  jd
                ).padStart(2, "0")}`;

                setFormData((prev) => ({ ...prev, register_date: jDate }));
              }}
              round="x2"
              defaultValue={new Date()}
            />

            <input
              type="hidden"
              name="register_date"
              value={formData.register_date}
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
          name="zip_code"
          type="text"
          value={formData.zip_code}
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
            type="file"
            name="file"
            className="absolute w-full h-full text-transparent cursor-pointer"
            disabled={hasFile}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 50 * 1024 * 1024) {
                toast.error("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.");
                e.target.value = "";
                setHasFile(false);
              } else {
                setHasFile(true);
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

        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="سطح پلن کاربر" w="w-[90px]" />
        </div>

        <SubmitButton title="افزودن کارشناس" />
      </div>
    </form>
  );
};

export default CreateUserReal;
