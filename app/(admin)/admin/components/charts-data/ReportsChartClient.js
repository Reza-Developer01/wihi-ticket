"use client";

import { useState, useEffect } from "react";
import { getFetch } from "@/utils/fetch";
import ReportsFilter from "../../components/Reports/ReportsFilter";
import TicketChart from "../../components/charts-data/TicketChart";
import CallChart from "../../components/charts-data/CallChart";

const ReportsChartClient = ({ agentId, headers }) => {
  const [filter, setFilter] = useState("daily");
  const [customRange, setCustomRange] = useState({ from: null, to: null });
  const [data, setData] = useState(null);

  const fetchData = async (filterValue, range = {}) => {
    let effectiveFilter = "custom";

    let url = `reports/chart/${agentId}?filter=${effectiveFilter}`;

    // فقط وقتی خود فیلتر custom است، تاریخ بفرست
    if (filterValue === "custom" && range.from && range.to) {
      const fromISO = range.from.toISOString().split("T")[0];
      const toISO = range.to.toISOString().split("T")[0];
      url += `&from=${fromISO}&to=${toISO}`;
    }

    console.log("🟢 FINAL URL:", url);

    const result = await getFetch(url, headers);
    setData(result.agents);
  };

  useEffect(() => {
    console.log("🔵 useEffect TRIGGERED", {
      filter,
      customRange,
    });
    fetchData(filter, customRange);
  }, [filter, customRange]);

  if (!data) return <p>در حال بارگذاری...</p>;

  return (
    <>
      <ReportsFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        onCustomDate={setCustomRange}
      />

      <div className="flex flex-col gap-y-5">
        <TicketChart ticket={data.tickets} />
        <CallChart call={data.callrequests} />
      </div>
    </>
  );
};

export default ReportsChartClient;
