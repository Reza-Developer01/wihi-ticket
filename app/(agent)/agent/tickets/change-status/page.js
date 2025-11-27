"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AgentBottomPage from "../../components/AgentBottomPage";
import Header from "@/app/(main)/components/Header";
import SuccessfullyStatus from "../../components/SuccessfullyStatus";

const ChangeStatusPage = () => {
  const searchParams = useSearchParams();
  const ticketNumber = searchParams.get("ticket");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header showBackButton={true} />
      <AgentBottomPage pb="pb-[49px]">
        <div className="container">
          <SuccessfullyStatus ticketNumber={ticketNumber} />
        </div>
      </AgentBottomPage>
    </Suspense>
  );
};

export default ChangeStatusPage;
