import { getFetch } from "@/utils/fetch";
import BottomSection from "../components/BottomSection";
import Header from "../components/Header";
import CallRequestForm from "../components/call/CallRequestForm";
import { cookies } from "next/headers";

export const metadata = {
  title: "درخواست تماس جدید",
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
      <Header
        title="درخواست جدید"
        shortDescription="لطفا در فرایند ثبت درخواست , اطلاعات خواسته شده را با دقت وارد کنیــد"
        showBackButton={true}
      />

      <BottomSection pb="49px">
        <CallRequestForm
          categories={categories}
          services={services}
          issues={serviceIssues}
        />
      </BottomSection>
    </>
  );
};

export default page;
