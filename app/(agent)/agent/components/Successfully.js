import Image from "next/image";

import successfullyAgent from "@/public/images/svgs/successfully-agent.svg";
import Link from "next/link";

const Successfully = ({ ticketNumber }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <Image src={successfullyAgent} alt="successfully agent" />

      <div className="flex items-center justify-center w-full h-[150px] text-[#0D0D1B] text-center font-bold text-lg/[27px] tracking-[-0.12px]">
        <p>
          تیکت <span className="text-[#2DD2D2]">“ {ticketNumber} ”</span> با
          موفقیت به کارشناس مربوطـــه محول شد
        </p>
      </div>

      <Link
        href="/"
        className={`flex items-center justify-center w-full h-12 leading-6 bg-[#20CFCF] text-white rounded-[10px] tracking-[-0.12px]`}
      >
        تایید
      </Link>
    </div>
  );
};

export default Successfully;
