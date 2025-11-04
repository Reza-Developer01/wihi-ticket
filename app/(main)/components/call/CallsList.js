"use client";

import { useState } from "react";
import CallsListItem from "./CallsListItem";

const CallsList = ({ callsList }) => {
  const total = callsList.length;
  const [visibleCount, setVisibleCount] = useState(3);
  const remaining = total - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, total));
  };

  return (
    <>
      <div className="flex flex-col gap-y-[15px] mb-6">
        {callsList.slice(0, visibleCount).map((item) => (
          <CallsListItem key={item.call_request_number} {...item} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-x-1 mb-6">
        {remaining > 0 ? (
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-x-1"
          >
            <span className="text-[#808392] font-medium text-xs/[18px] tracking-[-0.12px]">
              مشاهده {remaining} درخواست
            </span>

            <svg className="w-[15px] h-[15px] text-[#808392]">
              <use href="#arrow-left-3" />
            </svg>
          </button>
        ) : (
          <span className="text-[#808392] font-medium text-xs/[18px] tracking-[-0.12px]">
            همهٔ درخواست‌ها نمایش داده شد
          </span>
        )}
      </div>
    </>
  );
};

export default CallsList;
