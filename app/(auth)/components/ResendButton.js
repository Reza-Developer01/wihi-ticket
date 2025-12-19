import toast from "react-hot-toast";

const ResendButton = ({ setTimeLeft, setIsExpired }) => {
  const handleResend = () => {
    toast.success("کد تایید مجدداً ارسال شد");
    setTimeLeft(5);
    setIsExpired(false);
  };

  return (
    <span
      onClick={handleResend}
      className="timer relative block mt-6 text-center text-[#6C7278] text-xs/[18px] font-bold cursor-pointer"
    >
      ارسال مجدد کد
    </span>
  );
};

export default ResendButton;
