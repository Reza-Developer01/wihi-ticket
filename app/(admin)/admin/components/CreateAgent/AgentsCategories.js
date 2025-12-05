"use client";

import { useTransition } from "react";
import { createCategoryAgent, deleteCategoryAgent } from "@/actions/agent";
import { Modal } from "@/app/(main)/components/Modal";
import { useState, useRef, useEffect, useActionState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AgentsCategories = ({ agentsCategory }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false); // dropdown
  const [isModalOpen, setIsModalOpen] = useState(false); // modal
  const [stateCategoryAgent, formActionCategoryAgent] = useActionState(
    createCategoryAgent,
    {}
  );
  const [deleteState, deleteCategoryAction] = useActionState(
    deleteCategoryAgent,
    {}
  );
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (!stateCategoryAgent || Object.keys(stateCategoryAgent).length === 0)
      return;

    if (stateCategoryAgent?.status) {
      toast.success(stateCategoryAgent?.message);
      router.refresh();
    } else {
      toast.error(stateCategoryAgent?.message);
    }
  }, [stateCategoryAgent]);

  useEffect(() => {
    if (!deleteState || Object.keys(deleteState).length === 0) return;

    if (deleteState.status) {
      toast.success(deleteState.message);
      router.refresh();
    } else {
      toast.error(deleteState.message);
    }
  }, [deleteState]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const toggleCategory = (item) => {
    setSelectedCategories((prev) =>
      prev.some((c) => c.id === item.id)
        ? prev.filter((c) => c.id !== item.id)
        : [...prev, item]
    );
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div
          className="input-shadow flex items-center justify-between w-full h-[46px] border border-[#EDF1F3] rounded-[10px] overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="pr-12 font-medium text-xs/[16.8px] tracking-[-0.12px] text-[#8C8C8C]">
            {selectedCategories.length > 0
              ? selectedCategories.map((c) => c.name).join(" ، ")
              : "انتخاب دسته بندی کارشناس"}
          </p>

          <button
            type="button"
            className="flex items-center justify-center w-[62px] h-full border-r border-r-[#EDF1F3]"
          >
            <svg
              className={`w-3 h-3 text-[#6C7278] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <use href="#arrow-down-2" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="custom-shadow absolute top-[50px] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-10 max-h-60 overflow-y-auto">
            <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
              {agentsCategory?.length > 0 ? (
                agentsCategory.map((item) => (
                  <li
                    key={item.id}
                    className={`cursor-pointer flex items-center justify-between pb-3 ${
                      selectedCategories.some((c) => c.id === item.id)
                        ? "text-black font-semibold"
                        : ""
                    }`}
                    onClick={() => toggleCategory(item)}
                  >
                    {item.name}

                    {selectedCategories.some((c) => c.id === item.id) && (
                      <svg className="w-4 h-4 text-green-500">
                        <use href="#check" />
                      </svg>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 pb-3">
                  هیچ دسته‌بندی‌ای یافت نشد
                </li>
              )}
            </ul>
          </div>
        )}

        <button
          type="button"
          className="flex items-center justify-center w-full text-[#8C8C8C] font-medium text-xs/[16.8px] mt-4"
          onClick={() => setIsModalOpen(true)}
        >
          تعریف دستــه بندی جدید
        </button>

        <input
          type="hidden"
          name="category_agent"
          value={JSON.stringify(selectedCategories)}
        />
      </div>

      {isModalOpen && (
        <Modal>
          <div ref={modalRef}>
            <h4 className="text-[#8C8C8C] text-xs/[16.8px] font-medium text-center mb-[22px]">
              تعریف دستــه بندی کارشناس
            </h4>

            <div
              className="flex items-center w-full h-[46px] border border-[#EDF1F3] rounded-[10px]"
              style={{ boxShadow: "0px 1px 2px 0px #E4E5E73D" }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="عنوان دسته بندی"
                className="text-[#8C8C8C] pr-3.5 pl-2.5 outline-none text-xs/[16.8px] font-medium grow"
              />

              <button
                type="button"
                onClick={() => {
                  const fd = new FormData();
                  fd.append("name", inputRef.current.value);

                  startTransition(() => {
                    formActionCategoryAgent(fd);
                  });

                  setIsModalOpen(false);
                }}
                className="flex items-center justify-center w-[62px] h-full border-r border-r-[#EDF1F3] text-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col gap-y-2.5 mt-4">
              {agentsCategory?.length > 0 ? (
                agentsCategory.map((item) => (
                  <li
                    key={item.id}
                    className={`cursor-pointer flex items-center justify-between pb-3 ${
                      selectedCategories.some((c) => c.id === item.id)
                        ? "text-black font-semibold"
                        : ""
                    }`}
                    onClick={() => toggleCategory(item)}
                  >
                    {item.name}

                    {selectedCategories.some((c) => c.id === item.id) && (
                      <svg className="w-4 h-4 text-green-500">
                        <use href="#check" />
                      </svg>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-center py-4">
                  دسته‌بندی‌ای موجود نیست
                </li>
              )}
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AgentsCategories;
