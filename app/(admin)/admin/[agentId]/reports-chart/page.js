import BottomSection from "@/app/(main)/components/BottomSection";
import Header from "@/app/(main)/components/Header";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import TicketChart from "../../components/charts-data/TicketChart";

export const metadata = {
  title: "گزارشات کارشناس",
};

const ReportsChartPage = async ({ params }) => {
  const { agentId } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const getAgent = await getFetch(`users/agents/${agentId}/`, headers);
  const getCategory = await getFetch(`users/agents-categories/`, headers);

  const agent = { ...getAgent, agentId };

  const { first_name, last_name, categories } = getAgent;
  const fullName = first_name + " " + last_name;

  const categoryText = categories
    .map(
      (catId) => getCategory.find((c) => c.agentId === catId)?.name || "نامشخص"
    )
    .join(" , ");

  const getData = await getFetch(`reports/chart/${agentId}`, headers);

  return (
    <>
      <Header
        title={fullName}
        shortDescription={`کارشناس بخش های ${categoryText}`}
        showBackButton={true}
      />

      <BottomSection pb="45px" height="249">
        <div className="container">
          <TicketChart ticket={getData.agents.tickets} />
        </div>
      </BottomSection>
    </>
  );
};

export default ReportsChartPage;
