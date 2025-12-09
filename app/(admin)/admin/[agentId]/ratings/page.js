import BottomSection from "@/app/(main)/components/BottomSection";
import Header from "@/app/(main)/components/Header";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import RatingChart from "../../components/rating-chart/RatingChart";

export const metadata = {
  title: "نظرسنجی کارشناس",
};

const page = async ({ params }) => {
  console.log(params);
  const { agentId } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const getAgent = await getFetch(`users/agents/${agentId}/`, headers);
  const getCategory = await getFetch(`users/agents-categories/`, headers);

  const categoryText = getAgent.categories
    .map((catId) => getCategory.find((c) => c.id === catId)?.name || "نامشخص")
    .join(" , ");

  const getData = await getFetch(`ticket-ratings/by-agent/${agentId}`, headers);
  console.log(getData);

  return (
    <>
      <Header
        title={`${getAgent.first_name} ${getAgent.last_name}`}
        shortDescription={`کارشناس بخش های ${categoryText}`}
        showBackButton
      />

      <BottomSection pb="45px" height="0">
        <div className="container">
          <RatingChart data={getData} />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
