const TextArea = ({ placeholder, height, ...props }) => {
  return (
    <textarea
      className="custom-shadow w-full p-6 text-xs/[16.8px] font-medium border border-[#EFF0F6] rounded-[10px] outline-none tracking-[-0.12px] placeholder:text-[#8C8C8C]"
      style={{ height: height }}
      placeholder={placeholder}
      {...props}
    ></textarea>
  );
};

export default TextArea;
