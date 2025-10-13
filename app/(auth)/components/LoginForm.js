import Input from "./Input";

const LoginForm = () => {
  return (
    <>
      <span className="login__message block mb-6 text-center text-[#6C7278] text-xs/[18px]">
        نام کاربری و رمز عبور را وارد کنید
      </span>

      <form action="#" className="flex flex-col gap-y-4">
        <Input
          type="email"
          placeholder="Loisbecket@gmail.com"
          style={{ direction: "ltr" }}
        />

        <Input
          type="password"
          placeholder="*******"
          style={{ direction: "ltr" }}
        />

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
