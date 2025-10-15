const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs flex gap-x-px w-full h-12 mb-6 p-0.5 bg-[#F5F6F9] border border-[#F5F6F9] rounded-md *:w-1/2">
      <button
        onClick={() => setActiveTab("login")}
        className={`
    text-sm/[21px] font-medium rounded-md transition-colors duration-200
    ${
      activeTab === "login"
        ? "bg-white text-[#232447] border border-[#EFF0F680]"
        : "bg-transparent text-[#7D7D91] border-transparent"
    }`}
      >
        ورود
      </button>

      <button
        onClick={() => setActiveTab("register")}
        className={`
    text-sm/[21px] font-medium rounded-md transition-colors duration-200
    ${
      activeTab === "register"
        ? "bg-white text-[#232447] border border-[#EFF0F680]"
        : "bg-transparent text-[#7D7D91] border-transparent"
    }
  `}
      >
        ثبت نام
      </button>
    </div>
  );
};

export default Tabs;
