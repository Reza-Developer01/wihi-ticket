import footerLogo from "@/public/images/footer-logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-y-[5px] mt-[103px]">
      <div className="flex items-center gap-x-px">
        <Image src={footerLogo} alt="footer logo" />
        <p className="text-[#1A1C1E] text-[10px]/4">
          توسعه یافته توسط <span className="font-semibold">شرکت ثـــریـا</span>
        </p>
      </div>

      <div className="flex items-center gap-x-0.5 *:backdrop-blur-[10px] *:rounded">
        <button
          type="button"
          className="flex items-center justify-center w-3 h-3 bg-[#99999933] rounded"
        >
          <svg className="w-1.5 h-1.5">
            <use href="#arrow-down" />
          </svg>
        </button>

        <p className="flex items-center justify-center w-[61px] h-3 text-[7px]/[10px] bg-[#AFAFAF33]">
          VERSION 2.0.0
        </p>
      </div>
    </footer>
  );
};

export default Footer;
