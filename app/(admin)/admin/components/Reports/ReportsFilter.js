"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ReportsFilter = ({ currentFilter, onFilterChange, onCustomDate }) => {
  const [range, setRange] = useState([]);
  const [showCustom, setShowCustom] = useState(false);

  const handleClick = (id) => {
    if (typeof onFilterChange === "function") {
      onFilterChange(id); // فقط اگر تابع واقعی باشد صدا زده می‌شود
    }
    setShowCustom(id === "custom");
  };

  const handleRange = (val) => {
    setRange(val);

    if (val?.length === 2) {
      const [from, to] = val;
      if (typeof onCustomDate === "function") {
        onCustomDate({
          from: from?.toDate(),
          to: to?.toDate(),
        });
      }
    }
  };

  const items = [
    { id: "daily", label: "روزانــه" },
    { id: "weekly", label: "هفتگی" },
    { id: "monthly", label: "ماهانــه" },
    { id: "custom", label: "فیلتر دلخـــواه" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-[25px]">
        <div className="h-[35px] bg-[#EFF0F6] rounded-[7px]">
          <ul className="flex items-center gap-x-3 h-full pr-1.5 pl-[9px] font-medium text-[10px] text-[#292D32]">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`flex items-center justify-center h-[25px] rounded-[7px] cursor-pointer transition-all ${
                  currentFilter === item.id
                    ? "pr-[13px] pl-2.5 bg-[#292D32] text-[#EFF0F6]"
                    : "text-[#292D32]"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showCustom && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="mb-3 text-sm font-semibold">انتخاب تاریخ دلخواه</h3>

          <DatePicker
            value={range}
            onChange={handleRange}
            range
            rangeHover
            plugins={[<rangePlugin position="bottom" />]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            style={{
              width: "100%",
              fontSize: "14px",
              padding: "12px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ReportsFilter;
