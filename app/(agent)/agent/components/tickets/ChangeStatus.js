"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import Modal from "../Modal";
import { changeStatus, guidedStatus } from "@/actions/call";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const statusOptions = [
  { label: "در صف تماس", value: "queue_call" },
  { label: "هدایت شده", value: "Guided" },
  { label: "بررسی شده", value: "Checked" },
  { label: "لغو شده", value: "cancelled" },
  { label: "در دست بررسی", value: "is_progress" },
];

const STATUS_COLORS = {
  queue_call: "bg-[#FF880033]",
  Checked: "bg-[#00C96B33]",
  Guided: "bg-[#40404033]",
  cancelled: "bg-[#FF000033]",
  is_progress: "bg-[#0068C933]",
};

const STATUS_TEXT_COLORS = {
  queue_call: "text-[#FF8000]",
  Checked: "text-[#00C96B]",
  Guided: "text-[#404040]",
  cancelled: "text-[#FF0000]",
  is_progress: "text-[#0068C9]",
};

const ChangeStatus = ({
  call_request_number,
  initialStatus = "queue_call",
  agentsList = [],
  user,
  comment_guided,
  comment_cancelled,
}) => {
  const isCancelled = initialStatus === "cancelled";
  const canOpenAfterCancelled =
    user?.role === "admin" || user?.role === "agent";
  const statusBgColor = STATUS_COLORS[initialStatus] || "bg-[#20CFCF]";

  const role = user?.role;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    statusOptions.find((s) => s.value === initialStatus)?.label || "در صف تماس"
  );
  const dropdownRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuidedModalOpen, setIsGuidedModalOpen] = useState(false);
  const [isGuidedReasonModalOpen, setIsGuidedReasonModalOpen] = useState(false);

  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const agentDropdownRef = useRef(null);

  const [agents, setAgents] = useState(agentsList);

  const [state, formAction] = useActionState(changeStatus, {});
  const [stateGuided, formActionGuided] = useActionState(guidedStatus, {});

  const [isGuidedViewModalOpen, setIsGuidedViewModalOpen] = useState(false);
  const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false);

  const permissions = user?.permissions || [];

  const hasCloseCall =
    user.role === "admin" || permissions.some((p) => p.slug === "close_call");
  const hasCallStatus =
    user.role === "admin" ||
    permissions.some((p) => p.slug === "change_call_status");
  const hasCanAssign =
    user.role === "admin" ||
    permissions.some((p) => p.slug === "can_assign_callrequests");

  const visibleStatusOptions = (() => {
    if (role === "agent" && initialStatus === "cancelled") {
      return statusOptions.filter((option) => option.value === "cancelled");
    }

    if (role === "admin") {
      return statusOptions;
    }

    if (role === "customer") {
      return statusOptions.filter((option) => option.value === "cancelled");
    }

    return statusOptions.filter((option) => {
      if (option.value === "cancelled") return hasCloseCall;
      if (option.value === "queue_call" || option.value === "Checked")
        return hasCallStatus;
      if (option.value === "Guided") return hasCanAssign;
      if (option.value === "is_progress") return true;
      return false;
    });
  })();

  const noAccess = visibleStatusOptions.length === 0;

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state.message);
      router.push(
        `/agent/call-status-success?request=${encodeURIComponent(
          call_request_number
        )}`
      );
    } else {
      toast.error(state.message);
    }
  }, [state, router, call_request_number]);

  useEffect(() => {
    if (!stateGuided || Object.keys(stateGuided).length === 0) return;

    if (stateGuided?.status) {
      toast.success(stateGuided.message);
      router.push(
        `/agent/call-status-success?request=${encodeURIComponent(
          call_request_number
        )}`
      );
    } else {
      toast.error(stateGuided.message);
    }
  }, [stateGuided, router, call_request_number]);

  useEffect(() => {
    const option = statusOptions.find((s) => s.value === initialStatus);
    if (option) setSelected(option.label);
  }, [initialStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        agentDropdownRef.current &&
        !agentDropdownRef.current.contains(event.target)
      ) {
        setIsAgentOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (label, value) => {
    setSelected(label);
    setIsOpen(false);

    if (value === "cancelled") {
      // کاربر عادی یا کارشناس
      if (role === "customer") {
        // customer همیشه مدال تایپ کردن علت
        setIsModalOpen(true);
      } else if (role === "agent") {
        // اگر درخواست قبلاً لغو نشده بود، مدال تایپ کردن علت باز شود
        if (initialStatus !== "cancelled") {
          setIsModalOpen(true); // مدال تایپ کردن علت
        } else {
          setIsCancelledModalOpen(true); // فقط مشاهده علت
        }
      }
      return;
    }

    if (value === "Guided") {
      setIsGuidedModalOpen(true);
      return;
    }

    const form = document.getElementById("quick-status-form");
    form.querySelector('input[name="status"]').value = value;
    form.requestSubmit();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* دکمه وضعیت */}
      <button
        type="button"
        onClick={() => {
          if (noAccess) return;

          if (role === "admin" || role === "agent") {
            setIsOpen(!isOpen);
            return;
          }

          if (initialStatus === "Guided") {
            setIsGuidedViewModalOpen(true);
            return;
          }

          // ✅ CHANGE (فقط این شرط تغییر کرده)
          if (initialStatus === "cancelled" && role === "customer") {
            setIsCancelledModalOpen(true); // نمایش مدال read-only
            return;
          }

          if (initialStatus === "cancelled" && !canOpenAfterCancelled) {
            setIsModalOpen(true); // برای admin/agent که بعد از لغو هم می‌خوان تغییر بدن
            return;
          }

          setIsOpen(!isOpen);
        }}
        disabled={noAccess}
        className={`flex items-center justify-between px-3.5 w-full h-12 mt-[9px] text-white font-medium leading-6 rounded-[10px]
${noAccess ? "bg-[#FF000033] justify-center" : statusBgColor}`}
      >
        {initialStatus !== "Guided" && initialStatus !== "cancelled" && (
          <div></div>
        )}

        <span
          className={STATUS_TEXT_COLORS[initialStatus]}
          style={{
            margin:
              initialStatus === "Guided" || initialStatus === "cancelled"
                ? "0 auto"
                : "0",
          }}
        >
          {selected}
        </span>

        {(!isCancelled || canOpenAfterCancelled) && (
          <div className="border-r border-r-white pr-3 flex items-center">
            <svg
              className={`w-5 h-5 text-white transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <use href="#arrow-down-3" />
            </svg>
          </div>
        )}
      </button>

      {/* منوی وضعیت */}
      {isOpen && !noAccess && (!isCancelled || canOpenAfterCancelled) && (
        <div className="custom-shadow absolute bottom-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-20 max-h-60 overflow-y-auto">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm text-center divide-y divide-[#EFF0F6]">
            {visibleStatusOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.label, option.value)}
                className={`cursor-pointer hover:text-black ${
                  user.role === "customer" ? "pb-0" : "pb-3 last:pb-0"
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* مدال لغو */}
      {isModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#FF0000] font-semibold leading-[22.4px] tracking-[-0.12px]">
            چرایی لغــو درخواست تماس
          </h4>
          <form action={formAction} className="flex flex-col">
            <textarea
              name="comment"
              className="custom-shadow w-[240px] h-[150px] mx-auto pt-[15px] pr-[15px] text-[#404040] text-xs/[16.8px] tracking-[-0.12px] bg-white border border-[#EFF0F6] rounded-[10px] outline-none"
              placeholder="دلیل بستن درخواست خود را بنویسید"
            />
            <input
              type="hidden"
              name="call_request_number"
              value={call_request_number}
            />
            <input type="hidden" name="status" value="cancelled" />
            <div className="flex flex-col gap-y-6">
              <button
                type="submit"
                className="flex items-center justify-center w-[239px] h-12 mx-auto mt-6 leading-6 text-white bg-[#FF0000] rounded-[10px] tracking-[-0.12px]"
              >
                تایید
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
              >
                منصرف شدم
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* مدال هدایت شده و انتخاب کارشناس */}
      {isGuidedModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#2AD1D1] font-semibold leading-[22.4px] tracking-[-0.12px]">
            هدایت به کارشناس مربوطــه
          </h4>
          <form action={formActionGuided} className="flex flex-col">
            <div className="relative w-full" ref={agentDropdownRef}>
              <button
                type="button"
                onClick={() => setIsAgentOpen(!isAgentOpen)}
                className="flex items-center justify-between w-full h-12 px-4 border border-[#EFF0F6] rounded-[10px] bg-white text-[#1A1C1E]"
              >
                <span className="truncate text-sm/[19.6px] text-[#1A1C1E]">
                  {selectedAgent
                    ? selectedAgent.full_name
                    : "کارشناس مورد نظر را انتخاب کنید"}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 text-[#1A1C1E] ${
                    isAgentOpen ? "rotate-180" : ""
                  }`}
                >
                  <use href="#arrow-down-3" />
                </svg>
              </button>
              {isAgentOpen && (
                <div className="absolute top-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] shadow-lg max-h-60 overflow-y-auto z-10">
                  <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
                    {agents.map((agent) => (
                      <li
                        key={agent.id}
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsAgentOpen(false);
                        }}
                        className={`cursor-pointer hover:text-black pb-3 ${
                          selectedAgent?.id === agent.id
                            ? "text-black font-semibold"
                            : ""
                        }`}
                      >
                        {agent.full_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-6">
              <button
                type="button"
                onClick={() => {
                  if (!selectedAgent)
                    return toast.error("لطفا یک کارشناس انتخاب کنید");
                  setIsGuidedModalOpen(false);
                  setIsGuidedReasonModalOpen(true);
                }}
                className="flex items-center justify-center w-full h-12 mx-auto mt-6 leading-6 text-white bg-[#20CFCF] rounded-[10px] tracking-[-0.12px]"
              >
                تایید
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsGuidedModalOpen(false);
                  setSelectedAgent(null);
                }}
                className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
              >
                منصرف شدم
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isGuidedReasonModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            چرایی هدایــت درخواست تماس
          </h4>
          <form action={formActionGuided} className="flex flex-col">
            <textarea
              name="comment"
              className="custom-shadow w-[240px] h-[150px] mx-auto pt-[15px] pr-[15px] text-[#404040] text-xs/[16.8px] tracking-[-0.12px] bg-white border border-[#EFF0F6] rounded-[10px] outline-none"
              placeholder="دلیل هدایت درخواست تماس را بنویسید"
            />
            <input
              type="hidden"
              name="call_request_number"
              value={call_request_number}
            />
            <input type="hidden" name="status" value="Guided" />
            <input
              type="hidden"
              name="assigned_to_id"
              value={selectedAgent?.id || ""}
            />
            <div className="flex flex-col gap-y-6">
              <button
                type="submit"
                className="flex items-center justify-center w-[239px] h-12 mx-auto mt-6 leading-6 text-white bg-[#20CFCF] rounded-[10px] tracking-[-0.12px]"
              >
                تایید
              </button>
              <button
                type="button"
                onClick={() => setIsGuidedReasonModalOpen(false)}
                className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
              >
                منصرف شدم
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isGuidedViewModalOpen && (
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
              onClick={() => setIsGuidedViewModalOpen(false)}
              type="button"
              className="flex items-center justify-center w-full h-12 bg-[#D9D9D9] text-[#404040] rounded-[10px] mt-6 font-medium"
            >
              مشاهده
            </button>

            <button
              onClick={() => setIsGuidedViewModalOpen(false)}
              type="button"
              className="text-[#6C7278] text-xs"
            >
              متوجـــه شدم
            </button>
          </div>
        </Modal>
      )}

      {isCancelledModalOpen && (
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
              onClick={() => setIsCancelledModalOpen(false)}
              type="button"
              className="flex items-center justify-center w-full h-12 bg-[#D9D9D9] text-[#404040] rounded-[10px] mt-6 font-medium"
            >
              مشاهده
            </button>

            <button
              onClick={() => setIsCancelledModalOpen(false)}
              type="button"
              className="text-[#6C7278] text-xs"
            >
              متوجـــه شدم
            </button>
          </div>
        </Modal>
      )}

      <form id="quick-status-form" action={formAction} className="hidden">
        <input
          type="hidden"
          name="call_request_number"
          value={call_request_number}
        />
        <input type="hidden" name="status" />
      </form>
    </div>
  );
};

export default ChangeStatus;
