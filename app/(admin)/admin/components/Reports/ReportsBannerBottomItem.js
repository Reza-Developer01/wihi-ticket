const ReportsBannerBottomItem = ({
  number,
  title,
  bg = "bg-[#219E9E1A]",
  text = "text-[#29B2B2]",
  width = "w-[40px]",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-y-[7px] w-[70px] h-[67px] ${bg} ${text} rounded-[7px]`}
    >
      <span className="inline-block h-[23px] font-extrabold text-2xl/[33.6px]">
        {number}
      </span>
      <span
        className={`inline-block ${width} text-center font-medium text-[5px]/[7px]`}
      >
        {title}
      </span>
    </div>
  );
};

export default ReportsBannerBottomItem;
