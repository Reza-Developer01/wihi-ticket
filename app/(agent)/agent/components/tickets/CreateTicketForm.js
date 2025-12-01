"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { requestCall } from "@/actions/call";
import DropDown from "@/app/(main)/components/DropDown";
import TextArea from "@/app/(main)/components/TextArea";
import Input from "@/app/(auth)/components/Input";
import ChangeStatus from "./ChangeStatus";

const CreateTicketForm = ({ data, agentsList, user }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(requestCall, {});

  const [extension, setExtension] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    if (data) {
      setExtension(data?.phone_number_detail?.extension || "");
      setTitle(data?.title || "");
      setDescription(data?.description || "");
      setHasFile(!!data?.file);
    }
  }, [data]);

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state?.message);
      router.push("/successfully-call");
    } else {
      toast.error(state?.message);
    }
  }, [state, router]);

  return (
    <div className="flex flex-col gap-y-[15px]">
      {/* دسته بندی فقط نمایش */}
      <div className="custom-shadow relative flex items-center justify-between w-full h-12 rounded-[10px] overflow-hidden border border-[#EDF1F3] px-4">
        <div></div>
        <span className="font-semibold text-xs/[16.8px] text-[#8C8C8C] tracking-[-0.12px]">
          {data?.category_detail?.name || "دسته بندی موجود نیست"}
        </span>
        <svg className="w-[15px] h-[15px] text-[#A8A8A8]">
          <use href="#arrow-down" />
        </svg>
      </div>

      {/* سرویس فقط نمایش */}
      <div className="custom-shadow relative flex items-center justify-between w-full h-12 rounded-[10px] overflow-hidden border border-[#EDF1F3] px-4">
        <div></div>
        <span className="font-semibold text-xs/[16.8px] text-[#8C8C8C] tracking-[-0.12px]">
          {data?.service_detail?.name || "سرویس موجود نیست"}
        </span>
        <svg className="w-[15px] h-[15px] text-[#A8A8A8]">
          <use href="#arrow-down" />
        </svg>
      </div>

      {/* شماره تماس فقط نمایش */}
      <div className="custom-shadow relative flex items-center justify-between w-full h-12 rounded-[10px] overflow-hidden border border-[#EDF1F3] px-4">
        <div></div>
        <span className="font-semibold text-xs/[16.8px] text-[#8C8C8C] tracking-[-0.12px]">
          {data?.phone_number_detail?.phone_numbers || "-"}
        </span>
        <svg className="w-[15px] h-[15px] text-[#A8A8A8]">
          <use href="#arrow-down" />
        </svg>
      </div>

      {/* داخلی */}
      <Input
        type="text"
        name="extension"
        value={extension}
        onChange={(e) => setExtension(e.target.value)}
        placeholder="داخلی خود را وارد کنید (درصورت دارا بودن)"
        disabled={true}
      />

      {/* عنوان */}
      <Input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان درخواست را وارد کنید"
        disabled={true}
      />

      {/* توضیحات */}
      <TextArea
        height="220px"
        placeholder="شرح درخواست را وارد کنید"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={true}
      />

      {/* فایل */}
      <div
        className={`custom-shadow relative flex items-center w-full h-12 rounded-[10px] overflow-hidden transition-all duration-300 ${
          hasFile ? "bg-[#00C96B33]" : "bg-[#EFF0F6]"
        }`}
      >
        <button
          type="button"
          className="flex items-center justify-between grow pr-6 pl-[15px]"
          disabled={true}
        >
          <span
            className={`font-semibold text-xs/[16.8px] ${
              hasFile ? "text-[#00C96B]" : "text-[#8C8C8C]"
            } tracking-[-0.12px]`}
          >
            {hasFile ? "فایل انتخاب شد" : "فایل آپلودی وجود ندارد"}
          </span>
          <svg
            className={`w-[25px] h-[25px] ${
              hasFile ? "text-[#00C96B]" : "text-[#8C8C8C]"
            }`}
          >
            <use href="#upload" />
          </svg>
        </button>

        <input
          type="file"
          name="file"
          className="absolute w-full h-full text-transparent cursor-not-allowed"
          disabled={true}
        />
      </div>

      {/* تغییر وضعیت */}
      <ChangeStatus
        call_request_number={data.call_request_number}
        initialStatus={data.status}
        agentsList={agentsList}
        user={user}
      />
    </div>
  );
};

export default CreateTicketForm;
