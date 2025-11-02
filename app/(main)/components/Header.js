import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/svgs/main-logo.svg";
import BackButton from "./BackButton";

const Header = ({
  title,
  subTitle,
  hasSubTitle = false,
  shortDescription,
  showBackButton = false,
}) => {
  return (
    <header className="mt-[68px]">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center justify-between mb-8">
            <Image src={logo} alt="logo website" />
          </Link>

          {showBackButton && <BackButton />}
        </div>

        <div className="flex flex-col gap-y-3">
          <h1 className="text-[#EEEEEE] font-bold text-[32px]/[41.6px] tracking-[-0.64px]">
            {title}{" "}
            {hasSubTitle && (
              <span className="text-sm/[19.6px] font-medium tracking-[-0.12px]">
                {subTitle}
              </span>
            )}
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
