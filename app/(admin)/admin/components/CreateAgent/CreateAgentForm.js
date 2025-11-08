"use client";

import { DatePicker } from "zaman";
import Input from "../Input";
import { PhoneInput } from "react-international-phone";
import { useState } from "react";
import "react-international-phone/style.css";
import SubTitle from "../SubTitle";
import AgentsCategories from "./AgentsCategories";

const CreateAgentForm = ({ agentsCategory }) => {
  const [phone, setPhone] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  return (
    <form action="#">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <Input placeholder="نام" name="name" />
          <Input placeholder="نام خانوادگی" name="family" />
        </div>

        <div className="input-shadow flex items-center justify-between gap-x-2.5 w-full h-[46px] border border-[#EDF1F3] rounded-[10px] px-3.5">
          <svg className="w-4 h-4 text-[#ACB5BB]">
            <use href="#calendar-due" />
          </svg>
          <div
            className="date-picker h-full flex items-center justify-end text-sm/[19.6px] text-[#1A1C1E] font-medium bg-white outline-none placeholder:text-[#1A1C1E]"
            style={{ textAlignLast: "left" }}
          >
            <DatePicker
              onChange={(e) => console.log(e)}
              round="x2"
              defaultValue={new Date()}
            />
          </div>
        </div>

        <Input
          placeholder="Loisbecket@gmail.com"
          name="email"
          style={{ textAlign: "left", direction: "ltr" }}
        />

        <PhoneInput
          value={phone}
          onChange={(phone) => setPhone(phone)}
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

        <AgentsCategories agentsCategory={agentsCategory} />

        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="اطلاعات ورود کارشناس" w="w-[96px]" />
        </div>

        <input
          type="text"
          placeholder="نام کاربری را وارد کنید"
          className="input-shadow w-full h-[46px] px-3.5 bg-white text-[#1A1C1E] font-medium text-xs/[19.6px] border border-[#EDF1F3] 
            rounded-[10px] tracking-[-0.12px] outline-none placeholder:text-[#8C8C8C]"
        />

        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          <svg
            className="w-4 h-4 text-[#ACB5BB]"
            onClick={() => setShowPass((value) => !value)}
          >
            <use href="#eye-off" />
          </svg>

          <input
            type={showPass ? "text" : "password"}
            placeholder="*******"
            className="text-left outline-none placeholder:text-[#1A1C1E] font-medium text-sm/[19.6px] tracking-[-0.12px]"
            style={{ direction: "ltr" }}
          />
        </div>

        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          <svg
            className="w-4 h-4 text-[#ACB5BB]"
            onClick={() => setShowRePass((value) => !value)}
          >
            <use href="#eye-off" />
          </svg>

          <input
            type={showRePass ? "text" : "password"}
            placeholder="*******"
            className="text-left outline-none placeholder:text-[#1A1C1E] font-medium text-sm/[19.6px] tracking-[-0.12px]"
            style={{ direction: "ltr" }}
          />
        </div>
      </div>
    </form>
  );
};

export default CreateAgentForm;
