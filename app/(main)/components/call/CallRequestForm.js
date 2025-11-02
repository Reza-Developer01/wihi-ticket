"use client";

import { useState } from "react";
import DropDown from "../DropDown";
import Input from "../Input";
import TextArea from "../TextArea";
import SubmitButton from "../SubmitButton";

const CallRequestForm = () => {
  const [categorySelected, setCategorySelected] = useState(false);
  const [contactSelected, setContactSelected] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  console.log({ categorySelected, contactSelected, hasFile });

  const categoryOptions = [
    { id: 1, name: "حل مشکل سرویس" },
    { id: 2, name: "پشتیبانی فنی" },
  ];

  const serviceOptions = [
    { id: 1, name: "وای فای" },
    { id: 2, name: "اینترنت سازمانی" },
  ];

  const contactOptions = [
    { id: 1, name: "0900123456" },
    { id: 2, name: "0900987654" },
  ];

  return (
    <form className="flex flex-col gap-y-[15px]">
      <DropDown
        options={categoryOptions}
        placeholder="انتخاب دسته بندی"
        labelKey="name"
        valueKey="id"
        onChange={(value) => {
          setCategorySelected(true);
        }}
        name="category"
      />

      {categorySelected && (
        <>
          <DropDown
            options={serviceOptions}
            placeholder="انتخاب سرویس"
            labelKey="name"
            valueKey="id"
            onChange={(value) => {}}
            name="service"
          />

          <DropDown
            options={contactOptions}
            placeholder="انتخاب شماره تماس"
            labelKey="name"
            valueKey="id"
            onChange={(value) => setContactSelected(true)}
            name="contact"
          />
        </>
      )}

      {contactSelected && (
        <Input
          type="text"
          name="extension"
          placeholder="داخلی خود را وارد کنید (درصورت دارا بودن)"
        />
      )}

      <Input
        type="text"
        name="title"
        placeholder="عنوان درخواست را وارد کنید"
      />

      <TextArea
        height="220px"
        placeholder="شرح در درخواست را وارد کنید"
        name="description"
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
          disabled={hasFile}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (file.size > 50 * 1024 * 1024) {
              alert("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.");
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

export default CallRequestForm;
