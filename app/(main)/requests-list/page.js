import Header from "../components/Header";
import BottomSection from "../components/BottomSection";
import Button from "../components/Button";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import RequestsList from "../components/requestsList/RequestsList";
import CallsListSkeleton from "../components/CallsListSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "لیست درخواست ها",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const getRequestsList = await getFetch("tickets/", {
    Authorization: `Bearer ${token}`,
  });

  console.log(getRequestsList);

  return (
    <>
      <Header
        title="ثبت درخواست"
        shortDescription="شما در این بخش آخرین تیکت های ارسالی خود را مشاهده میکنید"
        showBackButton={true}
      />

      <BottomSection pb="25px" height="249">
        <div className="container">
          <Suspense fallback={<CallsListSkeleton count={3} />}>
            <RequestsList requestsList={getRequestsList} />
          </Suspense>

          <Button href="/request-create" text="ثبت تیکت جدید" />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
