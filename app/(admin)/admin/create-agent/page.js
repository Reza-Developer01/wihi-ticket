import AdminBottomPage from "../components/AdminBottomPage";
import CreateUserForm from "../components/CreateAgent/CreateAgentForm";
import CreateUserHead from "../components/CreateAgent/CreateAgentHead";
import SubTitle from "../components/SubTitle";

export const metadata = {
  title: "افزودن کاربر",
};

const page = () => {
  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px]">
      <section>
        <div className="container">
          {/* head */}
          <CreateUserHead />

          <SubTitle title="اطلاعات هویتــی کارشناس" w="w-[90px]" />

          {/* form */}
          <CreateUserForm />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
