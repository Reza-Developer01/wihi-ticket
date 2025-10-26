import Header from "../components/Header";
import BottomSection from "../components/BottomSection";
import RegistersList from "../components/requestsList/RequestsList";
import Button from "../components/Button";

export const metadata = {
  title: "لیست درخواست ها",
};

const page = () => {
  return (
    <>
      <Header
        title="ثبت درخواست"
        shortDescription="شما در این بخش آخرین تیکت های ارسالی خود را مشاهده میکنید"
        showBackButton={true}
      />

      <BottomSection pb="25px">
        {/* items */}
        <RegistersList />

        <div className="flex items-center justify-center gap-x-1 mb-6">
          <span className="text-[#808392] font-medium text-xs/[18px] tracking-[-0.12px]">
            مشاهده 88 درخواست
          </span>
          <svg className="w-[15px] h-[15px] text-[#808392]">
            <use href="#arrow-left-3" />
          </svg>
        </div>

        <Button href="/request-create" text="ثبت تیکت جدید" />
      </BottomSection>
    </>
  );
};

export default page;
