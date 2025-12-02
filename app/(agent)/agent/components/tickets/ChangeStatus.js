"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import Modal from "../Modal";
import { changeStatus, guidedStatus } from "@/actions/call";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const statusOptions = [
  { label: "در صف تماس", value: "callـqueue" },
  { label: "هدایت شده", value: "Guided" },
  { label: "بررسی شده", value: "Checked" },
  { label: "لغو شده", value: "cancelled" },
];

const ChangeStatus = ({
  call_request_number,
  initialStatus = "callـqueue",
  agentsList = [],
  user,
}) => {
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

  const permissions = user?.permissions || [];

  const hasCloseCall =
    user.role === "admin" || permissions.some((p) => p.slug === "close_call");
  const hasCallStatus =
    user.role === "admin" ||
    permissions.some((p) => p.slug === "change_call_status");
  const hasCanAssign =
    user.role === "admin" ||
    permissions.some((p) => p.slug === "can_assign_callrequests");

  const visibleStatusOptions = statusOptions.filter((option) => {
    if (option.value === "cancelled") return hasCloseCall;
    if (option.value === "callـqueue" || option.value === "Checked")
      return hasCallStatus;
    if (option.value === "Guided") return hasCanAssign;
    return false;
  });

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

    if (label === "لغو شده") return setIsModalOpen(true);
    if (label === "هدایت شده") return setIsGuidedModalOpen(true);

    if (value === "callـqueue" || value === "Checked") {
      const form = document.getElementById("quick-status-form");
      form.querySelector('input[name="status"]').value = value;
      form.requestSubmit();
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* دکمه وضعیت */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={noAccess}
        className={`flex items-center justify-between px-3.5 w-full h-12 mt-[9px] text-white font-medium leading-6 rounded-[10px] ${
          noAccess ? "bg-gray-400 cursor-not-allowed" : "bg-[#20CFCF]"
        }`}
      >
        <div></div>
        {noAccess ? "دسترسی ندارید" : selected}
        <div className="border-r border-r-white pr-3 flex items-center">
          <svg
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <use href="#arrow-down-2" />
          </svg>
        </div>
      </button>

      {/* منوی وضعیت */}
      {isOpen && !noAccess && (
        <div className="custom-shadow absolute bottom-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-20 max-h-60 overflow-y-auto">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
            {visibleStatusOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.label, option.value)}
                className="cursor-pointer hover:text-black pb-3"
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
                <span className="truncate text-sm/[19.6px]">
                  {selectedAgent
                    ? selectedAgent.full_name
                    : "کارشناس مورد نظر را انتخاب کنید"}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 text-[#1A1C1E] ${
                    isAgentOpen ? "rotate-180" : ""
                  }`}
                >
                  <use href="#arrow-down" />
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
                          setIsGuidedModalOpen(false);
                          setIsGuidedReasonModalOpen(true);
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
