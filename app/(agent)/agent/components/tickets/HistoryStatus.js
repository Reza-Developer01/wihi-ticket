import Modal from "../Modal";

const HistoryStatus = ({ getTicketHistory, setShowHistory }) => {
  return (
    <Modal>
      <h2 className="text-[#2AD1D1] font-semibold text-right leading-[22.4px] mb-6">
        تاریخچــــه تغییرات
      </h2>

      <div className="flex flex-col gap-y-6 h-[200px] overflow-auto">
        {getTicketHistory.map((item) => (
          <div key={item.id} className="flex flex-col gap-y-[3px] px-5">
            <span className="text-[#6C7278] font-medium text-xs/[19.2px] text-right tracking-[-0.64px]">
              {new Date(item.created_at).toLocaleDateString("fa-IR")} |{" "}
              {new Date(item.created_at).toLocaleTimeString("fa-IR")}
            </span>

            <div className="w-full h-[46px] bg-white border border-[#EDF1F3] rounded-[10px]">
              <span className="flex items-center h-full pr-3.5 text-[#6C7278] font-medium text-xs/[16.8px] tracking-[-0.12px]">
                {item.new_status_display} | {item.changed_by_name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShowHistory(false);
        }}
        className="flex items-center justify-center mx-auto mt-6 w-[calc(100%-40px)] h-12 bg-[#20CFCF] text-white rounded-[10px] font-medium"
      >
        تایید
      </a>
    </Modal>
  );
};

export default HistoryStatus;
