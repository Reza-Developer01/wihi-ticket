import ReportsBannerBottom from "./ReportsBannerBottom";
import ReportsBannerTop from "./ReportsBannerTop";

const ReportsBanner = () => {
  return (
    <div className="flex flex-col gap-y-[15px]">
      {/* top */}
      <ReportsBannerTop />

      {/* bottom */}
      <ReportsBannerBottom />
    </div>
  );
};

export default ReportsBanner;
