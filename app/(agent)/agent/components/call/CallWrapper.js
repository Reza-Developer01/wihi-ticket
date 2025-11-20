"use client";

import { useState } from "react";
import CallHead from "./CallHead";
import CallList from "./CallList";

const CallWrapper = ({ calls, user }) => {
  const [filters, setFilters] = useState({});

  return (
    <>
      {/* <TicketsHead setFilters={setFilters} /> */}
      <CallHead setFilters={setFilters} />
      <CallList calls={calls} filters={filters} user={user} />
      {/* <TicketsList tickets={tickets} filters={filters} user={user} /> */}
    </>
  );
};

export default CallWrapper;
