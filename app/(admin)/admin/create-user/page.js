import AdminBottomPage from "../components/AdminBottomPage";
import CreateUserForm from "../components/CreateUser/CreateUserForm";
import CreateUserHead from "../components/CreateUser/CreateUserHead";
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
