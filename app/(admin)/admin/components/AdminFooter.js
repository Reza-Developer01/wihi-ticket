import Image from "next/image";

import footerLogo from "@/public/images/footer-logo.svg";

const AdminFooter = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-y-[5px]">
      <div className="flex items-center justify-center gap-x-px">
        <Image src={footerLogo} alt="footer logo" />
        <p className="text-[10px]/4">
          توسعه یافته توسط
          <span className="font-semibold"> شرکت ثـــریـا</span>
        </p>
      </div>

      <div className="flex gap-x-0.5">
        <button className="flex items-center justify-center w-3 h-3 bg-[#99999933] backdrop-blur-[10px] rounded">
          <svg className="w-1.5 h-1.5 text-[#1A1C1E]">
            <use href="#arrow-down" />
          </svg>
        </button>

        <button className="flex items-center justify-center w-[61px] h-3 bg-[#AFAFAF33] text-[#1A1C1E] text-[7px]/2.5 backdrop-blur-[10px] rounded">
          VERSION 2.0.0
        </button>
      </div>
    </section>
  );
};

export default AdminFooter;
