import { getFetch } from "@/utils/fetch";
import BottomSection from "../components/BottomSection";

import Header from "../components/Header";
import RequestCreateForm from "../components/requestCreate/RequestCreateForm";
import { cookies } from "next/headers";

export const metadata = {
  title: "ایجاد درخواست جدید",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const categories = await getFetch("category-tickets/", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  const service = await getFetch("service-tickets/", {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  return (
    <>
      <Header
        title="درخواست جدید"
        shortDescription="لطفا در فراینــد ثبت درخواست , اطلاعات خواسته شده را با دقت وارد کنیــد"
        showBackButton={true}
      />

      <BottomSection pb="49px">
        <RequestCreateForm categories={categories} service={service} />
      </BottomSection>
    </>
  );
};

export default page;
