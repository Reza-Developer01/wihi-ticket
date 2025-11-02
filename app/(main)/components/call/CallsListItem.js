import Link from "next/link";

const CallsListItem = () => {
  return (
    <div className="custom-shadow w-full bg-white border border-[#EFF0F6] rounded-[10px]">
      {/* head */}
      <div className="flex items-center justify-between pl-5 pr-[18px] pt-[13px] mb-2">
        {/* right side */}
        <div className="flex flex-col font-medium text-[8px]/[11.2px] tracking-[-0.12px]">
          <span className="text-[#B9BBC9]">شماره تیکت</span>
          <span className="text-[#808392]">146845</span>
        </div>

        {/* left side */}
        <div className="flex items-center justify-center w-[60px] h-5 rounded-[5px] bg-[#0068C933]">
          <span className="font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#0068C9]">
            در دست بررسی
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col gap-y-px pr-[18px] mb-[13px]">
        <Link
          href="/"
          className="font-medium text-xs/[16.8px] tracking-[-0.12px] text-[#8C8C8C]"
        >
          عنوان درخواست تماس در اینجا
        </Link>
        <p className="w-[215px] line-clamp-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#B9BBC9]">
          خلاصه چندین کلمـــه اول توضیحات کاربــر درباره مشکل پیش آمـــده . . .
        </p>
      </div>

      {/* line */}
      <span className="flex w-[calc(100%-40px)] mx-auto h-px bg-[#F0F2FE] px-5 mb-2.5"></span>

      {/* footer */}
      <div className="flex items-center justify-between px-5 pb-[17px]">
        <span className="text-[8px]/[11.2px] tracking-[-0.12px] text-[#404040]">
          ثبت توسط | علی محسنی
        </span>

        <div className="flex items-center gap-x-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#808392]">
          <span>12 : 45 :28</span>
          <span>|</span>
          <span>1404 / 06 /25</span>
        </div>
      </div>
    </div>
  );
};

export default CallsListItem;
