const ChangeAgentButton = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-x-[13px] w-[150px] h-[30px] bg-[#292D321A] text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]"
    >
      انتخاب کارشناس مربوطـــــه
      <svg className="w-[15px] h-[15px]">
        <use href="#arrow-down" />
      </svg>
    </button>
  );
};

export default ChangeAgentButton;
