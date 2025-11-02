import BottomSection from "../components/BottomSection";
import Button from "../components/Button";
import CallsList from "../components/call/CallsList";
import Header from "../components/Header";

export const metadata = {
  title: "لیست درخواست تماس ها",
};

const page = () => {
  return (
    <>
      <Header
        title="ثبت درخواست"
        subTitle="تماس"
        hasSubTitle={true}
        shortDescription="شما در این بخش آخرین درخواست تماس خود را مشاهده میکنید"
        showBackButton={true}
      />

      <BottomSection pb="31px">
        <CallsList />

        <div className="flex flex-col items-center gap-y-[15px] mt-[15px]">
          <button className="flex items-center gap-x-1">
            <span className="text-[#808392] font-medium text-xs/[18px] tracking-[-0.12px]">
              مشاهده 88 درخواست
            </span>

            <svg className="w-[15px] h-[15px] text-[#808392]">
              <use href="#arrow-left-3" />
            </svg>
          </button>
          <Button href="/call-request" text="درخواست تماس" />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
