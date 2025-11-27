import Image from "next/image";

import successfullyAgent from "@/public/images/svgs/successfully-agent.svg";
import Link from "next/link";
import AgentBottomPage from "../components/AgentBottomPage";
import Header from "@/app/(main)/components/Header";

export default function SuccessPage({ searchParams }) {
  const requestId = searchParams.request;

  return (
    <>
      <Header showBackButton={true} />

      <AgentBottomPage pb="pb-[74px]">
        <div className="container">
          <div className="flex flex-col gap-y-6">
            <Image src={successfullyAgent} alt="successfully agent" />

            <div className="flex items-center justify-center w-full h-[150px] text-[#0D0D1B] text-center font-bold text-lg/[27px] tracking-[-0.12px]">
              <p>
                درخواست <span className="text-[#2DD2D2]">“ {requestId} ”</span>
                باموفقیت تغییر وضعیت داده شد
              </p>
            </div>

            <Link
              href="/"
              className={`flex items-center justify-center w-full h-12 leading-6 bg-[#20CFCF] text-white rounded-[10px] tracking-[-0.12px]`}
            >
              تایید
            </Link>
          </div>
        </div>
      </AgentBottomPage>
    </>
  );
}
