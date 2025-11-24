"use client";

import { useSearchParams } from "next/navigation";
import AgentBottomPage from "../../components/AgentBottomPage";
import Header from "@/app/(main)/components/Header";
import SuccessfullyStatus from "../../components/SuccessfullyStatus";

const page = () => {
  const searchParams = useSearchParams();
  const ticketNumber = searchParams.get("ticket");

  return (
    <>
      <Header showBackButton={true} />

      <AgentBottomPage pb="pb-[49px]">
        <div className="container">
          <SuccessfullyStatus ticketNumber={ticketNumber} />
        </div>
      </AgentBottomPage>
    </>
  );
};

export default page;
