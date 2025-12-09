"use client";

import { useState, useEffect } from "react";
import { getFetch } from "@/utils/fetch";
import ReportsFilter from "../../components/Reports/ReportsFilter";
import TicketChart from "../../components/charts-data/TicketChart";
import CallChart from "../../components/charts-data/CallChart";

const ReportsChartClient = ({ agentId, headers }) => {
  const [filter, setFilter] = useState("daily");
  const [data, setData] = useState(null);

  const fetchData = async (filterValue) => {
    const result = await getFetch(
      `reports/chart/${agentId}?filter=${filterValue}`,
      headers
    );
    setData(result.agents);
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  if (!data) return <p>در حال بارگذاری...</p>;

  return (
    <>
      <ReportsFilter onFilterChange={setFilter} />
      <TicketChart ticket={data.tickets} />
      <CallChart call={data.callrequests} />
    </>
  );
};

export default ReportsChartClient;
