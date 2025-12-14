import DownloadButton from "./DownloadButton";
import MessagesHead from "./MessagesHead";

const Messages = ({ request, getTicketHistory, status }) => {
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
  const { bg, text, message } = getStatusStyle(request.status);

  const allMessages = [
    {
      id: "first_message",
      message: request.first_message,
      sender_name: request.owner_name,
      created_at: request.created_at,
      file: request.file,
    },
    ...request.messages,
  ];

  const getMessageStyle = (sender_name, owner_name) => {
    if (sender_name === owner_name) {
      return {
        bg: "bg-white",
        align: "self-end",
      };
    } else {
      return {
        bg: "bg-[#EFF0F6]",
        align: "self-start",
      };
    }
  };

  return (
    <div className="relative h-[520px]">
      {/* head */}
      <MessagesHead
        message={message}
        ticket_number={request.ticket_number}
        getTicketHistory={getTicketHistory}
        status={status}
        request={request}
      />

      {/* body */}
      <div className="flex flex-col overflow-y-auto gap-y-[25px] h-[calc(100%-54px)]">
        {allMessages.map((item) => {
          const { bg, text, align } = getMessageStyle(
            item.sender_name,
            request.owner_name
          );

          return (
            <div
              key={item.id}
              className={`flex flex-col gap-y-2.5 ${align} *:w-[245px]`}
            >
              {item.file ? (
                <>
                  <div
                    className={`custom-shadow flex items-center h-12 pr-2.5 ${bg} border border-[#F1F1F7] rounded-[10px]`}
                  >
                    <p className={`${text} text-xs/[16.8px] w-[202px]`}>
                      {item.message}
                    </p>
                  </div>
                  <div
                    className={`flex items-center ${
                      align === "self-end" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {item.file && <DownloadButton fileUrl={item.file} />}
                  </div>
                </>
              ) : (
                <div
                  className={`custom-shadow flex items-center h-12 pr-2.5 ${bg} border border-[#F1F1F7] rounded-[10px]`}
                >
                  <p className={`${text} text-xs/[16.8px] w-[202px]`}>
                    {item.message}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-[#8C8C8C]">
                <div className="flex items-center gap-x-1">
                  <svg className="w-2.5 h-2.5">
                    <use href="#profile" />
                  </svg>
                  <span className="font-light text-[10px]/[14px] tracking-[-0.12px]">
                    {item.sender_name}
                  </span>
                </div>
                <div className="flex items-center gap-x-1 font-light text-[10px]/[14px] tracking-[-0.12px]">
                  <span>
                    {new Date(item.created_at).toLocaleTimeString("fa-IR")}
                  </span>
                  <span>-</span>
                  <span>
                    {new Date(item.created_at).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
