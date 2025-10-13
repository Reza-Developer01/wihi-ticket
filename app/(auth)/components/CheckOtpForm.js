"use client";

import Link from "next/link";
import { useState } from "react";
import { OtpInput } from "reactjs-otp-input";

const CheckOtpForm = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (otp) => setOtp(otp);

  return (
    <section className="section-check-otp -mt-[140px]">
      <div className="container">
        {/* wrapper */}
        <div className="w-full p-6 bg-white rounded-[10px]">
          <p className="text-xs/[18px] text-[#6C7278] mb-6 tracking-[-0.12px]">
            کد تایید ارسال شده را وارد کنید و صورت ارسال نشدن پیامک از صحت شماره
            خود حاصل فرمایید و تلاش مجدد را بزنید
          </p>
          <form action="#">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              containerStyle={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
              }}
              inputStyle={{
                width: "46px",
                height: "46px",
                backgroundColor: "white",
                border: "1px solid #EDF1F3",
                boxShadow: "0px 1px 2px 0px #E4E5E73D",
                outline: "none",
                fontSize: "14px",
                borderRadius: "10px",
              }}
            />
            <span className="timer relative block mt-6 text-center text-[#6C7278] text-xs/[18px] font-bold">
              25 : 1
            </span>
            <button
              type="submit"
              className="w-full h-12 mt-6 rounded-[10px] leading-6 bg-[#20CFCF] text-white font-medium"
            >
              تایید
            </button>
          </form>
          <p className="flex items-center justify-center gap-x-1.5 mt-6 text-xs/[16.8px] font-medium text-[#6C7278] tracking-[-0.12px]">
            درصورت بروز مشکل تماس بگیـرید
            <Link href="/" className="font-semibold text-[#2AD1D1]">
              پشتیبانی
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckOtpForm;
