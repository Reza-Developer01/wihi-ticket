// "use client";

// import { assignAgent } from "@/actions/agent";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const ChangeAgentButton = ({ agents, ticket_number, hasPermission }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedAgent, setSelectedAgent] = useState(
//     "انتخاب کارشناس مربوطـــــه"
//   );

//   const router = useRouter();

//   const handleSelect = async (agent) => {
//     setSelectedAgent(agent.full_name);
//     setOpen(false);

//     const response = await assignAgent(ticket_number, agent.id);

//     if (response.status) {
//       // toast.success(response.message);
//       router.push(`/agent/assign-agent?ticket=${ticket_number}`);
//     } else {
//       toast.error(response?.message || "خطا در تغییر کارشناس");
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => {
//           if (hasPermission) {
//             setOpen((prev) => !prev);
//           }
//         }}
//         className="flex items-center justify-between gap-x-[13px] w-[160px] h-[30px] px-3 bg-[#292D321A] text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]"
//       >
//         {hasPermission ? selectedAgent : "شما به این مورد دسترسی ندارید"}

//         {hasPermission && (
//           <svg
//             className={`w-[15px] h-[15px] transition-all ${
//               open ? "rotate-180" : ""
//             }`}
//           >
//             <use href="#arrow-down" />
//           </svg>
//         )}
//       </button>

//       {hasPermission && (
//         <div
//           className={`custom-shadow ${
//             open ? "opacity-100 visible" : "opacity-0 invisible"
//           } absolute top-[calc(100%+4px)] right-0 left-0 flex flex-col gap-y-3 py-3 w-full bg-white border border-[#EDF1F3] rounded-[7px] transition-all`}
//         >
//           {agents?.map((agent) => (
//             <span
//               key={agent.id}
//               onClick={() => handleSelect(agent)}
//               className="cursor-pointer hover:bg-gray-100 text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] px-2 py-1 rounded-[5px] transition"
//             >
//               {agent.full_name}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChangeAgentButton;

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import { assignAgent } from "@/actions/agent";

const ChangeAgentButton = ({ agents, ticket_number, hasPermission }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isGuidedReasonModalOpen, setIsGuidedReasonModalOpen] = useState(false);

  const handleSelect = (agent) => {
    setSelectedAgent(agent);
    setOpen(false);
    setIsGuidedReasonModalOpen(true); // 🔥 مرحله مهم
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => hasPermission && setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-x-[13px] w-[160px] h-[30px] px-3 bg-[#292D321A] text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]"
      >
        {hasPermission
          ? selectedAgent?.full_name || "انتخاب کارشناس مربوطـــــه"
          : "شما به این مورد دسترسی ندارید"}

        {hasPermission && (
          <svg
            className={`w-[15px] h-[15px] transition-all ${
              open ? "rotate-180" : ""
            }`}
          >
            <use href="#arrow-down" />
          </svg>
        )}
      </button>

      {hasPermission && (
        <div
          className={`custom-shadow ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          } absolute top-[calc(100%+4px)] right-0 left-0 flex flex-col gap-y-3 py-3 w-full bg-white border border-[#EDF1F3] rounded-[7px] transition-all`}
        >
          {agents?.map((agent) => (
            <span
              key={agent.id}
              onClick={() => handleSelect(agent)}
              className="cursor-pointer hover:bg-gray-100 text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] px-2 py-1 rounded-[5px] transition"
            >
              {agent.full_name}
            </span>
          ))}
        </div>
      )}

      {/* 🔥 مدال — فقط وقتی باز باشد */}
      {isGuidedReasonModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            چرایی هدایــت درخواست تماس
          </h4>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const comment = e.target.comment.value;

              // 🔥 دقیقا همان ارسال ساده‌ای که گفتی
              const response = await assignAgent(
                ticket_number,
                selectedAgent.id
              );

              if (response.status) {
                router.push(`/agent/assign-agent?ticket=${ticket_number}`);
              } else {
                toast.error(response?.message || "خطا در تغییر کارشناس");
              }

              setIsGuidedReasonModalOpen(false);
            }}
            className="flex flex-col"
          >
            <textarea
              name="comment"
              className="custom-shadow w-[240px] h-[150px] mx-auto pt-[15px] pr-[15px] text-[#404040] text-xs/[16.8px] tracking-[-0.12px] bg-white border border-[#EFF0F6] rounded-[10px] outline-none"
              placeholder="دلیل هدایت درخواست تماس را بنویسید"
            />

            <input
              type="hidden"
              name="call_request_number"
              value={ticket_number}
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
                className="flex items-center justify-center w-[239px] h-12 mx-auto mt-6 leading-6 text-[#404040] bg-[#DBDBDB] rounded-[10px] tracking-[-0.12px]"
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
    </div>
  );
};

export default ChangeAgentButton;
