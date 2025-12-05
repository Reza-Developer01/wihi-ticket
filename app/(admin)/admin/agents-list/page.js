import BottomSection from "@/app/(main)/components/BottomSection";
import Header from "@/app/(main)/components/Header";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import AgentsList from "../components/AgentsList/AgentsList";

export const metadata = {
  title: "لیست کارشناس ها",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const getAgentsList = await getFetch("users/agents-list/", {
    Authorization: `Bearer ${token}`,
  });

  return (
    <>
      <Header
        title="کارشناس هـا"
        shortDescription="تمامـــی کارشناس های تعریف شده در سامانــه"
        showBackButton={true}
      />

      <BottomSection pb="45px" height="249">
        <div className="container">
          <AgentsList data={getAgentsList} />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
