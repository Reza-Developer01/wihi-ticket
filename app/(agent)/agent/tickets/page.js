import AgentBottomPage from "../components/AgentBottomPage";
import TicketsHead from "../components/tickets/TicketsHead";
import TicketsList from "../components/tickets/TicketsList";

export const metadata = {
  title: "تیکت ها",
};

const page = () => {
  return (
    <AgentBottomPage mt="mt-[79px]" h="h-[calc(100vh-79px)]">
      <div className="flex flex-col gap-y-[25px] px-6">
        <TicketsHead />

        <TicketsList />
      </div>
    </AgentBottomPage>
  );
};

export default page;
