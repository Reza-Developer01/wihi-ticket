import ReportsBannerBottom from "./ReportsBannerBottom";
import ReportsBannerTop from "./ReportsBannerTop";

const ReportsBanner = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-[15px]">
      {/* top */}
      <ReportsBannerTop data={data} />

      {/* bottom */}
      <ReportsBannerBottom data={data} />
    </div>
  );
};

export default ReportsBanner;
