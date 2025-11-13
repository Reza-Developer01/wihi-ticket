import Modal from "../Modal";

const HistoryStatus = () => {
  return (
    <Modal>
      <h2 className="text-[#2AD1D1] font-semibold leading-[22.4px] mb-6">
        تاریخچــــه تغییرات
      </h2>

      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-[3px] px-5">
          <span className="text-[#6C7278] font-medium text-xs/[19.2px] tracking-[-0.64px]">
            1404/08/20 | 14:20
          </span>

          <div className="w-full h-[46px] bg-white border border-[#EDF1F3] rounded-[10px]">
            <span className="flex items-center h-full pr-3.5 text-[#6C7278] font-medium text-xs/[16.8px] tracking-[-0.12px]">
              هدایت شده | نام کارشناسی که هدایت کرده
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-[3px] px-5">
          <span className="text-[#6C7278] font-medium text-xs/[19.2px] tracking-[-0.64px]">
            1404/08/20 | 14:20
          </span>

          <div className="w-full h-[46px] bg-white border border-[#EDF1F3] rounded-[10px]">
            <span className="flex items-center h-full pr-3.5 text-[#6C7278] font-medium text-xs/[16.8px] tracking-[-0.12px]">
              هدایت شده | نام کارشناسی که هدایت کرده
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HistoryStatus;
