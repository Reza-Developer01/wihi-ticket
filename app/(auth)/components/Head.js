"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/svgs/logo.svg";
import { useRouter } from "next/navigation";

const Head = ({ children, place, arrowNarrowLeft = false }) => {
  const router = useRouter();

  return (
    <section className="section-top w-full h-[397px] pt-[68px] bg-[#0D0D1B]">
      <div className="container">
        <div className={`flex items-center ${place}`}>
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
          {arrowNarrowLeft && (
            <button onClick={() => router.push("/auth")} className="cursor-pointer">
              <svg className="w-6 h-6 text-white">
                <use href="#arrow-narrow-left" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-col items-center gap-y-3 mt-6">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Head;
