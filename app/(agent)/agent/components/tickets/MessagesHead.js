import { getFetch } from "@/utils/fetch";
import ChangeAgentButton from "./ChangeAgentButton";
import ChangeStatusButton from "./ChangeStatusButton";
import { cookies } from "next/headers";
import { getMe } from "@/actions/auth";

const MessagesHead = async ({
  message,
  ticket_number,
  getTicketHistory,
  status,
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const { user } = await getMe();
  const hasPermission = user.permissions.some(
    (p) => p.slug === "can_redirect_ticket"
  );

  const agents = await getFetch("users/agents-list/", {
    Authorization: `Bearer ${token}`,
  });
  console.log(agents);

  return (
    <div className="flex items-center justify-between mb-[15px]">
      <ChangeAgentButton
        hasPermission={hasPermission}
        agents={agents}
        ticket_number={ticket_number}
      />

      <ChangeStatusButton
        message={message}
        ticket_number={ticket_number}
        getTicketHistory={getTicketHistory}
        status={status}
      />
    </div>
  );
};

export default MessagesHead;
