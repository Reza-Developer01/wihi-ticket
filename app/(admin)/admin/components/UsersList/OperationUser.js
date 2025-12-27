"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { changeUserStatus } from "@/actions/user";

const OperationUser = ({ userId, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const options = [
    ...(isActive ? [{ label: "غیرفعالسازی" }] : [{ label: "فعالسازی" }]),
  ];

  const handleSelect = async (label) => {
    if (label === "فعالسازی" || label === "غیرفعالسازی") {
      const status = label === "فعالسازی";
      const res = await changeUserStatus(userId, status);

      if (res?.status) {
        toast.success(
          status ? "کاربر با موفقیت فعال شد" : "کاربر با موفقیت غیرفعال شد"
        );
        router.refresh();
      } else {
        toast.error(res?.message || "خطا در انجام عملیات");
      }
    }

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
    <div className="relative w-full mt-4" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between pl-3.5 pr-[45px] w-full h-12 text-white font-medium leading-6 rounded-[10px] bg-[#20CFCF]"
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

      {isOpen && (
        <div className="custom-shadow absolute bottom-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-20">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6]">
            {options.map((opt) => (
              <li
                key={opt.label}
                onClick={() => handleSelect(opt.label)}
                className="cursor-pointer hover:text-black"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OperationUser;
