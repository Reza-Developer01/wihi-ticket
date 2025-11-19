"use client";

import { useEffect, useState } from "react";
import TicketList from "./TicketList";

const TicketsList = ({ tickets, filters }) => {
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    let result = [...tickets];

    if (filters?.hasSla) {
      result = result.filter((t) => t.has_sla);
    }

    if (filters?.newest && !filters?.oldest) {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filters?.oldest && !filters?.newest) {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    setFilteredTickets(result);
    setVisibleCount(3); // هر بار فیلتر تغییر کرد از اول نمایش بده
  }, [filters, tickets]);

  const total = filteredTickets.length;
  const remaining = total - visibleCount;

  const handleLoadMore = () =>
    setVisibleCount((prev) => Math.min(prev + 10, total));

  return (
    <>
      <div className="flex flex-col gap-y-6">
        {filteredTickets.slice(0, visibleCount).map((ticket) => (
          <TicketList key={ticket.ticket_number} data={ticket} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-x-1">
        {remaining > 0 ? (
          <button onClick={handleLoadMore} className="flex items-center gap-x-1">
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

export default TicketsList;
