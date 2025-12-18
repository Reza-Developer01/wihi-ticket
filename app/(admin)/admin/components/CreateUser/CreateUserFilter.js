"use client";
import { useState, useEffect } from "react";
import CreateUserReal from "./CreateUserReal";
import CreateUserLegal from "./CreateUserLegal";
import { usePathname } from "next/navigation";
import EditLegalUser from "../UsersList/EditLegalUser";
import EditRealUser from "../UsersList/EditRealUser";

const CreateUserFilter = ({ userType, data, services }) => {
  const [activeTab, setActiveTab] = useState("real");
  const pathname = usePathname();
  const isCreatePage = pathname === "/admin/create-user";

  useEffect(() => {
    if (userType && !isCreatePage) {
      // هنگام ویرایش تب مربوطه را فعال کن
      setActiveTab(userType === "real" ? "real" : "legal");
    }
  }, [userType, isCreatePage]);

  const activeStyle =
    "filter-button__shadow grow bg-white font-medium text-sm/[21px] text-[#232447] border border-[#EFF0F680] h-full rounded-md tracking-[-0.64px]";
  const inactiveStyle =
    "grow font-medium text-sm/[21px] text-[#7D7D91] border border-[#EFF0F680] h-full rounded-md tracking-[-0.64px]";

  return (
    <>
      {/* تب‌ها */}
      <div className="custom-shadow flex items-center gap-x-px w-full h-12 p-0.5 bg-[#F5F6F9] border border-[#F5F6F9] rounded-[7px]">
        {/* دکمه حقیقی */}
        {(isCreatePage || userType === "real") && (
          <button
            type="button"
            onClick={isCreatePage ? () => setActiveTab("real") : undefined} // غیرقابل کلیک هنگام ویرایش
            className={activeTab === "real" ? activeStyle : inactiveStyle}
          >
            حقیقــــی
          </button>
        )}

        {/* دکمه حقوقی */}
        {(isCreatePage || userType === "legal") && (
          <button
            type="button"
            onClick={isCreatePage ? () => setActiveTab("legal") : undefined} // غیرقابل کلیک هنگام ویرایش
            className={activeTab === "legal" ? activeStyle : inactiveStyle}
          >
            حقــوقی
          </button>
        )}
      </div>

      {/* فرم‌ها */}
      <div className="mt-4">
        {isCreatePage ? (
          <>
            {activeTab === "real" && <CreateUserReal services={services} />}
            {activeTab === "legal" && <CreateUserLegal />}
          </>
        ) : (
          <>
            {activeTab === "real" && <EditRealUser data={data} />}
            {activeTab === "legal" && <EditLegalUser data={data} />}
          </>
        )}
      </div>
    </>
  );
};

export default CreateUserFilter;
