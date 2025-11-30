"use client";

import { changeStatus } from "@/actions/call";
import {
  useState,
  useEffect,
  useRef,
  useActionState,
  useTransition,
} from "react";
import { Modal } from "../Modal";
// اگر Modal کامپوننت جدا داری، می‌تونی این import رو فعال کنی
// import Modal from "../Modal";

const ChangeStatusDropDown = ({
  status: initialStatus,
  call_request_number,
  comment_guided,
  comment_cancelled,
}) => {
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

  // refs برای مراحل بعدی (input داخل مدال، container مدال برای click outside)
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const [state, formAction] = useActionState(changeStatus, {});
  const [isPending, startTransition] = useTransition();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false);

  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const current = statusMap[currentStatus];

  // ========== قدم 1: کلیک‌پذیری برای callـqueue و Guided ==========
  const isEditable =
    currentStatus === "callـqueue" || currentStatus === "Guided";

  // state برای dropdown (مثل قبل)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // state برای باز/بسته بودن مودال مخصوص Guided (قدم 2)
  const [isGuidedModalOpen, setIsGuidedModalOpen] = useState(false);

  const options = [{ value: "cancelled", label: "لغو کردن" }];

  // مدیریت کلیک بیرون برای dropdown (همان منطق قبلی)
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
    // setCurrentStatus(option.value);

    if (option.value === "cancelled") {
      // const form = formRef.current;

      // form.querySelector("input[name='comment']").value = "";
      // form.querySelector("input[name='call_request_number']").value =
      //   call_request_number;
      // form.querySelector("input[name='status']").value = "cancelled";

      // startTransition(() => {
      //   form.requestSubmit();
      // });
      setIsCancelModalOpen(true);
    }
  };

  const handleCancelSubmit = () => {
    const form = formRef.current;

    form.querySelector("input[name='comment']").value = "";
    form.querySelector("input[name='call_request_number']").value =
      call_request_number;
    form.querySelector("input[name='status']").value = "cancelled";

    startTransition(() => {
      form.requestSubmit();
    });

    // بستن modal و تغییر وضعیت دکمه اصلی
    setIsCancelModalOpen(false);
    setCurrentStatus("cancelled");
  };

  return (
    <>
      <div ref={dropdownRef} className="relative w-full">
        <button
          type="button"
          disabled={!isEditable && currentStatus !== "cancelled"}
          onClick={() => {
            if (currentStatus === "Guided") {
              setIsGuidedModalOpen(true);
            } else if (currentStatus === "cancelled") {
              setIsCancelledModalOpen(true);
            } else {
              setIsOpen((s) => !s);
            }
          }}
          className={`flex items-center ${
            currentStatus === "callـqueue"
              ? "justify-between"
              : "justify-center"
          } w-full h-12 px-[19px] rounded-[10px] ${current.bg}`}
        >
          <div></div>

          <span
            className={`font-medium text-sm/[19.6px] ${current.text} truncate`}
          >
            {current.message}
          </span>

          {currentStatus === "callـqueue" && (
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

        {currentStatus === "callـqueue" && isOpen && (
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

        {/* فرم اکشن (همانند قبل) */}
        <form ref={formRef} action={formAction} className="hidden">
          <input type="hidden" name="comment" />
          <input type="hidden" name="call_request_number" />
          <input type="hidden" name="status" />
        </form>
      </div>

      {/* ========== Placeholder Modal برای Guided (قدم 2 کامل) ========== */}
      {isGuidedModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            مشاهده جزئیات
          </h4>

          <div
            className="font-light text-xs h-[150px]"
            style={{ boxShadow: "0px -3px 6px 0px #F4F5FA99 inset" }}
          >
            <p className="pt-2.5 pl-2.5 pr-2">{comment_guided}</p>
          </div>

          <div className="flex flex-col gap-y-6">
            <button
              onClick={() => setIsGuidedModalOpen(false)}
              type="button"
              className="flex items-center justify-center w-full h-12 bg-[#D9D9D9] text-[#404040] rounded-[10px] mt-6 font-medium"
            >
              مشاهده
            </button>

            <button
              onClick={() => setIsGuidedModalOpen(false)}
              type="button"
              className="text-[#6C7278] text-xs"
            >
              متوجـــه شدم
            </button>
          </div>
        </Modal>
      )}

      {isCancelModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#FF0000] font-semibold leading-[22.4px] tracking-[-0.12px]">
            بستن درخواست
          </h4>

          <form action={formAction} className="flex flex-col">
            <textarea
              name="comment"
              className="custom-shadow w-[240px] h-[150px] mx-auto pt-[15px] pr-[15px] text-[#404040] text-xs/[16.8px] tracking-[-0.12px] bg-white border border-[#EFF0F6] rounded-[10px] outline-none"
              placeholder="دلیل بستن درخواست خود را بنویسد"
            ></textarea>
            <input
              type="hidden"
              name="ticket_number"
              value={call_request_number}
            />
            <input type="hidden" name="status" value="closed" />

            <div className="flex flex-col gap-y-6">
              <button
                type="button"
                onClick={handleCancelSubmit}
                className="flex items-center justify-center w-[239px] h-12 mx-auto mt-6 leading-6 text-white bg-[#FF0000] rounded-[10px] tracking-[-0.12px]"
              >
                تایید
              </button>

              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
              >
                منصرف شدم
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isCancelledModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            مشاهده جزئیات
          </h4>

          <div
            className="font-light text-xs h-[150px]"
            style={{ boxShadow: "0px -3px 6px 0px #F4F5FA99 inset" }}
          >
            <p className="pt-2.5 pl-2.5 pr-2">{comment_cancelled}</p>
          </div>

          <div className="flex flex-col gap-y-6">
            <button
              onClick={() => setIsCancelledModalOpen(false)}
              type="button"
              className="flex items-center justify-center w-full h-12 bg-[#FF000033] text-[#FF0000] rounded-[10px] mt-6 font-medium"
            >
              مشاهده
            </button>

            <button
              onClick={() => setIsCancelledModalOpen(false)}
              type="button"
              className="text-[#6C7278] text-xs"
            >
              متوجـــه شدم
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ChangeStatusDropDown;
