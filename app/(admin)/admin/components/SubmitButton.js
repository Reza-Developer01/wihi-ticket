"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ title, bg = "#20CFCF" }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`flex items-center justify-center gap-x-2 w-full h-12 rounded-[10px] leading-6 bg-[${bg}] text-white font-medium`}
      disabled={pending}
    >
      {pending && (
        <svg className="mr-3 -ml-1 size-5 animate-spin text-white">
          <use href="#loading"></use>
        </svg>
      )}
      {!pending && title}
    </button>
  );
};

export default SubmitButton;
