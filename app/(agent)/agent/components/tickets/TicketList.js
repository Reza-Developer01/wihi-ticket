import Link from "next/link";

const TicketList = ({ data }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "open":
        return {
          bg: "bg-[#0068C933]",
          text: "text-[#0068C9]",
          message: "در دست بررسی",
        };
      case "is_progress":
        return {
          bg: "bg-[#FF770033]",
          text: "text-[#FF7700]",
          message: "منتظر پاسخ کاربر",
        };
      case "closed":
        return {
          bg: "bg-[#FF000033]",
          text: "text-[#FF0000]",
          message: "بسته شده",
        };
      case "Guided":
        return {
          bg: "bg-[#40404033]",
          text: "text-[#404040]",
          message: "هدایت شده",
        };
      default:
        return {
          bg: "bg-[#E5E7EB]",
          text: "text-[#6B7280]",
          message: "در دست بررسی",
        };
    }
  };

  const { bg, text, message } = getStatusStyle(data.status);

  return (
    <div
      className={`custom-shadow w-full h-31 bg-white border ${
        data.has_sla ? "border-[#FF000033]" : "border-[#EFF0F6]"
      } rounded-[10px]`}
    >
      {/* head */}
      <div className="flex items-center justify-between pr-4.5 pl-5 pt-3.5 mb-2.5">
        {/* right */}
        <div className="flex items-center gap-x-0.5 *:rounded-[5px]">
          <button className="flex items-center justify-center w-5 h-5 bg-[#EFF0F6]">
            <svg className="w-3 h-3 text-[#808392]">
              <use href="#document-copy" />
            </svg>
          </button>

          <div className="flex flex-col items-center justify-center w-[50px] h-5 pt-0.5 bg-[#EFF0F6] *:tracking-[-0.12px] *:font-medium">
            <span className="text-[4px]/[5.6px] text-[#B9BBC9]">
              شماره تیکت
            </span>
            <span className="text-[8px]/[11.2px] text-[#808392]">
              {data.ticket_number}
            </span>
          </div>
        </div>

        {/* left */}
        <div className="flex items-center gap-x-[5px] *:rounded-[5px]">
          {/* <div className="flex flex-col items-center justify-center w-15 h-5 pt-0.5 bg-[#EFF0F6] *:tracking-[-0.12px] *:font-medium">
            <span className="text-[4px]/[5.6px] text-[#B9BBC9]">
              دستــه بندی
            </span>
            <span className="text-[6px]/[8.4px] text-[#808392]">
              {data.category_name}
            </span>
          </div> */}

          <button
            className={`flex items-center justify-center w-15 h-5 ${bg} ${text} font-medium text-[8px]/[11.2px] tracking-[-0.12px]`}
          >
            {message}
          </button>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col gap-px w-full px-4.5 mb-[13px]">
        <Link
          href={`/agent/tickets/${data.ticket_number}`}
          className="text-[#8C8C8C] font-medium text-xs/[16.8px]"
        >
          {data.title}
        </Link>
        <p className="text-[#B9BBC9] text-[8px]/[11.2px] tracking-[-0.12px] line-clamp-1">
          {data.description}
        </p>
      </div>

      {/* line */}
      <span className="flex w-[calc(100%-40px)] h-px mx-auto mb-2.5 bg-[#F0F2FE] px-5"></span>

      {/* footer */}
      <div className="flex items-center justify-between pr-4.5 pl-5">
        {/* right */}
        <div className="flex items-center gap-x-0.5">
          <span
            className={`flex items-center justify-center w-[11px] h-[11px] ${
              data.has_sla ? "bg-[#FF0000]" : "bg-[#B9BBC9]"
            } rounded-full font-extrabold text-[4px] text-white`}
          >
            SLA
          </span>

          <p className="text-[#404040] text-[8px]/[11.2px] tracking-[-0.12px]">
            ثبت توسط | {data.owner_name}
          </p>
        </div>

        {/* left */}
        <div className="flex items-center gap-x-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#808392]">
          <span>{new Date(data.created_at).toLocaleTimeString("fa-IR")}</span>
          <span>|</span>
          <span>{new Date(data.created_at).toLocaleDateString("fa-IR")}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
