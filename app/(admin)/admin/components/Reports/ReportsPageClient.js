"use client";

import { useState, useEffect } from "react";
import { getFetch } from "@/utils/fetch";
import ReportsFilter from "./ReportsFilter";
import ReportsBanner from "./ReportsBanner";

const ReportsPageClient = ({ initialFilter, token }) => {
  const [filter, setFilter] = useState(initialFilter || "daily");
  const [customRange, setCustomRange] = useState({ from: null, to: null });
  const [data, setData] = useState(null);

  const fetchData = async (filterValue, range = {}) => {
    let url = `reports/?filter=${filterValue}`;
    if (filterValue === "custom" && range.from && range.to) {
      const fromISO = range.from.toISOString().split("T")[0];
      const toISO = range.to.toISOString().split("T")[0];
      url += `&from=${fromISO}&to=${toISO}`;
    }

    const result = await getFetch(url, {
      Authorization: `Bearer ${token}`,
    });
    setData(result.full_reports);
  };

  useEffect(() => {
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
      <ReportsBanner data={data} />
    </>
  );
};

export default ReportsPageClient;
