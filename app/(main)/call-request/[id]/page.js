import { getFetch } from "@/utils/fetch";
import BottomSection from "../../components/BottomSection";
import CallDetail from "../../components/call/CallDetail";
import Header from "../../components/Header";
import { cookies } from "next/headers";
import { getMe } from "@/actions/auth";

export const metadata = {
  title: "جزییات درخواست تماس",
};

const page = async ({ params }) => {
  const { user } = await getMe();
  console.log(user);
  const { id } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const getCall = await getFetch(`callrequests/${id}/`, headers);
  const categories = await getFetch("users/agents-categories/", headers);
  const services = await getFetch("service-tickets/", headers);
  const phones = await getFetch(`users/phones/`, headers);

  let agentsList;

  if (user.role === "admin") {
    agentsList = await getFetch("users/agents-list/", {
      Authorization: token ? `Bearer ${token}` : undefined,
    });
  }

  return (
    <>
      <Header showBackButton={true} mb="mb-0" />

      <BottomSection pb="41px" height="159">
        <div className="container">
          <CallDetail
            call={getCall}
            categories={categories}
            services={services}
            phones={phones}
            role={user.role}
            agentsList={agentsList}
            user={user}
          />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
