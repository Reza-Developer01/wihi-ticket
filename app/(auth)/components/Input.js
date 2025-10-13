const Input = ({ placeholder, type, style }) => {
  return (
    <input
      placeholder={placeholder}
      className="custom__input w-full h-[46px] px-3.5 text-sm/[19.6px] bg-white text-[#1A1C1E] font-medium border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#1A1C1E]"
      type={type}
      style={style}
    />
  );
};

export default Input;
