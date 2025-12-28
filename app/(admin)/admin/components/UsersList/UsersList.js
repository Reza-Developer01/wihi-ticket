import Button from "@/app/(main)/components/Button";
import Link from "next/link";

const UsersList = ({ data }) => {
  const getPlanName = (plan) => {
    switch (plan) {
      case 1:
        return "پایه";
      case 2:
        return "رشد";
      case 3:
        return "حرفه‌ای";
      case 4:
        return "سازمانی";
      default:
        return "نامشخص";
    }
  };

  return (
    <div className="flex flex-col gap-y-[15px]">
      {data.map((item) => (
        <div
          key={item.id}
          className="custom-shadow w-full pt-[13px] pb-[17px] px-5 bg-white border border-[#EFF0F6] rounded-[10px]"
        >
          {/* head */}
          <div className="flex items-center justify-between">
            {/* right side */}
            <div className="flex flex-col gap-y-px font-medium text-[8px]/[11.2px] tracking-[-0.12px]">
              <span className="text-[#B9BBC9]">شماره کاربر</span>
              <span className="text-[#808392]">{item.id}</span>
            </div>

            {/* left side */}
            <div className="flex items-center justify-center gap-x-1">
              <div
                className={`flex items-center justify-center w-[60px] h-5 rounded-[5px] ${
                  item.user_type === "real"
                    ? "bg-[#0068C933]"
                    : "bg-[#FF000033]"
                }`}
              >
                <span
                  className={`font-semibold text-[8px]/[11.2px] tracking-[-0.12px] ${
                    item.user_type === "real"
                      ? "text-[#0068C9]"
                      : "text-[#FF0000]"
                  }`}
                >
                  {item.user_type === "real" ? "حقیقی" : "حقوقی"}
                </span>
              </div>

              <div
                className={`flex items-center justify-center w-[60px] h-5 rounded-[5px] ${
                  item.is_active ? "bg-[#FF880033]" : "bg-[#FF000033]"
                }`}
              >
                <span
                  className={`font-semibold text-[8px]/[11.2px] tracking-[-0.12px] ${
                    item.is_active ? "text-[#FF8000]" : "text-[#FF0000]"
                  }`}
                >
                  {item.is_active ? "فعال" : "غیرفعال"}
                </span>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="flex flex-col gap-y-px mt-2">
            <Link
              href={`users-list/${item.id}`}
              className="font-medium text-xs/[19.6px] tracking-[-0.12px] text-[#8C8C8C]"
            >
              {item.first_name} {item.last_name}
            </Link>
          </div>

          <span className="inline-block w-full h-px bg-[#F0F2FE] mb-2.5 mt-[13px]"></span>

          {/* footer */}
          <div className="flex items-center justify-between">
            <span className="text-[8px]/[11.2px] tracking-[-0.12px] text-[#404040]">
              سطح پلن کاربر |{" "}
              <span className="font-medium text-[#2BD1D1]">
                {getPlanName(item.plan)}
              </span>
            </span>
          </div>
        </div>
      ))}

      <Button href="create-user" text="افزودن کاربر" />
    </div>
  );
};

export default UsersList;
