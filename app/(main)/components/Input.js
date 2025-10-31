const Input = ({ type, name, placeholder, ...props }) => {
  return (
    <input
      type={type}
      name={name}
      className="custom-shadow w-full h-12 px-6 text-xs/[16.8px] font-medium border border-[#EFF0F6] rounded-[10px] outline-none tracking-[-0.12px] placeholder:text-[#8C8C8C]"
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
