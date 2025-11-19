"use client";

import changeStatus from "@/actions/changeStatusTicket";
import { useState } from "react";

const statusMap = {
  "در دست بررسی": "is_progress",
  "منتظر پاسخ": "open",
  "بسته شده": "closed",
  "هدایت شده": "Guided",
};

const ChangeStatusButton = ({ message, ticket_number }) => {
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(message);

  const handleSelect = async (value) => {
    setSelectedMessage(value);
    setOpen(false);

    await changeStatus(ticket_number, statusMap[value]);
  };

  return (
    <button
      onClick={() => setOpen((value) => !value)}
      className="relative flex items-center justify-between w-[121px] h-[30px] px-2.5 rounded-[7px] bg-[#292D321A]"
    >
      <div className="flex items-center gap-x-[5px]">
        <svg className="w-[15px] h-[15px] text-[#17C7C7]">
          <use href="#info" />
        </svg>

        <span className="text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px]">
          {selectedMessage}
        </span>
      </div>

      <svg
        className={`w-[15px] h-[15px] ${
          open ? "rotate-180" : ""
        } transition-all`}
      >
        <use href="#arrow-down" />
      </svg>

      {/* منوی بازشونده */}
      <div
        className={`custom-shadow ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } absolute top-[calc(100%+4px)] right-0 left-0 flex flex-col gap-y-3 py-3 w-full bg-white border border-[#EDF1F3] rounded-[7px] transition-all`}
      >
        {["در دست بررسی", "منتظر پاسخ", "بسته شده", "هدایت شده"].map((item) => (
          <span
            key={item}
            onClick={() => handleSelect(item)}
            className="cursor-pointer hover:bg-gray-100 text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] px-2 py-1 rounded-[5px] transition"
          >
            {item}
          </span>
        ))}
      </div>
    </button>
  );
};

export default ChangeStatusButton;
