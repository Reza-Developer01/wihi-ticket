const CallsListSkeleton = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-y-[15px] mb-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="custom-shadow w-full bg-white border border-[#EFF0F6] rounded-[10px] p-4"
        >
          {/* head */}
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 w-[60px] bg-gray-200 rounded"></div>
            <div className="h-5 w-[60px] bg-gray-300 rounded"></div>
          </div>

          {/* body */}
          <div className="flex flex-col gap-y-1 mb-[13px]">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-3 w-[215px] bg-gray-200 rounded"></div>
          </div>

          {/* line */}
          <span className="flex w-[calc(100%-40px)] mx-auto h-px bg-[#F0F2FE] px-5 mb-2.5"></span>

          {/* footer */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
            <div className="flex gap-x-1">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-3 w-4 bg-gray-200 rounded"></div>
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CallsListSkeleton;
