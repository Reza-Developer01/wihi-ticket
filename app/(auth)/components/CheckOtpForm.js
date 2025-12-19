"use client";

import { checkOtp, getMe } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OtpInput } from "reactjs-otp-input";
import ResendButton from "./ResendButton";

const CheckOtpForm = () => {
  const [state, formAction] = useActionState(checkOtp, {});
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status === "error") {
      toast.error(state?.message);
    } else {
      toast.success(state?.message);
      sessionStorage.removeItem("phone");
      router.push("/");
    }
  }, [state]);

  const handleChange = (otp) => setOtp(otp);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <section className="section-check-otp -mt-[140px]">
      <div className="container">
        <div className="w-full p-6 bg-white rounded-[10px]">
          <p className="text-xs/[18px] text-[#6C7278] mb-6 tracking-[-0.12px]">
            کد تایید ارسال شده را وارد کنید و در صورت ارسال نشدن پیامک از صحت
            شماره خود مطمئن شوید و تلاش مجدد را بزنید.
          </p>

          <form action={formAction}>
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              isInputNum={true}
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
                textAlign: "center",
              }}
            />
            <input type="hidden" name="code" value={otp} />

            {!isExpired ? (
              <span className="timer relative block mt-6 text-center text-[#6C7278] text-xs/[18px] font-bold">
                {formatTime(timeLeft)}
              </span>
            ) : (
              <ResendButton
                setTimeLeft={setTimeLeft}
                setIsExpired={setIsExpired}
              />
            )}

            <button
              type="submit"
              className="w-full h-12 mt-6 rounded-[10px] leading-6 bg-[#20CFCF] text-white font-medium"
            >
              تایید
            </button>
          </form>

          <p className="flex items-center justify-center gap-x-1.5 mt-6 text-xs/[16.8px] font-medium text-[#6C7278] tracking-[-0.12px]">
            درصورت بروز مشکل تماس بگیـرید
            <Link href="tel:90009888" className="font-semibold text-[#2AD1D1]">
              پشتیبانی
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckOtpForm;
