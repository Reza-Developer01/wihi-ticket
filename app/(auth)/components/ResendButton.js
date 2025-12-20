"use client";

const ResendButton = ({ onResend }) => {
  return (
    <span
      onClick={onResend}
      className="timer relative block mt-6 text-center text-[#6C7278] text-xs/[18px] font-bold cursor-pointer"
    >
      ارسال مجدد کد
    </span>
  );
};

export default ResendButton;
