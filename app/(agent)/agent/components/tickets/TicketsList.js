import TicketList from "./TicketList";

const TicketsList = ({ tickets }) => {
  return (
    <div className="flex flex-col gap-y-6">
      {tickets.map((ticket) => (
        <TicketList key={ticket.ticket_number} data={ticket} />
      ))}
    </div>
  );
};

export default TicketsList;
