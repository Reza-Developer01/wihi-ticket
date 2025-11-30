"use client";

import { useState } from "react";
import CallHead from "./CallHead";
import CallList from "./CallList";

const CallWrapper = ({ calls, user }) => {
  const [filters, setFilters] = useState({});

  // 👈 اضافه شد
  const [search, setSearch] = useState("");

  return (
    <>
      {/* 👈 فقط prop مربوط به search اضافه شد */}
      <CallHead setFilters={setFilters} setSearch={setSearch} />
      <CallList calls={calls} filters={filters} search={search} user={user} />
    </>
  );
};

export default CallWrapper;
