import { cookies } from "next/headers";
import AgentBottomPage from "../components/AgentBottomPage";
import { getFetch } from "@/utils/fetch";
import TicketsWrapper from "../components/tickets/TicketWrapper";
import { getMe } from "@/actions/auth";

export const metadata = {
  title: "تیکت ها",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const { user } = await getMe();

  const tickets = await getFetch("tickets/", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });
  console.log(tickets);

  return (
    <AgentBottomPage mt="mt-[79px]" pb="pb-[24px]" height="79">
      <div className="container">
        <div className="flex flex-col gap-y-[25px] px-6">
          <TicketsWrapper tickets={tickets} user={user} />
        </div>
      </div>
    </AgentBottomPage>
  );
};

export default page;
