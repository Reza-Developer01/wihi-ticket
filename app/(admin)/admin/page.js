import "./admin.css";
import AdminBottomPage from "./components/AdminBottomPage";
import AdminHeader from "./components/AdminHeader";
import InformationSection from "./components/InformationSection";
import PagesLinks from "./components/PagesLinks";

export const metadata = {
  title: "ادمین - خانه",
};

const page = () => {
  return (
    <>
      <AdminHeader />

      <InformationSection />

      <AdminBottomPage>
        <PagesLinks />
      </AdminBottomPage>
    </>
  );
};

export default page;
