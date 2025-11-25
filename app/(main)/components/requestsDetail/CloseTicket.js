"use client";

import { useActionState, useEffect, useState } from "react";
import { Modal } from "../Modal";
import { closeTicket } from "@/actions/ticket";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CloseTicket = ({ ticketNumber }) => {
  const [state, formAction] = useActionState(closeTicket, {});
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state?.message);
      setOpenModal(false);
      router.push("/requests-list");
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center w-[100px] h-[30px] bg-[#40404033] text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]"
        onClick={() => setOpenModal(true)}
      >
        بستن درخواست
      </button>

      {openModal && (
        <Modal>
          <h4 className="mb-6 text-[#FF0000] font-semibold leading-[22.4px] tracking-[-0.12px]">
            بستن درخواست
          </h4>

          <form action={formAction} className="flex flex-col">
            <textarea
              name="comment"
              className="custom-shadow w-[240px] h-[150px] mx-auto pt-[15px] pr-[15px] text-[#404040] text-xs/[16.8px] tracking-[-0.12px] bg-white border border-[#EFF0F6] rounded-[10px] outline-none"
              placeholder="دلیل بستن درخواست خود را بنویسد"
            ></textarea>
            <input type="hidden" name="ticket_number" value={ticketNumber} />
            <input type="hidden" name="status" value="closed" />

            <div className="flex flex-col gap-y-6">
              <button
                type="submit"
                className="flex items-center justify-center w-[239px] h-12 mx-auto mt-6 leading-6 text-white bg-[#FF0000] rounded-[10px] tracking-[-0.12px]"
              >
                تایید
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpenModal(false);
                }}
                className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
              >
                منصرف شدم
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CloseTicket;
