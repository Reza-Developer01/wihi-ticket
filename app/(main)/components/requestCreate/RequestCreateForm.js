"use client";

import { useActionState, useEffect, useState } from "react";
import DropDown from "../DropDown";
import TextArea from "../TextArea";
import { createRequest } from "@/actions/request";
import SubmitButton from "../SubmitButton";
import toast from "react-hot-toast";

const RequestCreateForm = ({ categories, issues }) => {
  const [state, formAction] = useActionState(createRequest, {});
  const [openIssues, setOpenIssues] = useState(false);

  useEffect(() => {
    // if (state?.status === "error") {
    //   toast.error(state?.message);
    // }
    console.log(state);
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
          options={issues}
          placeholder="انتخاب سرویس"
          labelKey="name"
          valueKey="id"
          onChange={(value) => console.log("Category selected:", value)}
          name="issue"
        />
      )}

      <input
        type="text"
        name="title"
        className="custom-shadow w-full h-12 px-6 text-xs/[16.8px] font-medium border border-[#EFF0F6] rounded-[10px] outline-none tracking-[-0.12px] placeholder:text-[#8C8C8C]"
        placeholder="عنوان  درخواست را  وارد کنیـد"
      />

      <TextArea
        height="220px"
        placeholder="شرح درخاست را وارد کنید"
        name="description"
      />

      <button
        type="button"
        className="custom-shadow flex items-center justify-between w-full h-12 pr-6 pl-[15px] bg-[#EFF0F6] rounded-[10px]"
      >
        <span className="font-semibold text-xs/[16.8px] text-[#8C8C8C] tracking-[-0.12px]">
          آپلود فایل
          <span className="font-normal text-[8px]/[11.2px]">
            ( تا حجم 50 مگابایت )
          </span>
        </span>
        <svg className="w-[25px] h-[25px]">
          <use href="#upload" />
        </svg>
      </button>

      <SubmitButton title="ارسال درخواست" />
    </form>
  );
};

export default RequestCreateForm;
