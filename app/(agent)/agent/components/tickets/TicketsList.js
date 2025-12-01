"use client";

import { useEffect, useState } from "react";
import TicketList from "./TicketList";

const TicketsList = ({ tickets, filters, user, search }) => {
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [visibleCount, setVisibleCount] = useState(3);

  // const canSeeList =
  //   user?.role === "agent" &&
  //   user?.permissions?.some((p) => p.slug === "view_all_tickets");

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

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title?.toLowerCase().includes(s) ||
          t.description?.toLowerCase().includes(s) ||
          t.owner_name?.toLowerCase().includes(s) ||
          String(t.ticket_number).includes(s)
      );
    }

    setFilteredTickets(result);
    setVisibleCount(3);
  }, [filters, tickets, search]); // 👈 فقط search اضافه شد

  const total = filteredTickets.length;
  const remaining = total - visibleCount;

  const handleLoadMore = () =>
    setVisibleCount((prev) => Math.min(prev + 10, total));

  // if (!canSeeList) {
  //   return (
  //     <div className="text-center text-[#808392] mt-4">
  //       شما دسترسی مشاهده همهٔ تیکت‌ها را ندارید.
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="flex flex-col gap-y-6">
        {total === 0 ? (
          <span className="text-[#808392] text-center font-medium text-xs/[18px] tracking-[-0.12px]">
            تیکتی برای نمایش وجود ندارد
          </span>
        ) : (
          filteredTickets
            .slice(0, visibleCount)
            .map((ticket) => (
              <TicketList key={ticket.ticket_number} data={ticket} />
            ))
        )}
      </div>

      <div className="flex items-center justify-center gap-x-1">
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
          <></>
        )}
      </div>
    </>
  );
};

export default TicketsList;
