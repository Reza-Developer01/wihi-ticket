import { cookies } from "next/headers";
import AgentBottomPage from "../components/AgentBottomPage";
import TicketsHead from "../components/tickets/TicketsHead";
import TicketsList from "../components/tickets/TicketsList";
import { getFetch } from "@/utils/fetch";

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
    <AgentBottomPage mt="mt-[79px]" h="h-[calc(100vh-79px)]">
      <div className="flex flex-col gap-y-[25px] px-6">
        <TicketsHead />

        <TicketsList tickets={tickets} />
      </div>
    </AgentBottomPage>
  );
};

export default page;
