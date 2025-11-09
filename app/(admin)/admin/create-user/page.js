import AdminBottomPage from "../components/AdminBottomPage";
import CreateUserFilter from "../components/CreateUser/CreateUserFilter";
import CreateUserHead from "../components/CreateUser/CreateUserHead";
import SubTitle from "../components/SubTitle";

export const metadata = {
  title: "افزودن کاربر",
};

const page = () => {
  return (
    <AdminBottomPage mt="h-[calc(100vh-79px)] mt-[79px] pb-[50px]">
      <section>
        <div className="container">
          {/* head */}
          <CreateUserHead />

          <SubTitle title="اطلاعات هویتــی کاربر" w="w-[90px]" />

          <CreateUserFilter />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
