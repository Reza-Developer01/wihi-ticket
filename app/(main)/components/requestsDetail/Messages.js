const Messages = () => {
  return (
    <div className="relative h-[520px]">
      {/* head */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex items-center justify-center w-[100px] h-[30px] bg-[#CCE1F4] text-[#0068C9] font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]"
        >
          در دست بررسی
        </button>

        <button
          type="button"
          className="flex items-center justify-center w-[100px] h-[30px] bg-[#40404033] text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]"
        >
          بستن درخواست
        </button>
      </div>

      {/* body */}
      <div className="flex flex-col justify-end gap-y-[25px] h-[calc(100%-39px)]">
        {/* item */}
        <div className="flex flex-col gap-y-2.5 *:w-[245px]">
          {/* text */}
          <div className="custom-shadow flex items-center h-12 pr-2.5 bg-white border border-[#F1F1F7] rounded-[10px]">
            <p className="text-[#404040] text-xs/[16.8px] w-[202px]">
              متن درخواست در این بخش نوشته خواهد شد این را در نظر داشته باشیــد
            </p>
          </div>

          {/* info */}
          <div className="flex items-center justify-between text-[#8C8C8C]">
            {/* right */}
            <div className="flex items-center gap-x-1">
              <svg className="w-2.5 h-2.5">
                <use href="#profile" />
              </svg>
              <span className="font-light text-[10px]/[14px] tracking-[-0.12px]">
                علی محسنی
              </span>
            </div>

            {/* left */}
            <span className="font-light text-[10px]/[14px] tracking-[-0.12px]">
              13:47 - 1404/6/25
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
