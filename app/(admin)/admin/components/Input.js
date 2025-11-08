const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-shadow w-full h-[46px] px-3.5 bg-white text-[#1A1C1E] font-medium text-sm/[19.6px] border border-[#EDF1F3] 
        rounded-[10px] tracking-[-0.12px] outline-none placeholder:text-[#1A1C1E]"
      {...rest}
    />
  );
};

export default Input;
