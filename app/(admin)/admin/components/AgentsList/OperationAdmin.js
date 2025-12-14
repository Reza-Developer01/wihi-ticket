"use client";

import { changeAgentStatus, getAgentChangeLogs } from "@/actions/agent";
import { Modal } from "@/app/(main)/components/Modal";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import jalaali from "jalaali-js"; // استفاده از jalaali-js

const OperationAdmin = ({ agentId, getCategory }) => {
  const fieldLabels = {
    first_name: "نام",
    last_name: "نام خانوادگی",
    username: "نام کاربری",
    phone: "شماره موبایل",
    email: "ایمیل",
    role: "نقش کاربری",
    is_active: "وضعیت حساب",
    national_code: "کد ملی",
    created_at: "تاریخ ایجاد",
    updated_at: "تاریخ بروزرسانی",
    permissions: "سطوح دسترسی",
    categories: "دسته‌بندی‌ها",
    register_date: "تاریخ ثبت نام",
  };

  const permissionLabels = {
    view_all_tickets: "مشاهده تمام تیکت‌ها",
    view_all_calls: "مشاهده تمام تماس‌ها",
    close_call: "بستن تماس",
    change_ticket_status: "تغییر وضعیت تیکت",
    change_call_status: "تغییر وضعیت تماس",
    can_assign_tickets: "اختصاص تیکت‌ها",
    can_assign_callrequests: "اختصاص درخواست‌های تماس",
    close_ticket: "بستن تیکت",
    view_waiting: "مشاهده در انتظار",
    view_reports: "مشاهده گزارش‌ها",
  };

  const formatValue = (val, key) => {
    if (typeof val === "boolean") return val ? "فعال" : "غیرفعال";
    if (val === null || val === undefined) return "—";

    if (key === "register_date" || key.endsWith("_at")) {
      const date = new Date(val);
      const j = jalaali.toJalaali(date);
      const pad = (n) => n.toString().padStart(2, "0");
      return `${pad(j.jy)}/${pad(j.jm)}/${pad(j.jd)}`;
    }

    return String(val);
  };

  const [logsData, setLogsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const options = [
    { label: "غیرفعالسازی" },
    { label: "فعالسازی" },
    { label: "گزارش عملکرد(براساس نظر سنجی)" },
    { label: "گزارش عملکرد ( براساس میانگین پاسخ , تیکت و تماس و.. )" },
    { label: "تاریخچــه تغییرات" },
  ];

  const handleSelect = async (label) => {
    if (label === "فعالسازی" || label === "غیرفعالسازی") {
      const status = label === "فعالسازی";
      await changeAgentStatus(agentId, status);
      toast.success(
        status ? "کاربر با موفقیت فعال شد" : "کاربر با موفقیت غیرفعال شد"
      );
      router.push("/admin/agents-list");
    }

    setIsOpen(false);

    if (label === "تاریخچــه تغییرات") {
      const logs = await getAgentChangeLogs(agentId);
      if (!logs.status) {
        toast.error(logs.message);
        return;
      }
      setLogsData(logs.data);
      setIsModalOpen(true);
      return;
    }

    if (label === "گزارش عملکرد ( براساس میانگین پاسخ , تیکت و تماس و.. )") {
      router.push(`/admin/${agentId}/reports-chart`);
    }

    if (label === "گزارش عملکرد(براساس نظر سنجی)") {
      router.push(`/admin/${agentId}/ratings`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderFieldChange = (key, oldValue, newValue) => {
    const label = fieldLabels[key] || key;

    if (key === "permissions") {
      return (
        <div key={key} className="text-sm text-gray-700">
          <span className="font-medium">{label}:</span>
          <div className="ml-2 mt-1 space-y-1">
            {(oldValue || []).map(
              (perm) =>
                !newValue.includes(perm) && (
                  <div key={perm} className="text-red-500 line-through">
                    {permissionLabels[perm] || perm}
                  </div>
                )
            )}
            {(newValue || []).map(
              (perm) =>
                !oldValue.includes(perm) && (
                  <div key={perm} className="text-green-600">
                    {permissionLabels[perm] || perm}
                  </div>
                )
            )}
          </div>
        </div>
      );
    }

    if (key === "categories") {
      const oldCats = oldValue || [];
      const newCats = newValue || [];

      const added = newCats.filter((id) => !oldCats.includes(id));
      const removed = oldCats.filter((id) => !newCats.includes(id));

      const formatNames = (ids) =>
        ids.map((id) => getCategory.find((c) => c.id === id)?.name || "نامشخص");

      let message = "";
      if (added.length && removed.length) {
        message = `${formatNames(removed).join(" و ")} حذف شد و ${formatNames(
          added
        ).join(" و ")} اضافه شد.`;
      } else if (added.length) {
        message = `${formatNames(added).join(" و ")} اضافه شد.`;
      } else if (removed.length) {
        message = `${formatNames(removed).join(" و ")} حذف شد.`;
      } else {
        message = "تغییری در دسته‌بندی‌ها ایجاد نشده است.";
      }

      return (
        <div key={key} className="text-sm text-gray-700">
          <span className="font-medium">{label}:</span> {message}
        </div>
      );
    }

    return (
      <div key={key} className="text-sm text-gray-700">
        <span className="font-medium">{label}:</span>{" "}
        <span className="text-red-500 line-through" dir="auto">
          {formatValue(oldValue, key)}
        </span>{" "}
        <span className="mx-1 text-gray-600">←</span>{" "}
        <span className="text-green-600">{formatValue(newValue, key)}</span>
      </div>
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between pl-3.5 pr-[45px] w-full h-12 mt-4 text-white font-medium leading-6 rounded-[10px] bg-[#20CFCF]"
      >
        <div></div>
        عملیات
        <div className="flex items-center gap-x-2.5">
          <span className="flex w-px h-[30px] bg-white"></span>
          <svg
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <use href="#arrow-down-2" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="custom-shadow absolute bottom-[calc(100%+4px)] right-0 left-0 p-4 bg-white border border-[#EFF0F6] rounded-[10px] z-20 max-h-60 overflow-y-auto">
          <ul className="space-y-3 text-[#8C8C8C] font-medium text-sm/[19.6px] text-center divide-y divide-[#EFF0F6] *:last:pb-0">
            {options.map((opt) => (
              <li
                key={opt.label}
                onClick={() => handleSelect(opt.label)}
                className="cursor-pointer hover:text-black pb-3"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isModalOpen && (
        <Modal>
          <h4 className="mb-6 text-[#404040] font-semibold leading-[22.4px] tracking-[-0.12px]">
            تاریخچــه تغییرات
          </h4>

          <div className="max-h-[300px] overflow-y-auto space-y-4 px-2">
            {logsData.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                هیچ تغییری ثبت نشده است.
              </p>
            ) : (
              logsData.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border border-[#EFF0F6] rounded-lg bg-gray-50"
                >
                  <p className="text-sm text-gray-700 font-semibold">
                    تغییر توسط: {log.changed_by?.full_name || "نامشخص"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    تاریخ ثبت تغییر: {formatValue(log.changed_at, "changed_at")}
                  </p>
                  <div className="mt-3 space-y-2">
                    {Object.keys(log.changes.old).map((key) =>
                      renderFieldChange(
                        key,
                        log.changes.old[key],
                        log.changes.new[key]
                      )
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col gap-y-6 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex items-center justify-center w-full text-xs/[16.8px] text-[#6C7278] tracking-[-0.12px]"
            >
              بستن
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OperationAdmin;
