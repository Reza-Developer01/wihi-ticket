import AdminFooter from "@/app/(admin)/admin/components/AdminFooter";
import AgentBottomPage from "./components/AgentBottomPage";
import AgentHeader from "./components/AgentHeader";
import InformationSection from "./components/InformationSection";
import PagesLinks from "./components/PagesLinks";
import AgentFooter from "./components/AgentFooter";
import { getMe } from "@/actions/auth";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";

export const metadata = {
  title: "کارشناسان",
};

const page = async () => {
  const { user } = await getMe();
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const getInfo = await getFetch("reports/", {
    Authorization: `Bearer ${token}`,
  });

  return (
    <>
      <AgentHeader />

      <InformationSection getInfo={getInfo.limited_reports} />

      <AgentBottomPage pb="pb-9" height="415">
        <PagesLinks user={user} />

        <AgentFooter />
      </AgentBottomPage>
    </>
  );
};

export default page;
