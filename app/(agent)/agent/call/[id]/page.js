import { cookies } from "next/headers";
import AgentBottomPage from "../../components/AgentBottomPage";
import CreateTicketForm from "../../components/tickets/CreateTicketForm";
import { getFetch } from "@/utils/fetch";
import { getMe } from "@/actions/auth";

export const metadata = {
  title: "جزییات تماس",
};

const page = async ({ params }) => {
  const { user } = await getMe();
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const getCall = await getFetch(`callrequests/${params.id}`, {
    Authorization: token ? `Bearer ${token}` : undefined,
  });
  console.log("GET CALL : ", getCall);

  let agentsList;

  const hasCanAssign = user.permissions.some(
    (p) => p.slug === "can_assign_callrequests"
  );

  if (hasCanAssign) {
    agentsList = await getFetch("users/agents-list/", {
      Authorization: token ? `Bearer ${token}` : undefined,
    });
  }

  return (
    <AgentBottomPage mt="mt-[79px]" pb="pb-[24px]" height="79">
      <div className="container">
        <div className="flex flex-col gap-y-[25px]">
          <CreateTicketForm
            data={getCall}
            agentsList={agentsList}
            user={user}
          />
        </div>
      </div>
    </AgentBottomPage>
  );
};

export default page;
