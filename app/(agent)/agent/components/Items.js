import Item from "./Item";

const Items = ({ getInfo }) => {
  console.log(getInfo);
  return (
    <div className="items__wrapper w-[calc(100%-13px)] h-28 mx-auto pt-6 pb-[18px] pl-6 pr-[29px] rounded-2xl">
      <div className="flex items-center justify-center gap-x-4">
        <Item number={getInfo.open_tickets} title="تیکت باز" />
        <Item number={getInfo.callqueue_callrequests} title="تماس باز" />
        <Item number={getInfo.waiting_for_response} title="منتظر پاسخ" />
        <Item
          number={getInfo.total_tickets_and_callrequests}
          title="تعداد کل"
          isActive={true}
        />
      </div>
    </div>
  );
};

export default Items;
