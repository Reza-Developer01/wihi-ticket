import Link from "next/link";

const CreateUserHead = () => {
  return (
    <div className="flex items-center justify-between mb-[25px]">
      <div className="flex items-center gap-x-[7px]">
        <div className="w-[35px] h-[35px] bg-[#EFF0F6] rounded-[10px]"></div>
        <h2 className="font-medium text-sm/[19.6px] text-black tracking-[-0.12px]">
          افزودن کارشناس
        </h2>
      </div>

      {/* arrow */}
      <Link href="/">
        <svg className="w-6 h-6 text-[#1A1C1E]">
          <use href="#arrow-narrow-left" />
        </svg>
      </Link>
    </div>
  );
};

export default CreateUserHead;
