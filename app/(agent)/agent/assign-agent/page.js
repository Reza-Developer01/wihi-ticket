"use client";

import { useSearchParams } from "next/navigation";
import Successfully from "../components/Successfully";
import AgentBottomPage from "../components/AgentBottomPage";
import Header from "@/app/(main)/components/Header";

const page = () => {
  const searchParams = useSearchParams();
  const ticketNumber = searchParams.get("ticket");

  return (
    <>
      <Header showBackButton={true} />

      <AgentBottomPage pb="pb-[49px]">
        <div className="container">
          <Successfully ticketNumber={ticketNumber} />
        </div>
      </AgentBottomPage>
    </>
  );
};

export default page;
