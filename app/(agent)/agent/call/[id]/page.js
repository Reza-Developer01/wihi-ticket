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
  console.log(`token : ${token}`);

  const getCall = await getFetch(`callrequests/${params.id}`, {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  const categories = await getFetch("category-callrequests", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  const services = await getFetch("service-callrequests", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  const issues = await getFetch("service-issues", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

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
    <AgentBottomPage mt="mt-[79px]" pb="pb-[24px]">
      <div className="container">
        <div className="flex flex-col gap-y-[25px] px-6">
          <CreateTicketForm
            categories={categories}
            services={services}
            issues={issues}
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
