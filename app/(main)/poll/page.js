import Link from "next/link";
import BottomSection from "../components/BottomSection";
import Button from "../components/Button";
import Header from "../components/Header";
import PollSystem from "../components/poll/PollSystem";

export const metadata = {
  title: "ثبت نظرسنجی",
};

const page = () => {
  return (
    <>
      <Header
        title="ثبت نظرسنجـی"
        shortDescription="درصد رضایت خود را از نام کارشناس مربوطه را وارد کنید"
        showBackButton={true}
      />

      <BottomSection pb="55px">
        <form action="#" className="flex flex-col gap-y-9">
          <PollSystem />

          <textarea
            className="custom-shadow w-full h-[300px] p-6 text-xs/[16.8px] font-medium border border-[#EFF0F6] rounded-[10px] outline-none tracking-[-0.12px] placeholder:text-[#8C8C8C]"
            placeholder="سوال متداول شماره یک"
          ></textarea>

          <Link
            href="/"
            className={`flex items-center justify-center w-full h-12 mb-[31px] leading-6 bg-[#20CFCF] text-white rounded-[10px] tracking-[-0.12px]`}
          >
            ارسال نظرسنجی
          </Link>
        </form>
      </BottomSection>
    </>
  );
};

export default page;
