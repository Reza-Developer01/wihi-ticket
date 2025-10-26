"use client";

import { useState, useRef, useEffect } from "react";

const DropDown = ({
  options = [],
  placeholder = "انتخاب کنید",
  labelKey = "label",
  valueKey = "value",
  onChange,
  defaultValue = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onChange?.(option[valueKey]);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="custom-shadow flex items-center justify-between w-full h-12 px-[19px] border border-[#EFF0F6] rounded-[10px] bg-white"
      >
        <div></div>
        <span className="font-medium text-sm/[19.6px] text-[#8C8C8C] truncate">
          {selected ? selected[labelKey] : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-[#A8A8A8] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <use href="#arrow-down-2" />
        </svg>
      </button>

      {isOpen && options.length > 0 && (
        <div className="custom-shadow absolute top-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-10 max-h-60 overflow-y-auto">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6]">
            {options.map((option) => (
              <li
                key={option[valueKey]}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer hover:text-black pb-3 ${
                  selected?.[valueKey] === option[valueKey]
                    ? "text-black font-semibold"
                    : ""
                }`}
              >
                {option[labelKey]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && options.length === 0 && (
        <div className="absolute top-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] text-center text-sm text-gray-400 z-10">
          هیچ گزینه‌ای یافت نشد
        </div>
      )}
    </div>
  );
};

export default DropDown;
