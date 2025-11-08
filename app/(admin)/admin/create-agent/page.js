import { getFetch } from "@/utils/fetch";
import AdminBottomPage from "../components/AdminBottomPage";
import CreateAgentForm from "../components/CreateAgent/CreateAgentForm";
import CreateAgentHead from "../components/CreateAgent/CreateAgentHead";
import SubTitle from "../components/SubTitle";
import { cookies } from "next/headers";

export const metadata = {
  title: "افزودن کارشناس",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const agentsCategory = await getFetch("users/agents-categories/", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  return (
    <AdminBottomPage mt="mt-[79px] pb-[50px]">
      <section>
        <div className="container">
          {/* head */}
          <CreateAgentHead />

          <SubTitle title="اطلاعات هویتــی کارشناس" w="w-[90px]" />

          {/* form */}
          <CreateAgentForm agentsCategory={agentsCategory} />
        </div>
      </section>
    </AdminBottomPage>
  );
};

export default page;
