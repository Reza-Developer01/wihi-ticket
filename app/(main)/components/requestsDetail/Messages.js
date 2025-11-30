"use client";
import { useState } from "react";
import CloseTicket from "./CloseTicket";
import { Modal } from "../Modal";

const Messages = ({ request, comment_guided }) => {
  const [openModal, setOpenModal] = useState(false);

  const getStatusStyle = (status) => {
    switch (status) {
      case "open":
        return {
          bg: "bg-[#0068C933]",
          text: "text-[#0068C9]",
          message: "در دست بررسی",
        };
      case "is_progress":
        return {
          bg: "bg-[#FF770033]",
          text: "text-[#FF7700]",
          message: "منتظر پاسخ کاربر",
        };
      case "closed":
        return {
          bg: "bg-[#FF000033]",
          text: "text-[#FF0000]",
          message: "بسته شده",
        };
      case "Guided":
        return {
          bg: "bg-[#40404033]",
          text: "text-[#404040]",
          message: "هدایت شده",
        };
      default:
        return {
          bg: "bg-[#E5E7EB]",
          text: "text-[#6B7280]",
          message: "در دست بررسی",
        };
    }
  };

  const { bg, text, message } = getStatusStyle(request.status);

  const allMessages = [
    {
      id: "first_message",
      message: request.first_message,
      sender_name: request.owner_name,
      created_at: request.created_at,
      file: request.file,
    },
    ...request.messages,
  ];

  return (
    <div className="relative h-[520px]">
      {/* head */}
      <div className="flex items-center justify-between mb-[15px]">
        {request.status !== "closed" && (
          <button
            type="button"
            onClick={() => {
              if (request.status === "Guided") {
                setOpenModal(true);
              }
            }}
            className={`flex items-center justify-center w-[100px] h-[30px] ${bg} ${text} font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]`}
          >
            {message}
          </button>
        )}

        {request.status !== "closed" && (
          <CloseTicket ticketNumber={request.ticket_number} />
        )}
      </div>

      {openModal && (
        <Modal>
          <h4 className="mb-6 text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            مشاهده جزئیات
          </h4>

          <div
            className="font-light text-xs h-[150px]"
            style={{ boxShadow: "0px -3px 6px 0px #F4F5FA99 inset" }}
          >
            <p className="pt-2.5 pl-2.5 pr-2">{comment_guided}</p>
          </div>

          <div className="flex flex-col gap-y-6">
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="flex items-center justify-center w-full h-12 bg-[#D9D9D9] text-[#404040] rounded-[10px] mt-6 font-medium"
            >
              مشاهده
            </button>

            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="text-[#6C7278] text-xs"
            >
              متوجـــه شدم
            </button>
          </div>
        </Modal>
      )}

      {/* body — بدون هیچ تغییری */}
      <div className="flex flex-col overflow-y-auto gap-y-[25px] h-[calc(100%-54px)]">
        {allMessages.map((item) => (
          <div key={item.id} className="flex flex-col gap-y-2.5 *:w-[245px]">
            {item.file ? (
              <>
                <div className="custom-shadow flex items-center h-12 pr-2.5 bg-white border border-[#F1F1F7] rounded-[10px]">
                  <p className="text-[#404040] text-xs/[16.8px] w-[202px]">
                    {item.message}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <a
                    href={item.file}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center w-[45px] h-[45px] border border-[#808392] rounded-[10px]"
                  >
                    <svg className="w-6 h-6 text-[#808392]">
                      <use href="#paper-download" />
                    </svg>
                    <span className="text-[#808392] text-[7px]/[9.8px] tracking-[-0.12px]">
                      {item.file
                        ? item.file
                            .split("/")
                            .pop()
                            .split(".")
                            .pop()
                            .toUpperCase()
                        : ""}
                    </span>
                  </a>
                </div>
              </>
            ) : (
              <div className="custom-shadow flex items-center h-12 pr-2.5 bg-white border border-[#F1F1F7] rounded-[10px]">
                <p className="text-[#404040] text-xs/[16.8px] w-[202px]">
                  {item.message}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-[#8C8C8C]">
              <div className="flex items-center gap-x-1">
                <svg className="w-2.5 h-2.5">
                  <use href="#profile" />
                </svg>
                <span className="font-light text-[10px]/[14px] tracking-[-0.12px]">
                  {item.sender_name}
                </span>
              </div>
              <div className="flex items-center gap-x-1 font-light text-[10px]/[14px] tracking-[-0.12px]">
                <span>
                  {new Date(item.created_at).toLocaleTimeString("fa-IR")}
                </span>
                <span>-</span>
                <span>
                  {new Date(item.created_at).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
