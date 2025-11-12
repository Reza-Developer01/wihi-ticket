"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";

const TicketsHead = () => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-[5px]">
        <button
          type="button"
          className="flex items-center justify-center w-[35px] h-[35px] bg-[#EFF0F6] rounded-[10px]"
          onClick={() => setOpenFilter((value) => !value)}
        >
          <svg className="w-5 h-5">
            <use href="#filter" />
          </svg>
        </button>

        <input
          type="text"
          placeholder="جستجــــو کنید ..."
          className="w-[150px] h-[35px] text-[#808392] font-medium text-[10px]/3.5 bg-[#EFF0F6] pr-[15px] outline-none rounded-[10px]"
        />
      </div>

      <Link href="/">
        <svg className="w-6 h-6">
          <use href="#arrow-narrow-left" />
        </svg>
      </Link>

      {openFilter && (
        <Modal>
          <h3 className="text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            اعمال فیلتــــر
          </h3>

          <div className="flex flex-col gap-y-6 mt-6">
            <button className="w-full py-3 bg-[#EFF0F6] rounded-[10px] font-medium leading-6 text-[#404040]">
              جدیدترین ها
            </button>
            <button className="w-full py-3 bg-[#EFF0F6] rounded-[10px] font-medium leading-6 text-[#404040]">
              قدیمی ترین
            </button>
            <button className="w-full py-3 bg-[#EFF0F6] rounded-[10px] font-medium leading-6 text-[#404040]">
              دارای SLA
            </button>
            <button className="w-full py-3 bg-[#EFF0F6] rounded-[10px] font-medium leading-6 text-[#404040]">
              انتخاب تاریخ
            </button>
            <button className="w-full py-3 bg-[#EFF0F6] rounded-[10px] font-medium leading-6 text-[#404040]">
              انتخاب ساعت
            </button>
            <button className="w-full py-3 bg-[#EFF0F6] rounded-[10px] font-medium leading-6 text-[#404040]">
              انتخاب کاربر
            </button>

            <button className="w-full py-3 bg-[#20CFCF] text-white rounded-[10px] font-medium leading-6">
              اعمال فیلتر
            </button>
            <button
              className="w-full text-[#6C7278] font-medium leading-6 text-xs"
              onClick={() => setOpenFilter((value) => !value)}
            >
              منصرف شدم
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TicketsHead;
