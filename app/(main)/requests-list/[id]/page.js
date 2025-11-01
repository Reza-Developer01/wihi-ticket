import React from "react";
import Header from "../../components/Header";
import BottomSection from "../../components/BottomSection";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import Messages from "../../components/requestsDetail/Messages";
import MessageInput from "../../components/requestsDetail/MessageInput";

export const metadata = {
  title: "جزییات درخواست",
};

const page = async ({ params }) => {
  const { id } = await params;

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const getRequest = await getFetch(`tickets/${id}/`, {
    Authorization: `Bearer ${token}`,
  });
  console.log(getRequest);

  return (
    <>
      <Header showBackButton={true} />

      <BottomSection pb="49px">
        <div className="flex flex-col gap-y-[15px]">
          <Messages />

          <MessageInput />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
