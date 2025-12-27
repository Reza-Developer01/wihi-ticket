import SelectorsItem from "./SelectorsItem";

const selectorItems = [
  {
    id: 1,
    text: "ثبت درخواست | تیکت",
    href: "/requests-list",
  },
  {
    id: 2,
    text: "درخواست تماس تلفنی",
    href: "/call",
  },
  {
    id: 3,
    text: "گزارشات",
    href: "/reports",
  },
  {
    id: 4,
    text: "پرسش های متداول",
    href: "/faqs",
  },
];

const Selectors = () => {
  return (
    <section>
      <div className="flex flex-col gap-y-[15px]">
        {selectorItems.map((item) => (
          <SelectorsItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Selectors;
