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
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const getAgents = await getFetch("users/agents", {
    Authorization: `Bearer ${token}`,
  });

  return (
    <>
      <AdminHeader />

      <InformationSection />

      <AdminBottomPage pb="pb-9">
        <PagesLinks getAgents={getAgents} />

        <AdminFooter />
      </AdminBottomPage>
    </>
  );
};

export default page;
