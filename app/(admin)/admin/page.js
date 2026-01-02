import { getFetch } from "@/utils/fetch";
import "./admin.css";
import AdminBottomPage from "./components/AdminBottomPage";
import AdminFooter from "./components/AdminFooter";
import AdminHeader from "./components/AdminHeader";
import InformationSection from "./components/InformationSection";
import PagesLinks from "./components/PagesLinks";
import { cookies } from "next/headers";

export const metadata = {
  title: "ادمین - خانه",
};

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const data = await getFetch("reports/", {
    Authorization: `Bearer ${token}`,
  });

  return (
    <>
      <AdminHeader />

      <InformationSection data={data.limited_reports} />

      <AdminBottomPage pb="pb-9">
        <PagesLinks data={data.full_reports} />

        <AdminFooter />
      </AdminBottomPage>
    </>
  );
};

export default page;
