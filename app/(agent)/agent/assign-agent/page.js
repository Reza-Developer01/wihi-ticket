import Header from "@/app/(main)/components/Header";
import AgentBottomPage from "../components/AgentBottomPage";
import ClientAssignAgent from "../components/ClientAssignAgent";

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
