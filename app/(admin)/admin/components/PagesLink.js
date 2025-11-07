import Link from "next/link";

const PagesLink = ({ title, subTitle, hasLabel = false, labelTitle }) => {
  return (
    <Link
      href="/"
      className={`custom-shadow flex items-center ${
        hasLabel ? "justify-between" : "justify-center"
      } pl-[13px] w-full h-12 text-base bg-white text-[#1A1C1E] leading-[22.4px] tracking-[-0.12px] border border-[#EFF0F6] rounded-[10px]`}
    >
      {hasLabel && <div></div>}
      <div
        className={`flex items-center gap-x-0.5 ${hasLabel ? "pr-[70px]" : ""}`}
      >
        {title}
        {subTitle && <span className="text-[8px]">( {subTitle} )</span>}
      </div>
      {hasLabel && (
        <button className="w-[70px] h-[30px] bg-[#EFF0F6] text-[#808392] text-[8px]/[11.2px] rounded-[10px]">
          {labelTitle}
        </button>
      )}
    </Link>
  );
};

export default PagesLink;
