import { cookies } from "next/headers";
import AdminBottomPage from "../../../components/AdminBottomPage";
import ReportsPageClient from "../../../components/Reports/ReportsPageClient";
import { getFetch } from "@/utils/fetch";

export const metadata = {
  title: "گزارشات کاربر",
};

const page = async ({ searchParams, params }) => {
  const { id } = params;
  console.log(id);
  const initialFilter = searchParams?.filter || "daily";
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const data = await getFetch(`reports/customers/${id}`, {
    Authorization: `Bearer ${token}`,
  });

  const customer = data?.report_customers?.[0];

  const normalizedData = customer
    ? {
        // --- ReportsBannerTop ---
        total_response_callrequests: customer.total_response_callrequests,
        total_response_ticket: customer.total_response_tickets,

        average_combined_response_time: `میانگین پاسخگویی تماس: ${customer.average_callrequest_response_time} | میانگین پاسخگویی تیکت: ${customer.average_ticket_response_time}`,

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
      }
    : null;

  console.log(data);

  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px] h-[calc(100vh-79px)]">
      <section>
        <div className="container">
          <ReportsPageClient
            initialFilter={initialFilter}
            token={token}
            prefetchedData={normalizedData}
          />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
