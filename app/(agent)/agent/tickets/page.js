import { cookies } from "next/headers";
import AgentBottomPage from "../components/AgentBottomPage";
import { getFetch } from "@/utils/fetch";
import TicketsWrapper from "../components/tickets/TicketWrapper";

export const metadata = {
  title: "تیکت ها",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const tickets = await getFetch("tickets/", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });
  console.log(tickets);

  return (
    <AgentBottomPage mt="mt-[79px]" pb="pb-[24px]">
      <div className="flex flex-col gap-y-[25px] px-6">
        <TicketsWrapper tickets={tickets} />
      </div>
    </AgentBottomPage>
  );
};

export default page;
