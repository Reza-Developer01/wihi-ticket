import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

const LoginRegister = ({ activeTab, setActiveTab }) => {
  return (
    <section
      className={`section-login-register ${
        activeTab === "login" ? "-mt-[140px]" : "-mt-[190px]"
      }`}
    >
      <div className="container">
        {/* wrapper */}
        <div className="w-full p-6 bg-white rounded-[10px]">
          {/* tabs */}
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

          {/* tabs content */}
          <div className="tab-content">
            {activeTab === "login" && <LoginForm />}

            {activeTab === "register" && <RegisterForm />}
          </div>

          <p className="flex items-center justify-center gap-x-1.5 mt-6 text-xs/[16.8px] font-medium text-[#6C7278] tracking-[-0.12px]">
            درصورت بروز مشکل تماس بگیـرید
            <Link href="/" className="font-semibold text-[#2AD1D1]">
              پشتیبانی
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;
