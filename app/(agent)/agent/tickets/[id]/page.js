import React from "react";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import Header from "@/app/(main)/components/Header";
import AgentBottomPage from "../../components/AgentBottomPage";
import Messages from "../../components/tickets/Messages";
import MessageInput from "../../components/tickets/MessageInput";
import Successfully from "../../components/Successfully";

export const metadata = {
  title: "جزییات درخواست",
};

const page = async ({ params }) => {
  const { id } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const getRequest = await getFetch(`tickets/${id}/`, {
    Authorization: `Bearer ${token}`,
  });

  return (
    <>
      <Header showBackButton={true} />

      <AgentBottomPage pb="pb-[49px]">
        <div className="container">
          <div className="flex flex-col gap-y-[15px]">
            <Messages request={getRequest} />

            <MessageInput
              requestStatus={getRequest.status}
              ticketNumber={getRequest.ticket_number}
              id={id}
            />
          </div>

          {/* <Successfully /> */}
        </div>
      </AgentBottomPage>
    </>
  );
};

export default page;
