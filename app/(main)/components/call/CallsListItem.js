import Link from "next/link";

const CallsListItem = ({
  call_request_number,
  status,
  title,
  description,
  updated_at,
  owner_name,
}) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "queue_call":
        return {
          bg: "bg-[#FF770033]",
          text: "text-[#FF7700]",
          message: "درصف تماس",
        };
      case "Guided":
        return {
          bg: "bg-[#40404033]",
          text: "text-[#404040]",
          message: "هدایت شده",
        };
      case "Checked":
        return {
          bg: "bg-[#00C96B33]",
          text: "text-[#00C96B]",
          message: "بررسی شده",
        };
      case "cancelled":
        return {
          bg: "bg-[#FF000033]",
          text: "text-[#FF0000]",
          message: "لغو شده",
        };
      case "is_progress":
        return {
          bg: "bg-[#0068C933]",
          text: "text-[#0068C9]",
          message: "در دست بررسی",
        };
      default:
        return {
          bg: "bg-[#E5E7EB]",
          text: "text-[#6B7280]",
          message: "نا مشخص",
        };
    }
  };

  const { bg, text, message } = getStatusStyle(status);

  return (
    <div className="custom-shadow w-full bg-white border border-[#EFF0F6] rounded-[10px]">
      {/* head */}
      <div className="flex items-center justify-between pl-5 pr-[18px] pt-[13px] mb-2">
        {/* right side */}
        <div className="flex flex-col font-medium text-[8px]/[11.2px] tracking-[-0.12px]">
          <span className="text-[#B9BBC9]">شماره درخواست</span>
          <span className="text-[#808392]">{call_request_number}</span>
        </div>

        {/* left side */}
        <div
          className={`flex items-center justify-center w-[60px] h-5 rounded-[5px] ${bg}`}
        >
          <span
            className={`font-medium text-[8px]/[11.2px] tracking-[-0.12px] ${text}`}
          >
            {message}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col gap-y-px pr-[18px] mb-[13px]">
        <Link
          href={`/call-request/${call_request_number}`}
          className="font-medium text-xs/[16.8px] tracking-[-0.12px] text-[#8C8C8C]"
        >
          {title}
        </Link>

        <p className="w-[215px] line-clamp-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#B9BBC9]">
          {description}
        </p>
      </div>

      {/* line */}
      <span className="flex w-[calc(100%-40px)] mx-auto h-px bg-[#F0F2FE] px-5 mb-2.5"></span>

      {/* footer */}
      <div className="flex items-center justify-between px-5 pb-[17px]">
        <span className="text-[8px]/[11.2px] tracking-[-0.12px] text-[#404040]">
          ثبت توسط | {owner_name}
        </span>

        <div className="flex items-center gap-x-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#808392]">
          <span>{new Date(updated_at).toLocaleTimeString("fa-IR")}</span>
          <span>|</span>
          <span>{new Date(updated_at).toLocaleDateString("fa-IR")}</span>
        </div>
      </div>
    </div>
  );
};

export default CallsListItem;
