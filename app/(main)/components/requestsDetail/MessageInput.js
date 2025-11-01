"use client";

import { sendMessage } from "@/actions/message";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const MessageInput = ({ ticketNumber, status, id }) => {
  const [state, formAction] = useActionState(sendMessage, {});

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
          <button type="button">
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
      </div>
    </form>
  );
};

export default MessageInput;
