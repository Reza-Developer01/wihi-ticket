const LoginForm = () => {
  return (
    <>
      <span className="block mb-6 text-center text-[#6C7278] text-xs/[18px]">
        نام کاربری و رمز عبور را وارد کنید
      </span>

      <form action="#" className="flex flex-col gap-y-4">
        <input
          type="email"
          placeholder="Loisbecket@gmail.com"
          className="custom__input w-full h-[46px] px-3.5 text-sm/[19.6px] text-[#1A1C1E] font-medium bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#1A1C1E] text-left"
          style={{ direction: "ltr" }}
        />

        <div className="relative">
          <svg className="absolute right-3.5 top-0 bottom-0 m-auto w-4 h-4 text-[#ACB5BB]">
            <use href="#eye-off" />
          </svg>
          <input
            type="password"
            placeholder="*******"
            className="custom__input w-full h-[46px] pl-3.5 pr-10 text-sm/[19.6px] text-[#1A1C1E] font-medium bg-white border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[#1A1C1E] text-left"
            style={{ direction: "ltr" }}
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-[10px] leading-6 text-white mt-2 font-medium"
        >
          ورود
        </button>
      </form>
    </>
  );
};

export default LoginForm;
