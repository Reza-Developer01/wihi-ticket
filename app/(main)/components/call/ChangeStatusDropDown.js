"use client";

import { changeStatus } from "@/actions/call";
import {
  useState,
  useEffect,
  useRef,
  useActionState,
  useTransition,
} from "react";

const ChangeStatusDropDown = ({
  status: initialStatus,
  call_request_number,
}) => {
  console.log("call_request_number =>", call_request_number);

  const statusMap = {
    callـqueue: {
      bg: "bg-[#FF770033]",
      text: "text-[#FF7700]",
      message: "در صف تماس",
    },
    Guided: {
      bg: "bg-[#40404033]",
      text: "text-[#404040]",
      message: "هدایت شده",
    },
    Checked: {
      bg: "bg-[#00C96B33]",
      text: "text-[#00C96B]",
      message: "بررسی شده",
    },
    cancelled: {
      bg: "bg-[#FF000033]",
      text: "text-[#FF0000]",
      message: "لغو شده",
    },
  };

  const formRef = useRef(null);

  const [state, formAction] = useActionState(changeStatus, {});

  useEffect(() => {
    console.log("STATE FROM ACTION:", state);
  }, [state]);
  const [isPending, startTransition] = useTransition();

  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const current = statusMap[currentStatus];
  const isEditable = currentStatus === "callـqueue";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [{ value: "cancelled", label: "لغو کردن" }];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setIsOpen(false);
    setCurrentStatus(option.value);

    if (option.value === "cancelled") {
      const form = formRef.current;

      // مقداردهی به فیلدهای فرم
      form.querySelector("input[name='comment']").value = "";
      form.querySelector("input[name='call_request_number']").value =
        call_request_number;
      form.querySelector("input[name='status']").value = "cancelled";

      // اجرای اکشن
      startTransition(() => {
        form.requestSubmit();
      });

      setTimeout(() => {
        if (state?.status === false) {
          console.log("خطا:", state.message);
        } else {
          console.log("با موفقیت انجام شد");
        }
      }, 0);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        disabled={!isEditable}
        onClick={() => isEditable && setIsOpen(!isOpen)}
        className={`flex items-center ${
          currentStatus === "callـqueue" ? "justify-between" : "justify-center"
        } w-full h-12 px-[19px] rounded-[10px] ${current.bg}`}
      >
        <div></div>

        <span
          className={`font-medium text-sm/[19.6px] ${current.text} truncate`}
        >
          {current.message}
        </span>

        {isEditable && (
          <div className="flex items-center justify-center border-r border-r-white pr-[11px] h-[30px]">
            <svg
              className={`w-5 h-5 text-white transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <use href="#arrow-down-2" />
            </svg>
          </div>
        )}
      </button>

      {isEditable && isOpen && (
        <div className="absolute bottom-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-10 max-h-60 overflow-y-auto">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="cursor-pointer hover:text-black pb-3"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔥 فرم واقعی + hidden inputs (ضروری برای اجرای سرور اکشن) */}
      <form ref={formRef} action={formAction} className="hidden">
        <input type="hidden" name="comment" />
        <input type="hidden" name="call_request_number" />
        <input type="hidden" name="status" />
      </form>
    </div>
  );
};

export default ChangeStatusDropDown;
