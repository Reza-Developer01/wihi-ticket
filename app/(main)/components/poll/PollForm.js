import Link from "next/link";
import PollSystem from "./PollSystem";
import TextArea from "../TextArea";

const PollForm = () => {
  return (
    <form action="#" className="flex flex-col gap-y-9">
      <PollSystem />

      <TextArea height="300px" placeholder="سوال متداول شماره یک" />

      <Link
        href="/"
        className={`flex items-center justify-center w-full h-12 mb-[31px] leading-6 bg-[#20CFCF] text-white rounded-[10px] tracking-[-0.12px]`}
      >
        ارسال نظرسنجی
      </Link>
    </form>
  );
};

export default PollForm;
