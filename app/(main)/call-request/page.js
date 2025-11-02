import BottomSection from "../components/BottomSection";
import CallRequestForm from "../components/call/CallRequestForm";
import Header from "../components/Header";

export const metadata = {
  title: "درخواست تماس جدید",
};

const page = () => {
  return (
    <>
      <Header
        title="درخواست جدید"
        shortDescription="لطفا در فراینــد ثبت درخواست , اطلاعات خواسته شده را با دقت وارد کنیــد"
        showBackButton={true}
      />

      <BottomSection pb="49px">
        <CallRequestForm />
      </BottomSection>
    </>
  );
};

export default page;
