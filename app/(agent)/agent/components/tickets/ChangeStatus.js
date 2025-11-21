"use client";

import { useState, useRef, useEffect } from "react";

const ChangeStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("در صف تماس");
  const dropdownRef = useRef(null);

  const options = ["در صف تماس", "هدایت شده", "بررسی شده", "لغو شده"];

  // بستن با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3.5 w-full h-12 mt-[9px] bg-[#20CFCF] text-white font-medium leading-6 rounded-[10px]"
      >
        <div></div>
        {selected}
        <div className="border-r border-r-white pr-3 flex items-center">
          <svg
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <use href="#arrow-down" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="custom-shadow absolute bottom-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-20 max-h-60 overflow-y-auto">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
            {options.map((item) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className="cursor-pointer hover:text-black pb-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChangeStatus;
