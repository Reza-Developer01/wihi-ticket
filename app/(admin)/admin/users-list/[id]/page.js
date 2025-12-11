import BottomSection from "@/app/(main)/components/BottomSection";
import Header from "@/app/(main)/components/Header";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import SubTitle from "../../components/SubTitle";
import CreateUserFilter from "../../components/CreateUser/CreateUserFilter";

export const metadata = {
  title: "جزییات کاربر",
};

const page = async ({ params }) => {
  const { id } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const getUser = await getFetch(`users/customers/${id}/`, headers);
  console.log(getUser);
  const { first_name, last_name, user_type } = getUser;
  const fullName = first_name + " " + last_name;

  return (
    <>
      <Header
        title={fullName}
        shortDescription={`کاربر ${user_type === "real" ? "حقیقی" : "حقوقی"}`}
        showBackButton={true}
      />

      <BottomSection pb="45px" height="249">
        <div className="container">
          <SubTitle title="اطلاعات هویتــی کاربر" w="w-[90px]" />

          <CreateUserFilter userType={getUser.user_type} data={getUser} />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
