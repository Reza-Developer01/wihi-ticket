import BottomSection from "../components/BottomSection";
import Header from "../components/Header";
import PollForm from "../components/poll/PollForm";

export const metadata = {
  title: "ثبت نظرسنجی",
};

const page = async ({ searchParams }) => {
  const id = searchParams?.id;
  console.log(id);

  return (
    <>
      <Header
        title="ثبت نظرسنجـی"
        shortDescription="درصد رضایت خود را از نام کارشناس مربوطه را وارد کنید"
        showBackButton={true}
      />

      <BottomSection pb="55px" height="249">
        <div className="container">
          <PollForm id={id} />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
