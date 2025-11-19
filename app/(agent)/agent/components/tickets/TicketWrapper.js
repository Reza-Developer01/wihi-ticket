"use client";

import { useState } from "react";
import TicketsHead from "./TicketsHead";
import TicketsList from "./TicketsList";
import Button from "@/app/(main)/components/Button";

const TicketsWrapper = ({ tickets }) => {
  const [filters, setFilters] = useState({});

  return (
    <>
      <TicketsHead setFilters={setFilters} />
      <TicketsList tickets={tickets} filters={filters} />
      <Button href="/" text="ثبت تیکت جدید" />
    </>
  );
};

export default TicketsWrapper;
