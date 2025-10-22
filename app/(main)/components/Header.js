import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/svgs/main-logo.svg";

const Header = ({ title, shortDescription }) => {
  return (
    <header className="mt-[68px]">
      <div className="container">
        <Link href="/" className="flex items-center justify-between mb-8">
          <Image src={logo} alt="logo website" />
        </Link>

        <div className="flex flex-col gap-y-3">
          <h1 className="text-[#EEEEEE] font-bold text-[32px]/[41.6px] tracking-[-0.64px]">
            {title}
          </h1>
          <p className="text-white font-light text-xs/[16.8px] tracking-[-0.12px]">
            {shortDescription}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
