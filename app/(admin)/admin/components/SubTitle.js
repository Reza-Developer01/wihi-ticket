const SubTitle = ({ title, w }) => {
  return (
    <div className="flex items-center justify-between mb-4 *:inline-block">
      <span className={`h-px bg-[#EDF1F3] ${w} shrink-0`}></span>
      <span className="text-[#6C7278] text-xs/[18px] tracking-[-0.12px]">
        {title}
      </span>
      <span className={`h-px bg-[#EDF1F3] ${w} shrink-0`}></span>
    </div>
  );
};

export default SubTitle;
