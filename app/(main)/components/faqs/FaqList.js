import Button from "../Button";
import FaqItem from "./FaqItem";

const faqItems = [
  {
    title: "سوال متداول شماره یک",
    detail: "این بخش مربوط به توضیح کامل سوال شماره یک است.",
  },
  {
    title: "سوال متداول شماره دو",
    detail: "اینجا توضیحات مربوط به سوال متداول شماره دو قرار می‌گیرد.",
  },
  {
    title: "سوال متداول شماره سه",
    detail: "در این قسمت توضیحاتی در مورد سوال سوم نوشته می‌شود.",
  },
  {
    title: "سوال متداول شماره چهار",
    detail: "توضیحات و جزییات کامل سوال شماره چهار.",
  },
  {
    title: "سوال متداول شماره پنج",
    detail: "پاسخ و توضیحات تکمیلی مربوط به سوال پنجم.",
  },
  { title: "سوال متداول شماره شش", detail: "جزییات مربوط به سوال ششم." },
  { title: "سوال متداول شماره هفت", detail: "جزییات سوال هفتم." },
];

const FaqList = () => {
  return (
    <div className="flex flex-col gap-y-[15px]">
      {faqItems.map((item, index) => (
        <FaqItem key={index} item={item} />
      ))}

      <Button href="/request-create" text="جوابم رو پیدا نکردم !" />
    </div>
  );
};

export default FaqList;
