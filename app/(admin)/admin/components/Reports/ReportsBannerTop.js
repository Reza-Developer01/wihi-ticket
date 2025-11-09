import Image from "next/image";

import ticket from "@/public/images/svgs/ticket.svg";

const ReportsBannerTop = ({ data }) => {
  return (
    <div className="reports__banner flex items-center justify-between">
      <div className="flex flex-col">
        <Image
          src={ticket}
          alt="ticket"
          className="flex items-start mb-[15px]"
        />

        <div className="flex flex-col gap-y-[5px]">
          <span className="text-[#9C0101] text-[10px]/3.5 tracking-[-0.12px]">
            میانگیـــن پاسخگــویی
          </span>
          <p className="reports__text-gradient font-extrabold text-lg/[25.2px] tracking-[-0.12px]">
            {data.average_callrequest_response_time}
          </p>
        </div>
      </div>

      <div className="flex gap-x-[5px]">
        <div className="flex flex-col items-center justify-center gap-y-[7px] w-[65px] h-[65px] bg-[#9C01010D] text-[#9C0101] rounded-[7px]">
          <span className="flex h-[23px] font-extrabold text-2xl/[33.6px]">
            {data.total_response_callrequests}
          </span>
          <span className="inline-block w-10 mx-auto font-medium text-[5px]/[7px] tracking-[-0.12px]">
            تعداد کل پاسخگویی درخواست تــــــماس
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-[7px] w-[65px] h-[65px] bg-[#9C01010D] text-[#9C0101] rounded-[7px]">
          <span className="flex h-[23px] font-extrabold text-2xl/[33.6px]">
            {data.total_response_ticket}
          </span>
          <span className="inline-block w-10 mx-auto font-medium text-[5px]/[7px] tracking-[-0.12px]">
            تعداد کل پاسخگویی درخواست تیکتینــگ
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportsBannerTop;
