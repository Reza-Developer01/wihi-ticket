import BottomSection from "../components/BottomSection";
import FaqList from "../components/faqs/FaqList";
import Header from "../components/Header";

export const metadata = {
  title: "سوالات متداول",
};

const page = () => {
  return (
    <>
      <Header
        title="سوالات متداول"
        shortDescription="شما با کلیک میتوانیــد جواب آن سوال خود را مشاهده کنید"
        showBackButton={true}
      />

      <BottomSection pb="40px">
        <FaqList />
      </BottomSection>
    </>
  );
};

export default page;
