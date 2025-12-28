"use client";

import { useState, useEffect } from "react";
import { getFetch } from "@/utils/fetch";
import ReportsFilter from "./ReportsFilter";
import ReportsBanner from "./ReportsBanner";
import ReportsSkeleton from "./ReportsSkeleton";

const ReportsPageClient = ({ initialFilter, token, prefetchedData }) => {
  const [filter, setFilter] = useState(initialFilter || "daily");
  const [customRange, setCustomRange] = useState({ from: null, to: null });
  const [data, setData] = useState(null);

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  console.log("Current pathname:", pathname);
  console.log("initialFilter:", initialFilter);
  console.log("prefetchedData:", prefetchedData);

  const normalizeUserData = (rawData) => {
    console.log("Normalizing user data:", rawData);
    const customer = rawData?.report_customers?.[0];
    if (!customer) return null;

    return {
      // --- ReportsBannerTop ---
      total_response_callrequests: customer.total_response_callrequests,
      total_response_ticket: customer.total_response_tickets,
      average_combined_response_time: `${customer.average_callrequest_response_time} / ${customer.average_ticket_response_time}`,

      // --- ReportsBannerBottom ---
      total_callrequests: customer.total_callrequests,
      totla_tickets: customer.total_tickets,

      // فیلدهایی که کاربر نداره (صفر می‌ذاریم)
      totla_tickets_SLA: 0,
      in_progress_tickets: 0,
      open_tickets: 0,
      total_callrequests_SLA: 0,
      guided_callrequests: 0,
      callـqueue_callrequets: 0,
      cancelled_callrequests: 0,
    };
  };

  const fetchData = async (filterValue, range = {}) => {
    let url = "";
    if (
      pathname.startsWith("/admin/users-list/") &&
      pathname.endsWith("/reports")
    ) {
      // مسیر کاربر
      const userId = pathname.split("/")[3]; // /admin/users-list/:id/reports
      url = `reports/customers/${userId}?filter=${filterValue}`;
      if (filterValue === "custom" && range.from && range.to) {
        const fromISO = range.from.toISOString().split("T")[0];
        const toISO = range.to.toISOString().split("T")[0];
        url += `&from=${fromISO}&to=${toISO}`;
      }
    } else {
      // مسیر ادمین
      url = `reports/?filter=${filterValue}`;
      if (filterValue === "custom" && range.from && range.to) {
        const fromISO = range.from.toISOString().split("T")[0];
        const toISO = range.to.toISOString().split("T")[0];
        url += `&from=${fromISO}&to=${toISO}`;
      }
    }

    console.log("fetchData triggered with URL:", url);

    try {
      const result = await getFetch(url, { Authorization: `Bearer ${token}` });
      console.log("fetchData result:", result);

      let finalData = result.full_reports || result;

      if (
        pathname.startsWith("/admin/users-list/") &&
        pathname.endsWith("/reports")
      ) {
        finalData = normalizeUserData(result);
      }

      setData(finalData);
      console.log("Current data after setData:", finalData);
    } catch (err) {
      console.error("fetchData error:", err);
      setData(null);
    }
  };

  // --- Effect for initial render and whenever filter/customRange changes ---
  useEffect(() => {
    const pathname = window.location.pathname;

    // مسیر کاربران: هر بار fetchData اجرا شود
    if (
      pathname.startsWith("/admin/users-list/") &&
      pathname.endsWith("/reports")
    ) {
      fetchData(filter, customRange, pathname);
      return;
    }

    // مسیر دیگه: فقط بار اول prefetchedData
    if (prefetchedData && !filter) {
      setData(prefetchedData);
      return;
    }

    fetchData(filter, customRange, pathname);
  }, [filter, customRange, prefetchedData]);

  if (!data) return <ReportsSkeleton />;

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
