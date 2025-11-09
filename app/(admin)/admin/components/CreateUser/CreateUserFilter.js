"use client";
import { useState } from "react";
import CreateUserReal from "./CreateUserReal";

const CreateUserFilter = () => {
  const [activeTab, setActiveTab] = useState("real");

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

      {/* CONTENT */}
      <div className="mt-4">
        {activeTab === "real" && <CreateUserReal />}

        {activeTab === "legal" && (
          <p className="text-[#232447]">فرم مربوط به کاربر حقوقی…</p>
        )}
      </div>
    </>
  );
};

export default CreateUserFilter;
