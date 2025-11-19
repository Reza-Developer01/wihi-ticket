import Header from "@/app/(main)/components/Header";
import CreateTicketForm from "../../components/tickets/CreateTicketForm";
import { cookies } from "next/headers";
import { getFetch } from "@/utils/fetch";
import BottomSection from "@/app/(main)/components/BottomSection";

export const metadata = {
  title: "ایجاد تیکت",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const categories = await getFetch("category-callrequests/", headers);
  const services = await getFetch("service-callrequests/", headers);
  const serviceIssues = await getFetch("service-issues-callrequests/", headers);

  return (
    <>
      <BottomSection pb="49px">
        <CreateTicketForm
          categories={categories}
          services={services}
          issues={serviceIssues}
        />
      </BottomSection>
    </>
  );
};

export default page;
