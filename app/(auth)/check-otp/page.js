import Link from "next/link";
import Head from "../components/Head";
import CheckOtpForm from "../components/CheckOtpForm";

export const metadata = {
  title: "کد تایید",
};

const page = () => {
  return (
    <>
      <Head place="justify-between" arrowNarrowLeft={true}>
        <h1 className="font-bold text-[32px]/[38.4px] text-[#EEEEEE] tracking-[-0.64px]">
          ارسال کد تایید
        </h1>
        <p className="flex items-center gap-x-1.5 text-[#FFFFFFB2] text-xs/[16.8px] tracking-[-0.12px]">
          کد تایید به شماره “ 09139092579 ” ارسال شد لطفا وارد کنید
        </p>
      </Head>

      <CheckOtpForm />
    </>
  );
};

export default page;
