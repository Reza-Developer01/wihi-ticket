import AgentHeader from "./components/AgentHeader";
import InformationSection from "./components/InformationSection";

export const metadata = {
  title: "کارشناسان - ادمین",
};

const page = async () => {
  return (
    <>
      <AgentHeader />

      <InformationSection />
    </>
  );
};

export default page;
