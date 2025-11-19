import { getFetch } from "@/utils/fetch";
import ChangeAgentButton from "./ChangeAgentButton";
import ChangeStatusButton from "./ChangeStatusButton";
import { cookies } from "next/headers";

const MessagesHead = async ({ message, ticket_number }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const agents = await getFetch("users/agents-list/", {
    Authorization: `Bearer ${token}`,
  });
  console.log(agents);

  return (
    <div className="flex items-center justify-between mb-[15px]">
      <ChangeAgentButton />

      <ChangeStatusButton message={message} ticket_number={ticket_number} />
    </div>
  );
};

export default MessagesHead;
