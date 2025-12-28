import ReportsBannerBottom from "./ReportsBannerBottom";
import ReportsBannerTop from "./ReportsBannerTop";

const ReportsBanner = ({ data, isUserView }) => {
  return (
    <div className="flex flex-col gap-y-[15px]">
      {/* top */}
      <ReportsBannerTop data={data} isUserView={isUserView} />

      {/* bottom */}
      <ReportsBannerBottom data={data} isUserView={isUserView} />
    </div>
  );
};

export default ReportsBanner;
