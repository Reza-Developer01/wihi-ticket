"use client";

import { sendMessage } from "@/actions/message";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "../Modal";

const MessageInput = ({
  requestStatus,
  ticketNumber,
  id,
  comment_cancelled,
}) => {
  console.log({ requestStatus, ticketNumber, id, comment_cancelled });
  const [state, formAction] = useActionState(sendMessage, {});
  const [openModal, setOpenModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state?.message);
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  const handleFormSubmit = async (formData) => {
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    return formAction(formData);
  };

  const handleConfirmFile = () => {
    if (!selectedFile) {
      toast.error("فایلی انتخاب نشده است.");
      return;
    }
    setOpenModal(false);
  };

  return (
    <form
      action={handleFormSubmit}
      className={`custom-shadow w-full h-12 pr-6 pl-[19px] ${
        requestStatus === "closed" ? "bg-[#FFCCCC]" : "bg-[#EFF0F6]"
      } rounded-[10px]`}
    >
      <div className="flex items-center justify-center w-full h-full">
        {requestStatus === "closed" && (
          <button
            type="button"
            onClick={() => setOpenCancelModal(true)}
            className="text-center text-[#FF0000] leading-[22.4px] font-semibold tracking-[-0.12px]"
          >
            درخواست بسته شده
          </button>
        )}

        {requestStatus !== "closed" && (
          <>
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
          </>
        )}

        {openModal && (
          <Modal>
            <h4 className="mb-6 text-[#2AD1D1] font-semibold leading-[22.4px] tracking-[-0.12px]">
              بارگــذاری فایل
            </h4>

            <div
              className={`relative flex items-center gap-x-2 w-[239px] h-[75px] mx-auto pr-[15px] rounded-[10px] overflow-hidden transition-all duration-300
              ${
                hasFile
                  ? "bg-[#00C96B33] outline outline-[#00C96B]"
                  : "bg-white outline outline-[#EDF1F3]"
              }
              `}
              style={{ boxShadow: "0px 1px 2px 0px #E4E5E73D" }}
            >
              <svg
                className={`w-[45px] h-[45px] shrink-0 transition-all duration-300
                ${hasFile ? "text-[#00C96B]" : "text-[#404040]"}
                `}
              >
                <use href="#upload" />
              </svg>

              <div className="flex flex-col gap-y-1">
                <h5
                  className={`text-xs/[16.8px] tracking-[-0.12px] transition-all duration-300
                  ${hasFile ? "text-[#00C96B]" : "text-[#6C7278]"}
                  `}
                >
                  {hasFile ? "فایل انتخاب شد" : "برای آپلود کلیک کنید"}
                </h5>
                <p
                  className={`text-[8px]/[11.2px] tracking-[-0.12px] w-[157px] transition-all duration-300
                  ${hasFile ? "text-[#00C96B]" : "text-[#6C7278]"}
                  `}
                >
                  در نظر داشته باشید تا حجم 50 مگابایت آپلود صورت گیرد و فرمت
                  PNG , JPG , PDF
                </p>
              </div>

              <input
                multiple
                type="file"
                name="file"
                className="absolute inset-0 w-full h-full text-transparent cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  if (file.size > 50 * 1024 * 1024) {
                    toast.error("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.");
                    e.target.value = "";
                    setHasFile(false);
                    setSelectedFile(null);
                    return;
                  }

                  setSelectedFile(file);
                  setHasFile(true);
                }}
              />
            </div>

            <div className="flex flex-col gap-y-6">
              <button
                type="button"
                onClick={handleConfirmFile}
                className="flex items-center justify-center w-[239px] h-12 mx-auto mt-6 leading-6 text-white bg-[#20CFCF] rounded-[10px] tracking-[-0.12px]"
              >
                تایید
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setHasFile(false);
                  setOpenModal(false);
                }}
                className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
              >
                منصرف شدم
              </button>
            </div>
          </Modal>
        )}
      </div>

      {openCancelModal && comment_cancelled && (
        <Modal>
          <h4 className="mb-6 text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            مشاهده جزئیات
          </h4>

          <div
            className="font-light text-xs h-[150px]"
            style={{ boxShadow: "0px -3px 6px 0px #F4F5FA99 inset" }}
          >
            <p className="pt-2.5 pl-2.5 pr-2">{comment_cancelled}</p>
          </div>

          <div className="flex flex-col gap-y-6">
            <button
              onClick={() => setOpenCancelModal(false)}
              type="button"
              className="flex items-center justify-center w-full h-12 bg-[#FF000033] text-[#FF0000] rounded-[10px] mt-6 font-medium"
            >
              مشاهده
            </button>

            <button
              onClick={() => setOpenCancelModal(false)}
              type="button"
              className="text-[#6C7278] text-xs"
            >
              متوجـــه شدم
            </button>
          </div>
        </Modal>
      )}
    </form>
  );
};

export default MessageInput;
