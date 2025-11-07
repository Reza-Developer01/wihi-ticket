import "./admin.css";
import AdminBottomPage from "./components/AdminBottomPage";
import AdminFooter from "./components/AdminFooter";
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

      <AdminBottomPage pb="pb-9">
        <PagesLinks />

        <AdminFooter />
      </AdminBottomPage>
    </>
  );
};

export default page;
