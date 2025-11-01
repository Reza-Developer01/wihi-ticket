import Link from "next/link";

const RequestsListItem = ({
  ticket_number,
  status,
  title,
  description,
  author,
  created_at,
}) => {
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
      default:
        return {
          bg: "bg-[#E5E7EB]",
          text: "text-[#6B7280]",
          message: "در دست بررسی",
        };
    }
  };

  const { bg, text, message } = getStatusStyle(status);

  return (
    <div className="custom-shadow w-full pt-2.5 pb-[15px] pl-3 pr-[15px] bg-white border border-[#EFF0F6] rounded-[10px]">
      {/* head */}
      <div className="flex items-center justify-between">
        {/* right side */}
        <div className="flex flex-col font-medium text-[8px]/[11.2px] tracking-[-0.12px]">
          <span className="text-[#B9BBC9]">شماره تیکت</span>
          <span className="text-[#808392]">{ticket_number}</span>
        </div>

        {/* left side */}
        <div
          className={`flex items-center justify-center w-[70px] h-5 rounded-[5px] ${bg}`}
        >
          <span
            className={`font-medium text-[8px]/[11.2px] tracking-[-0.12px] ${text}`}
          >
            {message}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col gap-y-[5px] mt-1">
        <Link
          href={`/requests-list/${ticket_number}`}
          className="font-medium text-sm/[19.6px] tracking-[-0.12px] text-[#1A1C1E]"
        >
          {title}
        </Link>
        <p className="w-[215px] line-clamp-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#B9BBC9]">
          {description}
        </p>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between mt-[23px]">
        <span className="text-[8px]/[11.2px] tracking-[-0.12px] text-[#404040]">
          ثبت توسط | {author}
        </span>

        <div className="flex items-center gap-x-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#808392]">
          <span>{new Date(created_at).toLocaleTimeString("fa-IR")}</span>
          <span>|</span>
          <span>{new Date(created_at).toLocaleDateString("fa-IR")}</span>
        </div>
      </div>
    </div>
  );
};

export default RequestsListItem;
