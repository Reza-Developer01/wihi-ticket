import Head from "../../components/Head";
import CheckOtpForm from "../../components/CheckOtpForm";
import ShowPhoneNumber from "../../components/ShowPhoneNumber";

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
        <ShowPhoneNumber />
      </Head>

      <CheckOtpForm />
    </>
  );
};

export default page;
