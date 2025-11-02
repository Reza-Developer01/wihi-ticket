import CallsListItem from "./CallsListItem";

const CallsList = () => {
  return (
    <div className="flex flex-col gap-y-[15px]">
      <CallsListItem />
      <CallsListItem />
      <CallsListItem />
    </div>
  );
};

export default CallsList;
