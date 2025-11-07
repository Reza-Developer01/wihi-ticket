import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/svgs/main-logo.svg";
import { getMe } from "@/actions/auth";

const AdminHeader = async () => {
  const { user } = await getMe();

  return (
    <header className="mt-[68px]">
      <div className="container">
        <Link href="/" className="flex mb-8">
          <Image src={logo} alt="logo" />
        </Link>

        <div className="flex flex-col gap-y-3">
          <h5 className="text-[#EEEEEE] font-bold text-4xl/[41.6px] tracking-[-0.64px]">
            {user.first_name} {user.last_name}
          </h5>
          <p className="text-white font-light text-xs/[16.8px] tracking-[-0.12px]">
            ادمین سیستم سامــانه پشتیبانی
          </p>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
