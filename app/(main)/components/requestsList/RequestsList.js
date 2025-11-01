import RegistersListItem from "./RequestsListItem";

const RegistersList = ({ requestsList }) => {
  return (
    <div className="flex flex-col gap-y-[15px] mb-6">
      {requestsList.map((item) => (
        <RegistersListItem key={item.ticket_number} {...item} />
      ))}
    </div>
  );
};

export default RegistersList;
