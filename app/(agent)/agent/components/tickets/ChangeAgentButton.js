"use client";

import { useState } from "react";

const ChangeAgentButton = ({ agents }) => {
  const [open, setOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(
    "انتخاب کارشناس مربوطـــــه"
  );

  const handleSelect = (agent) => {
    setSelectedAgent(agent);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-x-[13px] w-[150px] h-[30px] px-3 bg-[#292D321A] text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] rounded-[7px]"
      >
        {selectedAgent}

        <svg
          className={`w-[15px] h-[15px] transition-all ${
            open ? "rotate-180" : ""
          }`}
        >
          <use href="#arrow-down" />
        </svg>
      </button>

      {/* زیرمنوی بازشونده */}
      <div
        className={`custom-shadow ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } absolute top-[calc(100%+4px)] right-0 left-0 flex flex-col gap-y-3 py-3 w-full bg-white border border-[#EDF1F3] rounded-[7px] transition-all`}
      >
        {agents.map((agent) => (
          <span
            key={agent.id}
            onClick={() => handleSelect(agent.full_name)}
            className="cursor-pointer hover:bg-gray-100 text-[#404040] font-medium text-[10px]/3.5 tracking-[-0.12px] px-2 py-1 rounded-[5px] transition"
          >
            {agent.full_name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChangeAgentButton;
