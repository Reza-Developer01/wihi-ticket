import { DatePicker } from "zaman";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const RegisterForm = () => {
  const [phone, setPhone] = useState("");

  return (
    <form action="#" className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="نام"
            className="custom__input w-full h-[46px] px-3.5 text-sm/[19.6px] bg-white text-[#1A1C1E] font-medium border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#1A1C1E]"
          />
          <input
            type="text"
            placeholder="نام خانوادگی"
            className="custom__input w-full h-[46px] px-3.5 text-sm/[19.6px] bg-white text-[#1A1C1E] font-medium border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#1A1C1E]"
          />
        </div>

        <div className="relative">
          <svg className="absolute right-3.5 top-0 bottom-0 m-auto w-4 h-4 text-[#ACB5BB]">
            <use href="#calendar-due" />
          </svg>
          <div className="date-picker w-full h-[46px] pl-3.5 pr-10 text-sm/[19.6px] text-[#1A1C1E] font-medium bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#1A1C1E]">
            <DatePicker
              onChange={(e) => console.log(e)}
              round="x2"
              defaultValue={new Date()}
            />
          </div>
        </div>

        <PhoneInput
          value={phone}
          onChange={(phone) => setPhone(phone)}
          defaultCountry="ir"
          className="custom__input w-full h-[46px] text-sm/[19.6px] font-medium rounded-[10px] outline-none"
          inputClassName="!h-full !pl-2.5 !bg-white !text-[#1A1C1E] placeholder:!text-[#1A1C1E] !text-left !grow !outline-none !shadow-none !ring-0 !p-0 !rounded-r-[10px] !border-[#EDF1F3]"
          countrySelectorStyleProps={{
            buttonClassName:
              "!w-[62px] !h-full !bg-transparent !rounded-l-[10px] !border-[#EDF1F3] flag__button",
            dropdownClassName: "!bg-white !shadow-lg !rounded-md",
            flagClassName: "custom__flag",
          }}
          style={{ direction: "ltr" }}
        />

        <div className="relative">
          <svg className="absolute right-3.5 top-0 bottom-0 m-auto w-4 h-4 text-[#ACB5BB]">
            <use href="#eye-off" />
          </svg>
          <input
            type="password"
            placeholder="*******"
            className="custom__input w-full h-[46px] pl-3.5 pr-10 text-sm/[19.6px] text-[#1A1C1E] font-medium bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#1A1C1E] text-left"
            style={{ direction: "ltr" }}
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-[10px] leading-6 text-white mt-2 font-medium"
        >
          ثبت نام
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
