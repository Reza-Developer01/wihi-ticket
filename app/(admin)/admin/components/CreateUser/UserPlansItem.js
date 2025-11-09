"use client";

const UserPlansItem = ({ icon, title, isActive = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${
        isActive ? "plans__active" : ""
      } cursor-pointer flex flex-col items-center justify-center gap-y-1`}
    >
      <button
        type="button"
        className="custom-shadow flex items-center justify-center w-12 h-12 bg-white border border-[#EFF0F6] rounded-[10px]"
      >
        <svg className="w-6 h-6 text-[#17C7C7]">
          <use href={`#${icon}`} />
        </svg>
      </button>
      <span className="text-black text-[10px]/3.5">{title}</span>
    </div>
  );
};

export default UserPlansItem;
