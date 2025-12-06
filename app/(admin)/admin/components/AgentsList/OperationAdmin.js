"use client";

import { Modal } from "@/app/(main)/components/Modal";
import { useState, useRef, useEffect } from "react";

const OperationAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: "غیرفعالسازی" },
    { label: "فعالسازی" },
    { label: "گزارش عملکرد(براساس نظر سنجی)" },
    { label: "گزارش عملکرد ( براساس میانگین پاسخ , تیکت و تماس و.. )" },
    { label: "تاریخچــه تغییرات" },
  ];

  const handleSelect = (label) => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* دکمه اصلی */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between pl-3.5 pr-[45px] w-full h-12 mt-4 text-white font-medium leading-6 rounded-[10px] bg-[#20CFCF]"
      >
        <div></div>
        عملیات
        <div className="flex items-center gap-x-2.5">
          <span className="flex w-px h-[30px] bg-white"></span>
          <svg
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <use href="#arrow-down-2" />
          </svg>
        </div>
      </button>

      {/* منوی انتخاب وضعیت */}
      {isOpen && (
        <div className="custom-shadow absolute bottom-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-20 max-h-60 overflow-y-auto">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
            {options.map((opt) => (
              <li
                key={opt.label}
                onClick={() => handleSelect(opt.label)}
                className="cursor-pointer hover:text-black pb-3"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* مدال */}
      {isModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            عنوان مدال
          </h4>
          <textarea
            placeholder="متن نمونه برای مدال"
            className="custom-shadow w-[240px] h-[150px] mx-auto pt-[15px] pr-[15px] text-[#404040] text-xs/[16.8px] tracking-[-0.12px] bg-white border border-[#EFF0F6] rounded-[10px] outline-none"
          />
          <div className="flex flex-col gap-y-6 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex items-center justify-center w-[239px] h-12 mx-auto leading-6 text-white bg-[#20CFCF] rounded-[10px] tracking-[-0.12px]"
            >
              تایید
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
            >
              منصرف شدم
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OperationAdmin;
