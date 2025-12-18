import { cookies } from "next/headers";
import AdminBottomPage from "../components/AdminBottomPage";
import CreateUserFilter from "../components/CreateUser/CreateUserFilter";
import CreateUserHead from "../components/CreateUser/CreateUserHead";
import SubTitle from "../components/SubTitle";
import { getFetch } from "@/utils/fetch";

export const metadata = {
  title: "افزودن کاربر",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const services = await getFetch("service-tickets/", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px]">
      <section>
        <div className="container">
          {/* head */}
          <CreateUserHead />

          <SubTitle title="اطلاعات هویتــی کاربر" w="w-[90px]" />

          <CreateUserFilter services={services} />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
