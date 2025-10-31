import Image from "next/image";
import BottomSection from "../components/BottomSection";
import Header from "../components/Header";

import successfully from "@/public/images/svgs/successfully.svg";
import Button from "../components/Button";

export const metadata = {
  title: "موفقیت آمیز",
};

const page = () => {
  return (
    <>
      <Header showBackButton={true} />

      <BottomSection pb="63px">
        <div className="flex flex-col gap-y-6">
          <Image src={successfully} alt="successfully" />

          <div className="flex items-center justify-center h-[150px]">
            <p className="text-[#0D0D1B] font-bold text-lg/[27px] tracking-[-0.12px]">
              ارسال درخواست با موفقیت ثبت شده به شماره تیکت “{" "}
              <span className="text-[#2DD2D2]">145632</span> ” نتیجـــه اعلام
              خواهــد شد
            </p>
          </div>

          <Button href="/requests-list" text="مشاهده تیکت" />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
