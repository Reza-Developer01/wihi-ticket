import Image from "next/image";
import BottomSection from "../components/BottomSection";
import Header from "../components/Header";

import successfully from "@/public/images/svgs/successfully-call.svg";
import Button from "../components/Button";
import { cookies } from "next/headers";

export const metadata = {
  title: "موفقیت آمیز",
};

const page = async () => {
  const cookieStore = cookies();
  const callId = (await cookieStore).get("call_id")?.value;

  return (
    <>
      <Header showBackButton={true} />

      <BottomSection pb="63px">
        <div className="flex flex-col gap-y-6">
          <Image src={successfully} alt="successfully" />

          <div className="flex items-center justify-center h-[150px]">
            <p className="text-[#0D0D1B] font-bold text-lg/[27px] tracking-[-0.12px]">
              ارسال درخواست تماس با موفقیت ثبت شده به شماره درخواست{" "}
              <span className="text-[#2DD2D2]">“ {callId} ”</span> نتیجـــه
              اعلام خواهــد شد
            </p>
          </div>

          <Button href="/call" text="مشاهده درخواست" />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
