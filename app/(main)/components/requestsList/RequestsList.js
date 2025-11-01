import RequestsListItem from "./RequestsListItem";

const RequestsList = ({ requestsList }) => {
  return (
    <div className="flex flex-col gap-y-[15px] mb-6">
      {requestsList.map((item) => (
        <RequestsListItem key={item.ticket_number} {...item} />
      ))}
    </div>
  );
};

export default RequestsList;
