"use client";

import { useState } from "react";
import Head from "../components/Head";
import Link from "next/link";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Tabs from "../components/Tabs";

const page = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
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

      <section
        className={`section-login-register ${
          activeTab === "login" ? "-mt-[140px]" : "-mt-[190px]"
        }`}
      >
        <div className="container">
          {/* wrapper */}
          <div className="w-full p-6 bg-white rounded-[10px]">
            {/* tabs */}
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* tabs content */}
            <div className="tab-content">
              {activeTab === "login" && (
                <span className="login__message block mb-6 text-center text-[#6C7278] text-xs/[18px]">
                  نام کاربری و رمز عبور را وارد کنید
                </span>
              )}
              {activeTab === "login" && <LoginForm />}

              {activeTab === "register" && <RegisterForm />}
            </div>

            <p className="flex items-center justify-center gap-x-1.5 mt-6 text-xs/[16.8px] font-medium text-[#6C7278] tracking-[-0.12px]">
              درصورت بروز مشکل تماس بگیـرید
              <Link href="/" className="font-semibold text-[#2AD1D1]">
                پشتیبانی
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
