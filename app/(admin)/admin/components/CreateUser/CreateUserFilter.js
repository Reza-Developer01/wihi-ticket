"use client";
import { useState, useEffect } from "react";
import CreateUserReal from "./CreateUserReal";
import CreateUserLegal from "./CreateUserLegal";
import { usePathname } from "next/navigation";
import EditLegalUser from "../UsersList/EditLegalUser";
import EditRealUser from "../UsersList/EditRealUser";

const CreateUserFilter = ({ userType, data }) => {
  const [activeTab, setActiveTab] = useState("real");
  const pathname = usePathname();

  useEffect(() => {
    if (userType) {
      setActiveTab(userType === "real" ? "real" : "legal");
    }
  }, [userType]);

  const activeStyle =
    "filter-button__shadow grow bg-white font-medium text-sm/[21px] text-[#232447] border border-[#EFF0F680] h-full rounded-md tracking-[-0.64px]";
  const inactiveStyle =
    "grow font-medium text-sm/[21px] text-[#7D7D91] border border-[#EFF0F680] h-full rounded-md tracking-[-0.64px]";

  return (
    <>
      <div className="custom-shadow flex items-center gap-x-px w-full h-12 p-0.5 bg-[#F5F6F9] border border-[#F5F6F9] rounded-[7px]">
        <button
          type="button"
          onClick={() => setActiveTab("real")}
          className={activeTab === "real" ? activeStyle : inactiveStyle}
        >
          حقیقــــی
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("legal")}
          className={activeTab === "legal" ? activeStyle : inactiveStyle}
        >
          حقــوقی
        </button>
      </div>

      <div className="mt-4">
        {pathname === "/admin/create-user" ? (
          <>
            {activeTab === "real" && <CreateUserReal />}
            {activeTab === "legal" && <CreateUserLegal />}
          </>
        ) : (
          <>
            {activeTab === "real" && data.real_user && (
              <EditRealUser data={data} />
            )}
            {activeTab === "legal" && data.legal_user && (
              <EditLegalUser data={data} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CreateUserFilter;
