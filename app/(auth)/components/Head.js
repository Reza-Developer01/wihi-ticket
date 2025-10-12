import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/svgs/logo.svg";

const Head = ({ children, place }) => {
  return (
    <section className="section-top w-full h-[397px] pt-[68px] bg-[#0D0D1B]">
      <div className="container">
        <Link href="/" className={`flex items-center ${place}`}>
          <Image src={logo} alt="logo" />
        </Link>

        <div className="flex flex-col items-center gap-y-3 mt-6">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Head;
