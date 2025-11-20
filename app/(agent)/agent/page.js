import AdminFooter from "@/app/(admin)/admin/components/AdminFooter";
import AgentBottomPage from "./components/AgentBottomPage";
import AgentHeader from "./components/AgentHeader";
import InformationSection from "./components/InformationSection";
import PagesLinks from "./components/PagesLinks";
import AgentFooter from "./components/AgentFooter";
import { getMe } from "@/actions/auth";

export const metadata = {
  title: "کارشناسان",
};

const page = async () => {
  const { user } = await getMe();

  return (
    <>
      <AgentHeader />

      <InformationSection />

      <AgentBottomPage pb="pb-9">
        <PagesLinks user={user} />

        <AgentFooter />
      </AgentBottomPage>
    </>
  );
};

export default page;
