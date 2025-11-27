import ReportsBannerBottomItem from "./ReportsBannerBottomItem";

const ReportsBannerBottom = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-[15px] *:grow">
      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#FF70171A] text-[#FF7017] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.totla_tickets_SLA}
        </span>
        <span
          className={`inline-block w-10 text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کل تیکت های باز دارای SLA
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#219E9E1A] text-[#29B2B2] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.in_progress_tickets}
        </span>
        <span
          className={`inline-block w-10 text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کل تیکت های منتظـــــــــــــر پاسخ
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#219E9E1A] text-[#29B2B2] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.open_tickets}
        </span>
        <span
          className={`inline-block w-10 text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کل تیکت هـــــای باز
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#219E9E1A] text-[#29B2B2] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.totla_tickets}
        </span>
        <span
          className={`inline-block w-10 text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کل درخواست تیکتینـــــــــــــــــــگ
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#FF70171A] text-[#FF7017] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.total_callrequests_SLA}
        </span>
        <span
          className={`inline-block w-[50px] text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کلدرخواست تماس تلفنــــــــــی باز دارای SLA
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#219E9E1A] text-[#29B2B2] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.guided_callrequests}
        </span>
        <span
          className={`inline-block w-10 text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کل درخـــــــــواست تماس تلفنی هدایت شده
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#219E9E1A] text-[#29B2B2] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.callـqueue_callrequets}
        </span>
        <span
          className={`inline-block w-10 text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کل درخواست تماس تلفنـــــــی باز
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#219E9E1A] text-[#29B2B2] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.total_callrequests}
        </span>
        <span
          className={`inline-block w-10 text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کل درخواست تماس تلفنـــــــــــــی
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center gap-y-[7px] w-[66px] h-[67px] bg-[#219E9E1A] text-[#29B2B2] rounded-[7px]`}
      >
        <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
          {data.cancelled_callrequests}
        </span>
        <span
          className={`inline-block w-[50px] text-center font-medium text-[5px]/[7px]`}
        >
          تعداد کل درخـــــــــواست تماس تلفنی لغـــــو شده
        </span>
      </div>
    </div>
  );
};

export default ReportsBannerBottom;
