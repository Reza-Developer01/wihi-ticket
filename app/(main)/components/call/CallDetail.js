"use client";

import DropDown from "../DropDown";
import Input from "../Input";
import TextArea from "../TextArea";
import { useMemo } from "react";
import ChangeStatusDropDown from "./ChangeStatusDropDown";
import ChangeStatus from "@/app/(agent)/agent/components/tickets/ChangeStatus";

const CallDetail = ({
  call,
  categories,
  services,
  phones,
  role,
  agentsList,
  user,
}) => {
  console.log(call);
  const categoryName = useMemo(() => {
    return categories.find((c) => c.id === call.category)?.name || "-";
  }, [categories, call]);

  const serviceName = useMemo(() => {
    return services.find((s) => s.id === call.service)?.name || "-";
  }, [services, call]);
  const fileExists = call.file !== null && call.file !== undefined;

  return (
    <div className="flex flex-col gap-y-[15px]">
      <div className="relative">
        <DropDown
          options={categories}
          placeholder="انتخاب دسته بندی"
          labelKey="name"
          valueKey="id"
          name="category"
          defaultValue={call.category} // <-- فقط id
        />
        <div className="absolute inset-0 z-10 cursor-default"></div>
      </div>

      <div className="relative">
        <DropDown
          options={services}
          placeholder="انتخاب سرویس"
          labelKey="name"
          valueKey="id"
          name="service"
          defaultValue={call.service}
        />
        <div className="absolute inset-0 z-10 cursor-default"></div>
      </div>

      <div className="relative">
        <DropDown
          options={phones.phones} // ← فقط همین!
          placeholder="انتخاب شماره تماس"
          labelKey="phone_numbers" // چون name نداریم
          valueKey="id"
          name="phone_number"
          defaultValue={call.phone_number_detail.id}
        />

        <div className="absolute inset-0 z-10 cursor-default"></div>
      </div>

      <Input
        type="text"
        name="extension_phone_number_input"
        value={call.phone_number_detail.extension || ""}
        readOnly={true}
        placeholder="داخلی خود را وارد کنید (درصورت دارا بودن)"
      />

      <Input
        type="text"
        name="title"
        value={call.title}
        readOnly={true}
        placeholder="عنوان درخواست را وارد کنید"
      />

      <TextArea
        height="220px"
        name="description"
        value={call.description}
        readOnly={true}
        placeholder="شرح در درخواست را وارد کنید"
      />

      <div
        className={`custom-shadow relative flex items-center w-full h-12 rounded-[10px] overflow-hidden transition-all duration-300 bg-[#EFF0F6]`}
      >
        <button
          type="button"
          className="h-full flex items-center justify-between grow pr-6 pl-[15px]"
          disabled={!fileExists}
          onClick={() => {
            if (!fileExists) return;

            const encodedFile = encodeURIComponent(call.file);
            window.location.href = `/api/download?file=${encodedFile}`;
          }}
        >
          <span
            className={`font-semibold text-xs/[16.8px] text-[#8C8C8C] tracking-[-0.12px]`}
          >
            {fileExists ? "دانلود فایل" : "فایلی وجود ندارد"}
          </span>

          <svg className="w-[25px] h-[25px] text-[#8C8C8C]">
            <use href="#upload" />
          </svg>
        </button>
      </div>

      {/* وضعیت --- فعلاً طبق گفته تو خالی می‌ذارم */}
      {role !== "admin" && (
        <ChangeStatusDropDown
          status={call.status}
          call_request_number={call.call_request_number}
          comment_guided={call.comment_guided}
          comment_cancelled={call.comment_cancelled}
        />
      )}

      {role === "admin" && (
        <ChangeStatus
          call_request_number={call.call_request_number}
          initialStatus={call.status}
          agentsList={agentsList}
          user={user}
        />
      )}
    </div>
  );
};

export default CallDetail;
