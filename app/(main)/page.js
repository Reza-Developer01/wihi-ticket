import Link from "next/link";
import Header from "./components/Header";
import Plans from "./components/main/plans/Plans";

import Footer from "./components/Footer";
import Selectors from "./components/main/selectors/Selectors";

export const metadata = {
  title: "خانه",
};

const page = () => {
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

      <Plans />

      <main className="main w-full p-6 bg-white rounded-t-3xl mt-[30px]">
        <Selectors />

        <Footer />
      </main>
    </>
  );
};

export default page;
