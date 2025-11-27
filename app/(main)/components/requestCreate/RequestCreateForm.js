"use client";

import { useActionState, useEffect, useState } from "react";
import DropDown from "../DropDown";
import TextArea from "../TextArea";
import { createRequest } from "@/actions/request";
import SubmitButton from "../SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "../Input";

const RequestCreateForm = ({ categories, service }) => {
  const [state, formAction] = useActionState(createRequest, {});
  const [openIssues, setOpenIssues] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state?.message);
      router.push("/poll");
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-y-[15px]">
      <DropDown
        options={categories}
        placeholder="انتخاب دسته بندی"
        labelKey="name"
        valueKey="id"
        onChange={() => setOpenIssues(true)}
        name="category"
      />

      {openIssues && (
        <DropDown
          options={service}
          placeholder="انتخاب سرویس"
          labelKey="name"
          valueKey="id"
          onChange={(value) => console.log("Category selected:", value)}
          name="service"
        />
      )}

      <Input
        type="text"
        name="title"
        placeholder="عنوان  درخواست را  وارد کنیـد"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextArea
        height="220px"
        placeholder="شرح درخاست را وارد کنید"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div
        className={`custom-shadow relative flex items-center w-full h-12 rounded-[10px] overflow-hidden transition-all duration-300 ${
          hasFile ? "bg-[#00C96B33]" : "bg-[#EFF0F6]"
        }`}
      >
        <button
          type="button"
          className="flex items-center justify-between grow pr-6 pl-[15px]"
        >
          <span
            className={`font-semibold text-xs/[16.8px] ${
              hasFile ? "text-[#00C96B]" : "text-[#8C8C8C]"
            } tracking-[-0.12px]`}
          >
            {hasFile ? "فایل انتخاب شد" : "آپلود فایل"}
            <span className="font-normal text-[8px]/[11.2px]">
              ( تا حجم 50 مگابایت )
            </span>
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
          className="absolute w-full h-full text-transparent cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (file.size > 50 * 1024 * 1024) {
              toast.error("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.");
              e.target.value = "";
              setHasFile(false);
            } else {
              setHasFile(true);
            }
          }}
        />
      </div>

      <SubmitButton title="ارسال درخواست" />
    </form>
  );
};

export default RequestCreateForm;
