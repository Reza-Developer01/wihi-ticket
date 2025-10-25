import Link from "next/link";

const Button = ({ href, bgColor = "bg-[#20CFCF]", text }) => {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center w-full h-12 leading-6 ${bgColor} text-white rounded-[10px] tracking-[-0.12px]`}
    >
      {text}
    </Link>
  );
};

export default Button;
