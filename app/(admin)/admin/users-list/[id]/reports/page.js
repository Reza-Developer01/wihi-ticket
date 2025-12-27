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
