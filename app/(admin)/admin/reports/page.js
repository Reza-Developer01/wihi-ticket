import AdminBottomPage from "../components/AdminBottomPage";
import ReportsBanner from "../components/Reports/ReportsBanner";
import ReportsFilter from "../components/Reports/ReportsFilter";

export const metadata = {
  title: "ادمین - گزارشات",
};

const page = () => {
  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px] h-[calc(100vh-79px)]">
      <section>
        <div className="container">
          {/* filter */}
          <ReportsFilter />

          {/* information */}
          <ReportsBanner />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
