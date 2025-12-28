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
  request,
}) => {
  console.log("REQ :", request);
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const { user } = await getMe();
  const hasPermission = user.permissions.some(
    (p) => p.slug === "can_assign_tickets"
  );

  let agents;
  if (hasPermission) {
    agents = await getFetch("users/agents-list/", {
      Authorization: `Bearer ${token}`,
    });
  }

  return (
    <div className="flex items-center justify-between mb-[15px]">
      <div className="flex flex-col gap-y-[7px] w-full">
        <div className="flex items-center justify-between w-full">
          {status !== "closed" && (
            <ChangeAgentButton
              hasPermission={hasPermission}
              agents={agents}
              ticket_number={ticket_number}
            />
          )}

          {status !== "closed" && (
            <ChangeStatusButton
              message={message}
              ticket_number={ticket_number}
              getTicketHistory={getTicketHistory}
              status={status}
              user={user}
            />
          )}
        </div>

        {request.status === "Guided" && (
          <span className="text-[#404040] font-medium text-[10px]">
            هدایت شده توسط “{request.agent_guided_name}”
          </span>
        )}
      </div>
    </div>
  );
};

export default MessagesHead;
