import { getFetch } from "@/utils/fetch";
import BottomSection from "../../components/BottomSection";
import CallDetail from "../../components/call/CallDetail";
import Header from "../../components/Header";
import { cookies } from "next/headers";

export const metadata = {
  title: "جزییات درخواست تماس",
};

const page = async ({ params }) => {
  const { id } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const getCall = await getFetch(`callrequests/${id}/`, headers);
  const categories = await getFetch("category-callrequests/", headers);
  const services = await getFetch("service-callrequests/", headers);
  const issues = await getFetch("service-issues-callrequests/", headers);

  return (
    <>
      <Header showBackButton={true} mb="mb-0" />

      <BottomSection pb="41px">
        <CallDetail
          call={getCall}
          categories={categories}
          services={services}
          issues={issues}
        />
      </BottomSection>
    </>
  );
};

export default page;
