import BottomSection from "../components/BottomSection";
import Header from "../components/Header";
import PollForm from "../components/poll/PollForm";

export const metadata = {
  title: "ثبت نظرسنجی",
};

const page = () => {
  return (
    <>
      <Header
        title="ثبت نظرسنجـی"
        shortDescription="درصد رضایت خود را از نام کارشناس مربوطه را وارد کنید"
        showBackButton={true}
      />

      <BottomSection pb="55px">
        <div className="container">
          <PollForm />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
