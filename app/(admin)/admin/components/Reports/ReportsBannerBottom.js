import ReportsBannerBottomItem from "./ReportsBannerBottomItem";

const items = [
  {
    number: "2",
    title: "تعداد کل تیکت های باز دارای SLA",
    bg: "bg-[#FF70171A]",
    text: "text-[#FF7017]",
  },
  { number: "8", title: "تعداد کل تیکت های منتظـــــــــــــر پاسخ" },
  { number: "16", title: "تعداد کل تیکت هـــــای باز" },
  { number: "45", title: "تعداد کل درخواست تیکتینـــــــــــــــــــگ" },
  {
    number: "1",
    title: "تعداد کلدرخواست تماس تلفنــــــــــی باز دارای SLA",
    bg: "bg-[#FF70171A]",
    text: "text-[#FF7017]",
    width: "w-[50px]",
  },
  {
    number: "8",
    title: "تعداد کل درخـــــــــواست تماس تلفنی هدایت شده",
    width: "w-[50px]",
  },
  { number: "7", title: "تعداد کل درخواست تماس تلفنـــــــی باز" },
  { number: "22", title: "تعداد کل درخواست تماس تلفنـــــــــــــی" },
  {
    number: "8",
    title: "تعداد کل درخـــــــــواست تماس تلفنی لغـــــو شده",
    width: "w-[50px]",
  },
];

const ReportsBannerBottom = () => {
  return (
    <div className="flex flex-wrap gap-[15px] *:grow">
      {items.map((item, index) => (
        <ReportsBannerBottomItem key={index} {...item} />
      ))}
    </div>
  );
};

export default ReportsBannerBottom;
