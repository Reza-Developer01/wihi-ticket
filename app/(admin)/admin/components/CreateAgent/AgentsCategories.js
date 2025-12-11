"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { createCategoryAgent, deleteCategoryAgent } from "@/actions/agent";
import { useActionState } from "react";
import { Modal } from "@/app/(main)/components/Modal";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AgentsCategories = ({ allCategories = [], selected = [], onChange }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const [isPending, startTransition] = useTransition();

  const [createState, createAction] = useActionState(createCategoryAgent, {});

  const [deleteState, deleteAction] = useActionState(deleteCategoryAgent, {});

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  useEffect(() => {
    if (!createState || Object.keys(createState).length === 0) return;

    if (createState.status) {
      toast.success(createState.message);
      router.refresh();
    } else {
      toast.error(createState.message);
    }
  }, [createState]);

  useEffect(() => {
    if (!deleteState || Object.keys(deleteState).length === 0) return;

    if (deleteState.status) {
      toast.success(deleteState.message);
      router.refresh();
    } else {
      toast.error(deleteState.message);
    }
  }, [deleteState]);

  const toggleCategory = (item) => {
    const exists = selected.some((c) => c.id === item.id);

    if (exists) {
      onChange(selected.filter((c) => c.id !== item.id));
    } else {
      onChange([...selected, item]);
    }
  };

  const handleCreateCategory = () => {
    const title = inputRef.current.value.trim();
    if (!title) return toast.error("عنوان نمی‌تواند خالی باشد.");

    const fd = new FormData();
    fd.append("name", title);

    startTransition(() => createAction(fd));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Field */}
        <div
          className="input-shadow flex items-center justify-between w-full h-[46px] border border-[#EDF1F3] rounded-[10px] overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="pr-12 font-medium text-xs/[16.8px] tracking-[-0.12px] text-[#8C8C8C]">
            {selected.length > 0
              ? selected.map((c) => c.name).join(" ، ")
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

        {/* Dropdown List */}
        {isOpen && (
          <div className="custom-shadow absolute top-[50px] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-10 max-h-60 overflow-y-auto">
            <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
              {allCategories?.length > 0 ? (
                allCategories.map((item) => (
                  <li
                    key={item.id}
                    className={`cursor-pointer flex items-center justify-center pb-3 px-3 ${
                      selected.some((c) => c.id === item.id)
                        ? "text-black font-semibold"
                        : ""
                    }`}
                    onClick={() => toggleCategory(item)}
                  >
                    {item.name}

                    {selected.some((c) => c.id === item.id) && (
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

        {/* Button to open modal */}
        {pathname === "/admin/create-agent" && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center w-full text-[#8C8C8C] font-medium text-xs/[16.8px] mt-4"
          >
            تعریف دستــه بندی جدید
          </button>
        )}

        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name="category_agent"
          value={JSON.stringify(selected)}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal>
          <div ref={modalRef}>
            <h4 className="text-[#8C8C8C] text-xs/[16.8px] font-medium text-center mb-[22px]">
              تعریف دستــه بندی کارشناس
            </h4>

            {/* Input for new category */}
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
                onClick={handleCreateCategory}
                className="flex items-center justify-center w-[62px] h-full border-r border-r-[#EDF1F3] text-xs"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
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

            {/* Delete category list */}
            <ul className="flex flex-col gap-y-2.5 mt-4">
              {allCategories?.length > 0 ? (
                allCategories.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between pb-3"
                  >
                    <span className="text-[#8C8C8C] font-medium">
                      {item.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        const fd = new FormData();
                        fd.append("id", item.id);
                        startTransition(() => deleteAction(fd));
                      }}
                      className="text-red-500 text-xs"
                    >
                      <svg className="w-5 h-5">
                        <use href="#delete" />
                      </svg>
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-center py-4">
                  هیچ دسته‌بندی‌ای موجود نیست
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
