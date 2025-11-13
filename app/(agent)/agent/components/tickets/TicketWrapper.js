"use client";

import { useState } from "react";
import TicketsHead from "./TicketsHead";
import TicketsList from "./TicketsList";

const TicketsWrapper = ({ tickets }) => {
  const [filters, setFilters] = useState({});

  return (
    <>
      <TicketsHead setFilters={setFilters} />
      <TicketsList tickets={tickets} filters={filters} />
    </>
  );
};

export default TicketsWrapper;
