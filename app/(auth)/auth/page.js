"use client";

import { useState } from "react";
import Head from "../components/Head";
import LoginRegister from "../components/LoginRegister";
import Link from "next/link";

const page = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      {/* ==== Start Section Top ==== */}
      <Head place="justify-center">
        {activeTab === "login" && (
          <>
            <h1 className="font-bold text-[32px]/[38.4px] text-[#EEEEEE] tracking-[-0.64px]">
              ورود پشتیبانی
            </h1>
            <p className="text-[#FFFFFFB2] text-xs/[16.8px] tracking-[-0.12px]">
              برای ورود به سامانــه نام کاربری و رمزعبـور خود را وارد کنید
            </p>
          </>
        )}

        {activeTab === "register" && (
          <>
            <h1 className="font-bold text-[32px]/[38.4px] text-[#EEEEEE] tracking-[-0.64px]">
              ثبت نام پشتیبانی
            </h1>
            <p className="flex items-center gap-x-1.5 text-white text-xs/[16.8px] tracking-[-0.12px]">
              ثبت نام کرده ایــد !{" "}
              <Link
                href=""
                className="text-xs underline font-semibold pb-0.5"
                onClick={() => setActiveTab("login")}
              >
                ورود
              </Link>
            </p>
          </>
        )}
      </Head>
      {/* ==== Finish Section Top ==== */}

      {/* ==== Start Section Login & Register ==== */}
      <LoginRegister activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* ==== Finish Section Login & Register ==== */}
    </>
  );
};

export default page;
