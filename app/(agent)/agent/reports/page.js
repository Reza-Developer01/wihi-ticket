import { getFetch } from "@/utils/fetch";
import AdminBottomPage from "../components/AdminBottomPage";
import ReportsBanner from "../components/Reports/ReportsBanner";
import ReportsFilter from "../components/Reports/ReportsFilter";
import { cookies } from "next/headers";

export const metadata = {
  title: "ادمین - گزارشات",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const data = await getFetch("reports/", {
    Authorization: `Bearer ${token}`,
  });

  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px] h-[calc(100vh-79px)]">
      <section>
        <div className="container">
          {/* filter */}
          <ReportsFilter />

          {/* information */}
          <ReportsBanner data={data} />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
