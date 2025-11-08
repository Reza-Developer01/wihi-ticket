import AdminBottomPage from "../components/AdminBottomPage";
import CreateAgentForm from "../components/CreateAgent/CreateAgentForm";
import CreateAgentHead from "../components/CreateAgent/CreateAgentHead";
import SubTitle from "../components/SubTitle";

export const metadata = {
  title: "افزودن کارشناس",
};

const page = () => {
  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px]">
      <section>
        <div className="container">
          {/* head */}
          <CreateAgentHead />

          <SubTitle title="اطلاعات هویتــی کارشناس" w="w-[90px]" />

          {/* form */}
          <CreateAgentForm />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
