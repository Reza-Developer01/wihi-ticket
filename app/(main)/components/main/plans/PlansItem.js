const PlansItem = ({ icon, title, isActive = false }) => {
  return (
    <div
      className={`${
        isActive ? "plans__active" : ""
      } flex flex-col items-center justify-center gap-y-1`}
    >
      <button className="plans__item-button flex items-center justify-center w-12 h-12 bg-white border border-[#EFF0F6] rounded-[10px]">
        <svg className="w-6 h-6 text-[#17C7C7]">
          <use href={`#${icon}`} />
        </svg>
      </button>
      <span className="text-black text-[10px]/3.5">{title}</span>
    </div>
  );
};

export default PlansItem;
