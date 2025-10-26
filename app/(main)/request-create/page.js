import BottomSection from "../components/BottomSection";

import Header from "../components/Header";
import RequestCreateForm from "../components/requestCreate/RequestCreateForm";

export const metadata = {
  title: "ایجاد درخواست جدید",
};

const page = () => {
  return (
    <>
      <Header
        title="درخواست جدید"
        shortDescription="لطفا در فراینــد ثبت درخواست , اطلاعات خواسته شده را با دقت وارد کنیــد"
        showBackButton={true}
      />

      <BottomSection>
        <RequestCreateForm />
      </BottomSection>
    </>
  );
};

export default page;
