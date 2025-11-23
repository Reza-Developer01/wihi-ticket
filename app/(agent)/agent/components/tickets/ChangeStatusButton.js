"use client";

import changeStatus from "@/actions/changeStatusTicket";
import { useState } from "react";
import HistoryStatus from "./HistoryStatus";
import toast from "react-hot-toast";

const statusMap = {
  "در دست بررسی": "is_progress",
  "منتظر پاسخ": "open",
  "بسته شده": "closed",
  "هدایت شده": "Guided",
};

const reverseStatusMap = Object.fromEntries(
  Object.entries(statusMap).map(([key, value]) => [value, key])
);

const ChangeStatusButton = ({
  message,
  ticket_number,
  getTicketHistory,
  status,
}) => {
  console.log({ ticket_number, getTicketHistory, status });

  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(
    reverseStatusMap[status] || status
  );
  const [showHistory, setShowHistory] = useState(false);

  const handleSelect = async (value) => {
    if (value === "مشاهده تغییرات") {
      setShowHistory((prev) => !prev);
      setOpen(false);
      return;
    }

    setSelectedMessage(value);
    setOpen(false);

    const response = await changeStatus(ticket_number, statusMap[value]);
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
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
          {[...Object.keys(statusMap), "مشاهده تغییرات"].map((item) => (
            <span
              key={item}
              onClick={() => handleSelect(item)}
              className="cursor-pointer hover:bg-gray-100 text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] px-2 py-1 rounded-[5px] transition"
            >
              {item}
            </span>
          ))}
        </div>

        {showHistory && (
          <HistoryStatus
            getTicketHistory={getTicketHistory}
            setShowHistory={setShowHistory}
          />
        )}
      </button>
    </>
  );
};

export default ChangeStatusButton;
