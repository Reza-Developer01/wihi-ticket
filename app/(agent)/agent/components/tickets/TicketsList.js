"use client";

import { useEffect, useState } from "react";
import TicketList from "./TicketList";

const TicketsList = ({ tickets, filters }) => {
  const [filteredTickets, setFilteredTickets] = useState(tickets);

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
  }, [filters, tickets]);

  return (
    <div className="flex flex-col gap-y-6">
      {filteredTickets.map((ticket) => (
        <TicketList key={ticket.ticket_number} data={ticket} />
      ))}
    </div>
  );
};

export default TicketsList;
