import { Suspense } from "react";
import Header from "@/app/(main)/components/Header";
import AgentBottomPage from "../../components/AgentBottomPage";
import ChangeStatusClient from "../../components/ChangeStatusClient";

export default function ChangeStatusPage() {
  return (
    <>
      <Header showBackButton={true} />
      <AgentBottomPage pb="pb-[49px]">
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <ChangeStatusClient />
          </Suspense>
        </div>
      </AgentBottomPage>
    </>
  );
}
