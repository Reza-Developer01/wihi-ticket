import Link from "next/link";
import Header from "./components/Header";
import Plans from "./components/main/plans/Plans";

import Footer from "./components/Footer";
import Selectors from "./components/main/selectors/Selectors";
import BottomSection from "./components/BottomSection";
import { getMe } from "@/actions/auth";

export const metadata = {
  title: "خانه",
};

const page = async () => {
  const { user } = await getMe();

  return (
    <>
      <Header
        title="سامانه پشتیبانی"
        shortDescription={
          <>
            شماره در قسمت پایین بستــه پشتیبانی خود را مشاهده میکنید که قابل
            ارتقاء میباشد
            <Link href="/" className="font-normal text-[#5DFFFF]">
              مزایا ارتقا پلن پشتیبانی
            </Link>
          </>
        }
      />

      <Plans currentPlan={user?.plan?.name} />

      <BottomSection pb="36px">
        <Selectors />

        <Footer />
      </BottomSection>
    </>
  );
};

export default page;
