import BottomSection from "@/app/(main)/components/BottomSection";
import Header from "@/app/(main)/components/Header";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import TicketChart from "../../components/charts-data/TicketChart";
import CallChart from "../../components/charts-data/CallChart";
import ReportsFilter from "../../components/Reports/ReportsFilter";
import ReportsChartClient from "../../components/charts-data/ReportsChartClient";

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

  const categoryText = getAgent.categories
    .map(
      (catId) => getCategory.find((c) => c.agentId === catId)?.name || "نامشخص"
    )
    .join(" , ");

  return (
    <>
      <Header
        title={`${getAgent.first_name} ${getAgent.last_name}`}
        shortDescription={`کارشناس بخش های ${categoryText}`}
        showBackButton
      />

      <BottomSection pb="45px" height="0">
        <div className="container">
          <ReportsChartClient agentId={agentId} headers={headers} />
        </div>
      </BottomSection>
    </>
  );
};

export default ReportsChartPage;
