import BottomSection from "@/app/(main)/components/BottomSection";
import Header from "@/app/(main)/components/Header";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import SubTitle from "../../components/SubTitle";
import CreateAgentForm from "../../components/CreateAgent/CreateAgentForm";
import EditAgent from "../../components/AgentsList/EditAgent";

export const metadata = {
  title: "جزییات کاربر",
};

const page = async ({ params }) => {
  const { id } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const getAgent = await getFetch(`users/agents/${id}/`, headers);
  const getCategory = await getFetch(`users/agents-categories/`, headers);

  const agent = { ...getAgent, id };

  console.log("AGENT : ", agent);

  const { first_name, last_name, categories } = getAgent;
  const fullName = first_name + " " + last_name;

  const categoryText = categories
    .map((catId) => getCategory.find((c) => c.id === catId)?.name || "نامشخص")
    .join(" , ");

  return (
    <>
      <Header
        title={fullName}
        shortDescription={`کارشناس بخش های ${categoryText}`}
        showBackButton={true}
      />

      <BottomSection pb="45px" height="249">
        <div className="container">
          <SubTitle title="اطلاعات هویتــی کارشناس" w="w-[90px]" />

          <EditAgent agentsCategory={getCategory} agent={agent} />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
