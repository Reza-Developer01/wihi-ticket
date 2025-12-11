import BottomSection from "@/app/(main)/components/BottomSection";
import Header from "@/app/(main)/components/Header";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import UsersList from "../components/UsersList/UsersList";

export const metadata = {
  title: "لیست کاربران",
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const getUsers = await getFetch("users/customers/", {
    Authorization: `Bearer ${token}`,
  });
  console.log(getUsers);

  return (
    <>
      <Header
        title="کاربر هـا"
        shortDescription="تمامـــی کاربر های تعریف شده در سامانــه"
        showBackButton={true}
      />

      <BottomSection pb="45px" height="249">
        <div className="container">
          <UsersList data={getUsers} />
        </div>
      </BottomSection>
    </>
  );
};

export default page;
