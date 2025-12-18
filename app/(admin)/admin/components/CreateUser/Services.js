"use client";

import { useEffect, useRef, useState } from "react";
import { Modal } from "@/app/(main)/components/Modal";
import { createService } from "@/actions/service";
import toast from "react-hot-toast";

const Services = ({ allServices = [], selected = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* close modal on outside click */
  useEffect(() => {
    if (!isModalOpen) return;

    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isModalOpen]);

  const toggleService = (item) => {
    const exists = selected.some((s) => s.id === item.id);
    if (exists) {
      onChange(selected.filter((s) => s.id !== item.id));
    } else {
      onChange([...selected, item]);
    }
  };

  const handleCreateService = async () => {
    if (!newServiceName.trim()) {
      toast.error("پر کردن نام سرویس الزامی است.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newServiceName);

      const res = await createService(formData);

      if (res.status) {
        toast.success(res.message);

        const newService = { id: Date.now(), name: newServiceName };
        onChange([...selected, newService]);

        setNewServiceName(""); // خالی کردن input
        setIsModalOpen(false); // بستن modal
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("خطا در ایجاد سرویس.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown field */}
        <div
          className="input-shadow flex items-center justify-between w-full h-[46px] border border-[#EDF1F3] rounded-[10px] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="pr-4 text-xs font-medium text-[#8C8C8C] truncate">
            {selected.length
              ? selected.map((s) => s.name).join(" ، ")
              : "انتخاب سرویــس"}
          </p>

          <button
            type="button"
            className="flex items-center justify-center w-[62px] h-full border-r border-[#EDF1F3]"
          >
            <svg
              className={`w-3 h-3 text-[#6C7278] transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <use href="#arrow-down-2" />
            </svg>
          </button>
        </div>

        {/* Dropdown list */}
        {isOpen && (
          <div className="custom-shadow absolute top-[50px] right-0 left-0 bg-white border border-[#EFF0F6] rounded-[10px] z-10 max-h-60 overflow-y-auto">
            <ul className="divide-y divide-[#EFF0F6] text-sm text-[#8C8C8C]">
              {allServices.length ? (
                allServices.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleService(item)}
                    className={`flex items-center justify-center gap-x-2 py-3 cursor-pointer hover:text-[#1A1C1E] ${
                      selected.some((s) => s.id === item.id)
                        ? "text-black font-semibold"
                        : ""
                    }`}
                  >
                    {item.name}
                  </li>
                ))
              ) : (
                <li className="text-center py-3 text-gray-400">
                  سرویسی یافت نشد
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Open modal */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full text-xs font-medium text-[#8C8C8C]"
        >
          تعریف سرویــس جدید
        </button>

        {/* Hidden input for form */}
        <input type="hidden" name="services" value={JSON.stringify(selected)} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal>
          <div ref={modalRef}>
            <h4 className="text-center text-xs font-medium text-[#8C8C8C] mb-5">
              تعریف سرویــس
            </h4>

            <div className="flex items-center w-full h-[46px] border border-[#EDF1F3] rounded-[10px]">
              <input
                ref={inputRef}
                type="text"
                placeholder="عنوان سرویس"
                value={newServiceName} // اضافه کن
                onChange={(e) => setNewServiceName(e.target.value)}
                className="grow h-full pr-3.5 pl-2.5 text-xs font-medium outline-none text-[#8C8C8C]"
              />

              <button
                type="button"
                onClick={handleCreateService}
                className="flex items-center justify-center w-[62px] h-full border-r border-[#EDF1F3]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>

            {/* fake list (UI only) */}
            <ul className="mt-4 space-y-2">
              {allServices.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between text-sm text-[#8C8C8C]"
                >
                  {item.name}
                  <svg className="w-4 h-4 text-red-500 cursor-pointer">
                    <use href="#delete" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Services;
