import CloseTicket from "@/app/(main)/components/requestsDetail/CloseTicket";
import HistoryStatus from "./HistoryStatus";

const Messages = ({ request }) => {
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

  return (
    <div className="relative h-[520px]">
      {/* head */}
      <div className="flex items-center justify-between mb-[15px]">
        <button
          type="button"
          className="flex items-center justify-center gap-x-[13px] w-[150px] h-[30px] bg-[#292D321A] text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]"
        >
          انتخاب کارشناس مربوطـــــه
          <svg className="w-[15px] h-[15px]">
            <use href="#arrow-down" />
          </svg>
        </button>

        <button className="flex items-center justify-between w-[121px] h-[30px] px-2.5 rounded-[7px] bg-[#292D321A]">
          <div className="flex items-center gap-x-[5px]">
            <svg className="w-[15px] h-[15px] text-[#17C7C7]">
              <use href="#info" />
            </svg>

            <span className="text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px]">
              {message}
            </span>
          </div>

          <svg className="w-[15px] h-[15px]">
            <use href="#arrow-down" />
          </svg>
        </button>
      </div>

      {/* body */}
      <div className="flex flex-col overflow-y-auto gap-y-[25px] h-[calc(100%-54px)]">
        {/* item */}
        {request.messages.map((item) => (
          <div key={item.id} className="flex flex-col gap-y-2.5 *:w-[245px]">
            {/* text */}
            {item.file ? (
              <>
                <div className="custom-shadow flex items-center h-12 pr-2.5 bg-white border border-[#F1F1F7] rounded-[10px]">
                  <p className="text-[#404040] text-xs/[16.8px] w-[202px]">
                    {item.message}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center w-[45px] h-[45px] border border-[#808392] rounded-[10px]"
                  >
                    <svg className="w-6 h-6 text-[#808392]">
                      <use href="#paper-download" />
                    </svg>
                    <span className="text-[#808392] text-[7px]/[9.8px] tracking-[-0.12px]">
                      {item.file
                        ? item.file
                            .split("/")
                            .pop()
                            .split(".")
                            .pop()
                            .toUpperCase()
                        : ""}
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div className="custom-shadow flex items-center h-12 pr-2.5 bg-white border border-[#F1F1F7] rounded-[10px]">
                <p className="text-[#404040] text-xs/[16.8px] w-[202px]">
                  {item.message}
                </p>
              </div>
            )}

            {/* info */}
            <div className="flex items-center justify-between text-[#8C8C8C]">
              {/* right */}
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
        ))}
      </div>

      {/* <HistoryStatus /> */}
    </div>
  );
};

export default Messages;
