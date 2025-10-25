import RegistersListItem from "./RequestsListItem";

const registers = [
  {
    id: "146845",
    status: "در دست بررسی",
    title: "درخواست تمدید اشتراک",
    description: "کاربر درخواست تمدید اشتراک خود را ارسال کرده است.",
    author: "علی محسنی",
    date: "1404 / 06 / 25 | 12 : 45 : 28",
  },
  {
    id: "146846",
    status: "منتظر پاسخ کاربر",
    title: "مشکل در پرداخت",
    description: "در هنگام پرداخت خطای بانکی دریافت شده است.",
    author: "محمد احمدی",
    date: "1404 / 06 / 26 | 10 : 12 : 03",
  },
  {
    id: "146847",
    status: "بسته شده",
    title: "پیشنهاد افزودن ویژگی جدید",
    description: "کاربر پیشنهاد افزودن حالت شب را مطرح کرده است.",
    author: "سارا زمانی",
    date: "1404 / 06 / 27 | 09 : 33 : 45",
  },
];

const RegistersList = () => {
  return (
    <div className="flex flex-col gap-y-[15px] mb-6">
      {registers.map((item) => (
        <RegistersListItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default RegistersList;
