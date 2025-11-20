"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";

const CallHead = ({ setFilters }) => {
  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setLocalFilters] = useState({
    newest: false,
    oldest: false,
    hasSla: false,
  });

  const toggleFilter = (key) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleApplyFilters = () => {
    setFilters(filters);
    setOpenFilter(false);
  };

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
            <button
              className={`w-full py-3 rounded-[10px] font-medium leading-6 ${
                filters.newest
                  ? "border border-[#20CFCF] text-[#20CFCF]"
                  : "bg-[#EFF0F6] text-[#404040]"
              }`}
              onClick={() => toggleFilter("newest")}
            >
              جدیدترین ها
            </button>

            <button
              className={`w-full py-3 rounded-[10px] font-medium leading-6 ${
                filters.oldest
                  ? "border border-[#20CFCF] text-[#20CFCF]"
                  : "bg-[#EFF0F6] text-[#404040]"
              }`}
              onClick={() => toggleFilter("oldest")}
            >
              قدیمی ترین
            </button>

            <button
              className={`w-full py-3 rounded-[10px] font-medium leading-6 ${
                filters.hasSla
                  ? "border border-[#20CFCF] text-[#20CFCF]"
                  : "bg-[#EFF0F6] text-[#404040]"
              }`}
              onClick={() => toggleFilter("hasSla")}
            >
              دارای SLA
            </button>

            <button
              className="w-full py-3 bg-[#20CFCF] text-white rounded-[10px] font-medium leading-6"
              onClick={handleApplyFilters}
            >
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

export default CallHead;
