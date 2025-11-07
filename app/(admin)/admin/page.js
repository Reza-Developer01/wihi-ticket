import "./admin.css";
import AdminHeader from "./components/AdminHeader";
import InformationSection from "./components/InformationSection";

export const metadata = {
  title: "ادمین - خانه",
};

const page = () => {
  return (
    <>
      <AdminHeader />

      <InformationSection />
    </>
  );
};

export default page;
