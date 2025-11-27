"use client";

import { useState } from "react";
import RequestsListItem from "./RequestsListItem";

const RequestsList = ({ requestsList }) => {
  const total = requestsList.length;
  const [visibleCount, setVisibleCount] = useState(3);
  const remaining = total - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, total));
  };

  return (
    <>
      <div className="flex flex-col gap-y-[15px] mb-6">
        {total === 0 ? (
          <span className="text-[#808392] text-center font-medium text-xs/[18px] tracking-[-0.12px]">
            تیکتی برای نمایش وجود ندارد
          </span>
        ) : (
          requestsList
            .slice(0, visibleCount)
            .map((item) => (
              <RequestsListItem key={item.ticket_number} {...item} />
            ))
        )}
      </div>

      {total > 0 && remaining > 0 && (
        <div className="flex items-center justify-center gap-x-1">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-x-1 mb-6"
          >
            <span className="text-[#808392] font-medium text-xs/[18px] tracking-[-0.12px]">
              مشاهده {remaining} درخواست
            </span>

            <svg className="w-[15px] h-[15px] text-[#808392]">
              <use href="#arrow-left-3" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default RequestsList;
