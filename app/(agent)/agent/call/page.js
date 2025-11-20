import { getMe } from "@/actions/auth";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import AgentBottomPage from "../components/AgentBottomPage";
import TicketsWrapper from "../components/tickets/TicketWrapper";
import CallWrapper from "../components/call/CallWrapper";

export const metadata = {
  title: "تماس ها",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const { user } = await getMe();

  const calls = await getFetch("callrequests/", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });
  console.log(calls);

  return (
    <AgentBottomPage mt="mt-[79px]" pb="pb-[24px]">
      <div className="flex flex-col gap-y-[25px] px-6">
        {/* <TicketsWrapper tickets={tickets} user={user} /> */}
        <CallWrapper calls={calls} user={user} />
      </div>
    </AgentBottomPage>
  );
};

export default page;
