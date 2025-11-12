import Link from "next/link";

const TicketsHead = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-[5px]">
        <button className="flex items-center justify-center w-[35px] h-[35px] bg-[#EFF0F6] rounded-[10px]">
          <svg className="w-5 h-5">
            <use href="#filter" />
          </svg>
        </button>

        <input
          type="text"
          placeholder="جستجــــو کنید ..."
          className="w-[150px] h-[35px] text-[#808392] font-medium text-[10px]/3.5 bg-[#EFF0F6] pr-[15px] outline-none rounded-[10px]"
        />
      </div>

      <Link href="/">
        <svg className="w-6 h-6">
          <use href="#arrow-narrow-left" />
        </svg>
      </Link>
    </div>
  );
};

export default TicketsHead;
