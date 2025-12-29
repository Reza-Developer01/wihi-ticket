const ReportsBannerBottom = ({ data, isUserView }) => {
  const bottomItems = isUserView
    ? [
        {
          value: data.total_callrequests,
          label: "تعداد کل درخواست تماس تلفنی",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.totla_tickets,
          label: "تعداد کل درخواست تیکتینـــــــــــــــــــگ",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.total_response_callrequests,
          label: "تعداد کل درخواست تماس های پاسخ داده شده",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.total_response_ticket,
          label: "تعداد کل تیکتینـــــــــــــــــــگ های پاسخ داده شده",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
      ]
    : [
        {
          value: data.totla_tickets_SLA,
          label: "تعداد کل تیکت های باز دارای SLA",
          bg: "#FF70171A",
          textColor: "#FF7017",
          width: "w-[66px]",
        },
        {
          value: data.open_tickets,
          label: "تعداد کل تیکت های منتظـــــــــــــر پاسخ",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.in_progress_tickets,
          label: "تعداد کل تیکت هـــــای باز",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.totla_tickets,
          label: "تعداد کل درخواست تیکتینـــــــــــــــــــگ",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.total_callrequests_SLA,
          label: "تعداد کلدرخواست تماس تلفنــــــــــی باز دارای SLA",
          bg: "#FF70171A",
          textColor: "#FF7017",
          width: "w-[66px]",
        },
        {
          value: data.guided_callrequests,
          label: "تعداد کل درخـــــــــواست تماس تلفنی هدایت شده",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.is_progress_callrequets,
          label: "تعداد کل درخواست تماس تلفنـــــــی باز",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.total_callrequests,
          label: "تعداد کل درخواست تماس تلفنـــــــــــــی",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
        {
          value: data.cancelled_callrequests,
          label: "تعداد کل درخـــــــــواست تماس تلفنی لغـــــو شده",
          bg: "#219E9E1A",
          textColor: "#29B2B2",
          width: "w-[66px]",
        },
      ];

  return (
    <div className="flex flex-wrap gap-[15px] *:grow">
      {bottomItems.map((item, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center justify-center gap-y-[7px] ${item.width} h-[67px] rounded-[7px]`}
          style={{
            backgroundColor: item.bg,
            color: item.textColor,
          }}
        >
          <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
            {item.value}
          </span>
          <span
            className={`inline-block w-10 text-center font-medium text-[5px]/[7px]`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ReportsBannerBottom;
