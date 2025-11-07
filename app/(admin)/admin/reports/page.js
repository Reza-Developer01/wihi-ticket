import AdminBottomPage from "../components/AdminBottomPage";
import ReportsFilter from "../components/Reports/ReportsFilter";

export const metadata = {
  title: "ادمین - گزارشات",
};

const page = () => {
  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px]">
      <section>
        <div className="container">
          {/* filter */}
          <ReportsFilter />

          {/* information */}
          <div className="flex flex-col gap-y-[15px]">
            {/* top */}
            <div></div>

            {/* bottom */}
            <div></div>
          </div>
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
