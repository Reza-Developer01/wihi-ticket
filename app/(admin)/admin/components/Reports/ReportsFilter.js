"use client";
import Link from "next/link";

const ReportsFilter = ({ currentFilter, onFilterChange }) => {
  const items = [
    { id: "daily", label: "روزانــه" },
    { id: "weekly", label: "هفتگی" },
    { id: "monthly", label: "ماهانـه" },
    { id: "custom", label: "فیلتر دلخـــواه" },
  ];

  return (
    <div className="flex items-center justify-between mb-[25px]">
      <div className="h-[35px] bg-[#EFF0F6] rounded-[7px]">
        <ul className="flex items-center gap-x-3 h-full pr-1.5 pl-[9px] font-medium text-[10px]/3.5 text-[#292D32] tracking-[-0.12px]">
          {items.map((item) => (
            <li
              key={item.id}
              // onClick={() => onFilterChange(item.id)}
              className={`flex items-center justify-center h-[25px] rounded-[7px] cursor-pointer transition-all
                ${
                  currentFilter === item.id
                    ? "pr-[13px] pl-2.5 bg-[#292D32] text-[#EFF0F6]"
                    : "text-[#292D32]"
                }`}
            >
              <Link href={`?filter=${item.id}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/">
        <svg className="w-6 h-6 text-[#1A1C1E]">
          <use href="#arrow-narrow-left" />
        </svg>
      </Link>
    </div>
  );
};

export default ReportsFilter;
