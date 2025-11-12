import AdminFooter from "@/app/(admin)/admin/components/AdminFooter";
import AgentBottomPage from "./components/AgentBottomPage";
import AgentHeader from "./components/AgentHeader";
import InformationSection from "./components/InformationSection";
import PagesLinks from "./components/PagesLinks";
import AgentFooter from "./components/AgentFooter";

export const metadata = {
  title: "کارشناسان - ادمین",
};

const page = async () => {
  return (
    <>
      <AgentHeader />

      <InformationSection />

      <AgentBottomPage pb="pb-9">
        <PagesLinks />

        <AgentFooter />
      </AgentBottomPage>
    </>
  );
};

export default page;
