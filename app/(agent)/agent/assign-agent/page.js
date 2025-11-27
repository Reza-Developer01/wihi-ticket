import Header from "@/app/(main)/components/Header";
import AgentBottomPage from "../components/AgentBottomPage";
import dynamic from "next/dynamic";

const ClientAssignAgent = dynamic(
  () => import("../components/ClientAssignAgent"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <Header showBackButton={true} />
      <AgentBottomPage pb="pb-[49px]">
        <div className="container">
          <ClientAssignAgent />
        </div>
      </AgentBottomPage>
    </>
  );
}
