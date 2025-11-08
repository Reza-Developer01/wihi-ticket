"use client";

import { useState, useRef, useEffect } from "react";

const AgentsCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const categories = [
    { id: 1, name: "پشتیبانی فنی" },
    { id: 2, name: "مالی و حسابداری" },
    { id: 3, name: "منابع انسانی" },
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="input-shadow flex items-center justify-between w-full h-[46px] border border-[#EDF1F3] rounded-[10px] overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="pr-12 font-medium text-xs/[16.8px] tracking-[-0.12px] text-[#8C8C8C]">
          {selected ? selected.name : "انتخاب دسته بندی کارشناس"}
        </p>

        <button
          type="button"
          className="flex items-center justify-center w-[62px] h-full border-r border-r-[#EDF1F3]"
        >
          <svg
            className={`w-3 h-3 text-[#6C7278] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <use href="#arrow-down-2" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="custom-shadow absolute top-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-10 max-h-60 overflow-y-auto">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
            {categories.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer hover:text-black pb-3 ${
                  selected?.id === item.id ? "text-black font-semibold" : ""
                }`}
                onClick={() => {
                  setSelected(item);
                  setIsOpen(false);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <input type="hidden" name="agent_category" value={selected?.id || ""} />
    </div>
  );
};

export default AgentsCategories;
