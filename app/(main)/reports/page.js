import AdminBottomPage from "@/app/(admin)/admin/components/AdminBottomPage";
import ReportsPageClient from "@/app/(admin)/admin/components/Reports/ReportsPageClient";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

export const metadata = {
  title: "گزارشات",
};

const page = async ({ searchParams }) => {
  const initialFilter = searchParams?.filter || "daily";
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const data = await getFetch("reports/", {
    Authorization: `Bearer ${token}`,
  });

  console.log(data);

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

export default page;
