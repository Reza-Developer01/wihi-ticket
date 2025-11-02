"use client";

import { useState } from "react";
import { Modal } from "../Modal";

const FaqItem = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className="custom-shadow flex items-center gap-x-3.5 w-full h-12 pr-[21px] bg-white border border-[#EFF0F6] rounded-[10px]"
      >
        <svg className="w-[15px] h-3.5 text-[#39D4D4]">
          <use href="#arrow-1" />
        </svg>

        <span className="text-[#404040] font-light text-xs/[16.8px] tracking-[-0.12px]">
          {item.title}
        </span>
      </button>

      {openModal && (
        <Modal>
          <div className="flex flex-col gap-y-5">
            <h4 className="text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
              مشاهده جزئیات
            </h4>

            <h2 className="text-[#404040] text-xs/[16.8px]">
              {item.title}
            </h2>

            <p className="text-[#595959] font-light text-xs/[16.8px] tracking-[-0.12px]">
              {item.detail}
            </p>

            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="pt-2.5 text-[#2BD1D1] text-xs/[16.8px]"
            >
              متوجـــه شدم
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FaqItem;
