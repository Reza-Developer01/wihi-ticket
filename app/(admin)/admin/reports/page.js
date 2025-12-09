import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import AdminBottomPage from "../components/AdminBottomPage";
import ReportsFilter from "../components/Reports/ReportsFilter";
import ReportsBanner from "../components/Reports/ReportsBanner";

const Page = async ({ searchParams }) => {
  const filter = searchParams?.filter || "daily";

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const data = await getFetch(`reports/?filter=${filter}`, {
    Authorization: `Bearer ${token}`,
  });

  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px] h-[calc(100vh-79px)]">
      <section>
        <div className="container">
          <ReportsFilter
            fullReports={data.full_reports}
            currentFilter={filter}
          />
          <ReportsBanner data={data.full_reports} />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default Page;
