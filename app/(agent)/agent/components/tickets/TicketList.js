import Link from "next/link";

const TicketList = () => {
  return (
    <div className="custom-shadow w-full h-31 bg-white border border-[#FF000033] rounded-[10px]">
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
            <span className="text-[8px]/[11.2px] text-[#808392]">146845</span>
          </div>
        </div>

        {/* left */}
        <div className="flex items-center gap-x-[5px] *:rounded-[5px]">
          <div className="flex flex-col items-center justify-center w-15 h-5 pt-0.5 bg-[#EFF0F6] *:tracking-[-0.12px] *:font-medium">
            <span className="text-[4px]/[5.6px] text-[#B9BBC9]">
              دستــه بندی
            </span>
            <span className="text-[6px]/[8.4px] text-[#808392]">
              پشتیبانی فنی
            </span>
          </div>

          <button className="flex items-center justify-center w-15 h-5 bg-[#0068C933] text-[#0068C9] font-medium text-[8px]/[11.2px] tracking-[-0.12px]">
            در دست بررسی
          </button>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col gap-px w-full px-4.5 mb-[13px]">
        <Link href="/" className="text-[#8C8C8C] font-medium text-xs/[16.8px]">
          عنوان درخواست تماس در اینجا
        </Link>
        <p className="text-[#B9BBC9] text-[8px]/[11.2px] tracking-[-0.12px] line-clamp-1">
          خلاصه چندین کلمـــه اول توضیحات کاربــر درباره مشکل پیش آمـــده . . .
        </p>
      </div>

      {/* line */}
      <span className="flex w-[calc(100%-40px)] h-px mx-auto mb-2.5 bg-[#F0F2FE] px-5"></span>

      {/* footer */}
      <div className="flex items-center justify-between pr-4.5 pl-5">
        {/* right */}
        <div className="flex items-center gap-x-0.5">
          <span className="flex items-center justify-center w-[11px] h-[11px] bg-[#FF0000] rounded-full font-extrabold text-[4px] text-white">
            SLA
          </span>

          <p className="text-[#404040] text-[8px]/[11.2px] tracking-[-0.12px]">
            ثبت توسط | علی محسنی
          </p>
        </div>

        {/* left */}
        <p className="text-[#808392] font-medium text-[8px]/[11.2px] tracking-[-0.12px]">
          1404/06/25 | 12 : 45 : 28
        </p>
      </div>
    </div>
  );
};

export default TicketList;
