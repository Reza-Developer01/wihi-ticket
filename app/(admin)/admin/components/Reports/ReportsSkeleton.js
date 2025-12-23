"use client";

const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const ReportsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Filter Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBox key={i} className="h-[25px] w-[60px] rounded-[7px]" />
        ))}
      </div>

      {/* Top Banner Skeleton */}
      <div className="flex justify-between items-center p-4 rounded-lg bg-white shadow">
        <div className="space-y-3">
          <SkeletonBox className="w-10 h-10" />
          <SkeletonBox className="w-32 h-3" />
          <SkeletonBox className="w-24 h-5" />
        </div>

        <div className="flex gap-2">
          {[1, 2].map((i) => (
            <SkeletonBox key={i} className="w-[65px] h-[65px] rounded-[7px]" />
          ))}
        </div>
      </div>

      {/* Bottom Items Skeleton */}
      <div className="flex flex-wrap gap-[15px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonBox key={i} className="w-[66px] h-[67px] rounded-[7px]" />
        ))}
      </div>
    </div>
  );
};

export default ReportsSkeleton;
