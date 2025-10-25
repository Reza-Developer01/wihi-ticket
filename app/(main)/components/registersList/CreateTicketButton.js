import Link from "next/link";

const CreateTicketButton = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center w-full h-12 leading-6 bg-[#20CFCF] text-white rounded-[10px] tracking-[-0.12px]"
    >
      ثبت تیکت جدید
    </Link>
  );
};

export default CreateTicketButton;
