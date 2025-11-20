"use client";

import { useState } from "react";
import TicketsHead from "./TicketsHead";
import TicketsList from "./TicketsList";
import Button from "@/app/(main)/components/Button";

const TicketsWrapper = ({ tickets, user }) => {
  const [filters, setFilters] = useState({});

  return (
    <>
      <TicketsHead setFilters={setFilters} />
      <TicketsList tickets={tickets} filters={filters} user={user} />
      <Button href="/agent/tickets/create" text="ثبت تیکت جدید" />
    </>
  );
};

export default TicketsWrapper;
