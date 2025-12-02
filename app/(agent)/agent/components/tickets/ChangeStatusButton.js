"use client";

import changeStatus from "@/actions/changeStatusTicket";
import { useState } from "react";
import HistoryStatus from "./HistoryStatus";
import toast from "react-hot-toast";
import { Modal } from "@/app/(main)/components/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

const statusMap = {
  "در دست بررسی": "is_progress",
  "منتظر پاسخ": "open",
  "بسته شده": "closed",
  // "هدایت شده": "guided",
};

const reverseStatusMap = Object.fromEntries(
  Object.entries(statusMap).map(([key, value]) => [value, key])
);

const ChangeStatusButton = ({
  message,
  ticket_number,
  getTicketHistory,
  status,
  user,
}) => {
  console.log({ ticket_number, getTicketHistory, status });

  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(
    status === "Guided" ? "هدایت شده" : reverseStatusMap[status] || status
  );
  const [showHistory, setShowHistory] = useState(false);
  const [showCloseTicket, setShowCloseTicket] = useState(false);
  const [closeComment, setCloseComment] = useState("");
  const router = useRouter();

  const handleSelect = async (value, force = false) => {
    if (value === "مشاهده تغییرات") {
      setShowHistory(true);
      setOpen(false);
      return;
    }

    if (value === "منتظر پاسخ" || value === "در دست بررسی") {
      router.push(`change-status?ticket=${ticket_number}&status=${value}`);
    }

    // if (value === "منتظر پاسخ") {
    //   router.push(`change-status?ticket=${ticket_number}`);
    //   // return;
    // }

    // if (value === "در دست بررسی") {
    //   router.push(`change-status?ticket=${ticket_number}`);
    //   // return;
    // }

    // اگر کاربر از منوی اصلی روی "بسته شده" زد → فقط مدال را باز کن
    if (value === "بسته شده" && !force) {
      setShowCloseTicket(true);
      setOpen(false);
      return;
    }

    // اگر به اینجا برسیم یعنی از داخل مدال "تایید" کلیک شده
    setSelectedMessage(value);
    setOpen(false);

    const response = await changeStatus(
      ticket_number,
      statusMap[value],
      closeComment
    );

    console.log(response);

    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const hasChangeTicketStatus = user.permissions.some(
    (p) => p.slug === "change_ticket_status"
  );

  const hasCloseTicket = user.permissions.some(
    (p) => p.slug === "close_ticket"
  );

  console.log("hasCloseTicket : ", hasCloseTicket);

  return (
    <>
      <button
        onClick={() => setOpen((value) => !value)}
        className="relative flex items-center justify-between w-[121px] h-[30px] px-2.5 rounded-[7px] bg-[#292D321A]"
      >
        <div className="flex items-center gap-x-[5px]">
          <svg className="w-[15px] h-[15px] text-[#17C7C7]">
            <use href="#info" />
          </svg>

          <span className="text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px]">
            {selectedMessage}
          </span>
        </div>

        <svg
          className={`w-[15px] h-[15px] ${
            open ? "rotate-180" : ""
          } transition-all`}
        >
          <use href="#arrow-down" />
        </svg>

        {/* منوی بازشونده */}
        <div
          className={`custom-shadow ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          } absolute top-[calc(100%+4px)] right-0 left-0 flex flex-col gap-y-3 py-3 w-full bg-white border border-[#EDF1F3] rounded-[7px] transition-all`}
        >
          {[...Object.keys(statusMap), "مشاهده تغییرات"]
            .filter((item) => {
              if (
                !hasChangeTicketStatus &&
                (item === "در دست بررسی" || item === "منتظر پاسخ")
              ) {
                return false;
              }

              // اگه مجوز بستن درخواست نداریم، گزینه "بسته شده" رو حذف کن
              if (!hasCloseTicket && item === "بسته شده") {
                return false;
              }

              return true;
            })
            .map((item) => (
              <span
                key={item}
                onClick={() => handleSelect(item)}
                className="cursor-pointer hover:bg-gray-100 text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] px-2 py-1 rounded-[5px] transition"
              >
                {item}
              </span>
            ))}
        </div>

        {showHistory && (
          <HistoryStatus
            getTicketHistory={getTicketHistory}
            setShowHistory={setShowHistory}
          />
        )}

        {showCloseTicket && (
          <Modal>
            <h4 className="mb-6 text-[#FF0000] font-semibold leading-[22.4px] tracking-[-0.12px]">
              بستن درخواست
            </h4>

            <form action="#" className="flex flex-col">
              <textarea
                name="comment"
                className="custom-shadow w-[240px] h-[150px] mx-auto pt-[15px] pr-[15px] text-[#404040] text-xs/[16.8px] tracking-[-0.12px] bg-white border border-[#EFF0F6] rounded-[10px] outline-none"
                placeholder="دلیل بستن درخواست خود را بنویسد"
                value={closeComment}
                onChange={(e) => setCloseComment(e.target.value)}
              ></textarea>
              <input type="hidden" name="ticket_number" value={ticket_number} />

              <div className="flex flex-col gap-y-6">
                <a
                  onClick={async (e) => {
                    e.preventDefault();

                    if (!closeComment.trim()) {
                      toast.error("لطفاً دلیل بستن درخواست را وارد کنید");
                      return;
                    }

                    setShowCloseTicket(false);

                    await handleSelect("بسته شده", true);
                  }}
                  href="#"
                  className="flex items-center justify-center w-[239px] h-12 mx-auto mt-6 leading-6 text-white bg-[#FF0000] rounded-[10px] tracking-[-0.12px]"
                >
                  تایید
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setShowCloseTicket(false);
                  }}
                  className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
                >
                  منصرف شدم
                </button>
              </div>
            </form>
          </Modal>
        )}
      </button>
    </>
  );
};

export default ChangeStatusButton;
