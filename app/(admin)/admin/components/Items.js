import Item from "./Item";

const Items = () => {
  return (
    <div className="items__wrapper w-[calc(100%-13px)] h-28 mx-auto pt-6 pb-[18px] pl-6 pr-[29px] rounded-2xl">
      <div className="flex items-center justify-center gap-x-4">
        <Item number="98" title="تیکت باز" />
        <Item number="78" title="تماس باز" />
        <Item number="24" title="منتظر پاسخ" />
        <Item number="514" title="تعداد کل" isActive={true} />
      </div>
    </div>
  );
};

export default Items;
