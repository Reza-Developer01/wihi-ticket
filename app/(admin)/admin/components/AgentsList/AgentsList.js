import Button from "@/app/(main)/components/Button";
import Link from "next/link";

const AgentsList = ({ data }) => {
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
              <span className="text-[#B9BBC9]">شماره کارشناس</span>
              <span className="text-[#808392]">{item.id}</span>
            </div>

            {/* left side */}
            <div
              className={`flex items-center justify-center w-[60px] h-5 rounded-[5px] ${
                item.is_active ? "bg-[#5DFFFF33]" : "bg-[#FF000033]"
              }`}
            >
              <span
                className={`font-semibold text-[8px]/[11.2px] tracking-[-0.12px] ${
                  item.is_active ? "text-[#5DFFFF]" : "text-[#FF0000]"
                }`}
              >
                {item.is_active ? "فعال" : "غیرفعال"}
              </span>
            </div>
          </div>

          {/* body */}
          <div className="flex flex-col gap-y-px mt-2">
            <Link
              href={`agents-list/${item.id}`}
              className="font-medium text-xs/[19.6px] tracking-[-0.12px] text-[#8C8C8C]"
            >
              {item.full_name}
            </Link>
            <p className="w-[213px] line-clamp-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#B9BBC9]">
              ادمین بخش های{" "}
              <span className="text-[#2BD1D1]">
                {item.categories.map((cat) => cat.name).join(" , ")}
              </span>
            </p>
          </div>

          <span className="inline-block w-full h-px bg-[#F0F2FE] mb-2.5 mt-[13px]"></span>

          {/* footer */}
          <div className="flex items-center justify-between">
            <span className="text-[8px]/[11.2px] tracking-[-0.12px] text-[#404040]">
              ایجاد توسط | {item.created_by.full_name}
            </span>

            <div className="flex items-center gap-x-1 font-medium text-[8px]/[11.2px] tracking-[-0.12px] text-[#808392]">
              <span>
                {new Date(item.date_joined).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
              <span>|</span>
              <span>
                {new Date(item.date_joined).toLocaleDateString("fa-IR")}
              </span>
            </div>
          </div>
        </div>
      ))}

      <Button href="create-agent" text="افزودن کارشناس" />
    </div>
  );
};

export default AgentsList;
