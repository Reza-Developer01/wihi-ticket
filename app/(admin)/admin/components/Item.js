const Item = ({ number, title, isActive = false }) => {
  return (
    <div
      className={`${
        isActive ? "item__active" : ""
      } flex flex-col items-center gap-y-[5px] text-black`}
    >
      <button className="custom-shadow flex items-center justify-center w-12 h-12 bg-white font-bold leading-[22.4px] tracking-[-0.12px] border border-[#EFF0F6] rounded-[10px]">
        {number}
      </button>
      <span className="text-xs tracking-[-0.12px] leading-[16.8px]">
        {title}
      </span>
    </div>
  );
};

export default Item;
