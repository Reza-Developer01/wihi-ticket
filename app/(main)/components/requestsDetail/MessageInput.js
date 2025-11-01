"use client";

import { sendMessage } from "@/actions/message";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "../Modal";

const MessageInput = ({ ticketNumber, status, id }) => {
  const [state, formAction] = useActionState(sendMessage, {});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state?.message);
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="custom-shadow w-full h-12 pr-6 pl-[19px] bg-[#EFF0F6] rounded-[10px]"
    >
      <div className="flex items-center w-full h-full">
        <input
          type="text"
          className="w-full h-full font-light text-xs/[16.8px] placeholder:text-[#404040] tracking-[-0.12px] outline-none"
          placeholder="یاداشت کنید . . ."
          name="message"
        />
        <input type="hidden" name="ticket" value={ticketNumber} />
        <input type="hidden" name="path" value={`/requests-list/${id}`} />

        <div className="flex items-center gap-x-2">
          <button type="button" onClick={() => setOpenModal(true)}>
            <svg className="w-6 h-6">
              <use href="#upload" />
            </svg>
          </button>

          <button type="submit">
            <svg className="w-6 h-6 text-[#31D3D3]">
              <use href="#send" />
            </svg>
          </button>
        </div>

        {openModal && (
          <Modal>
            <h4 className="mb-6 text-[#2AD1D1] font-semibold leading-[22.4px] tracking-[-0.12px]">
              بارگــذاری فایل
            </h4>

            <div
              className="flex items-center gap-x-2 w-[239px] h-[75px] mx-auto pr-[15px] bg-white outline outline-[#EDF1F3] rounded-[10px]"
              style={{ boxShadow: "0px 1px 2px 0px #E4E5E73D" }}
            >
              <svg className="w-[45px] h-[45px] text-[#404040] shrink-0">
                <use href="#upload" />
              </svg>

              <div className="flex flex-col gap-y-1 text-[#6C7278]">
                <h5 className="text-xs/[16.8px] tracking-[-0.12px]">
                  برای آپلود کلیک کنید
                </h5>
                <p className="text-[8px]/[11.2px] tracking-[-0.12px] w-[157px]">
                  در نظر داشته باشید تا حجم 50 مگابایت آپلود صورت گیرد و فرمت
                  PNG , JPG , PDF
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-6">
              <button
                type="button"
                className="flex items-center justify-center w-[239px] h-12 mx-auto mt-6 leading-6 text-white bg-[#20CFCF] rounded-[10px] tracking-[-0.12px]"
              >
                تایید
              </button>

              <button
                type="button"
                className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
              >
                منصرف شدم
              </button>
            </div>
          </Modal>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
