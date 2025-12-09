import { cookies } from "next/headers";
import AdminBottomPage from "../components/AdminBottomPage";
import ReportsPageClient from "../components/Reports/ReportsPageClient";

const Page = async ({ searchParams }) => {
  const initialFilter = searchParams?.filter || "daily";
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px] h-[calc(100vh-79px)]">
      <section>
        <div className="container">
          <ReportsPageClient initialFilter={initialFilter} token={token} />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default Page;
