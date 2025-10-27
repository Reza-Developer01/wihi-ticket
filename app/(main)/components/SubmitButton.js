"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ title }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex items-center justify-center w-full h-12 leading-6 bg-[#20CFCF] text-white rounded-[10px] tracking-[-0.12px] mt-[9px]"
      disabled={pending}
    >
      {pending ? "درحال ارسال ..." : title}
    </button>
  );
};

export default SubmitButton;
