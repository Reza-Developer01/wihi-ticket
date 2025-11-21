"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { requestCall } from "@/actions/call";
import DropDown from "@/app/(main)/components/DropDown";
import TextArea from "@/app/(main)/components/TextArea";
import SubmitButton from "@/app/(auth)/components/SubmitButton";
import Input from "@/app/(auth)/components/Input";
import ChangeStatus from "./ChangeStatus";

const CreateTicketForm = ({ data, categories, services, issues }) => {
  console.log(data);
  const router = useRouter();
  const [state, formAction] = useActionState(requestCall, {});

  const [categorySelected, setCategorySelected] = useState(false);
  const [contactSelected, setContactSelected] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  const handleCategoryChange = () => {
    setCategorySelected(true);
    setContactSelected(false);
  };

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state?.message);
      router.push("/successfully-call");
    } else {
      toast.error(state?.message);
    }
  }, [state, router]);

  useEffect(() => {
    if (data?.file) {
      setHasFile(true);
    }
  }, [data]);

  return (
    <form action={formAction} className="flex flex-col gap-y-[15px]">
      <DropDown
        options={categories}
        placeholder="انتخاب دسته بندی"
        labelKey="name"
        valueKey="id"
        onChange={(value) => handleCategoryChange(value)}
        name="category"
        value={data?.category} // مقدار انتخاب شده از سرور
        defaultValue={data?.category}
      />

      <DropDown
        options={services}
        placeholder="انتخاب سرویس"
        labelKey="name"
        valueKey="id"
        onChange={() => {}}
        name="service"
        value={data?.service}
        defaultValue={data?.service}
      />

      <DropDown
        options={issues}
        placeholder="انتخاب شماره تماس"
        labelKey="name"
        valueKey="id"
        onChange={() => setContactSelected(true)}
        name="issue"
        value={data?.issue}
        defaultValue={data?.issue}
      />

      <Input
        type="text"
        name="phone_number"
        defaultValue={data?.phone_number}
        placeholder="داخلی خود را وارد کنید (درصورت دارا بودن)"
        placeholderColor=""
      />

      <Input
        type="text"
        name="title"
        defaultValue={data?.title}
        placeholder="عنوان درخواست را وارد کنید"
        placeholderColor=""
      />

      <TextArea
        height="220px"
        placeholder="شرح در درخواست را وارد کنید"
        name="description"
        defaultValue={data?.description}
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
            {hasFile ? "فایل انتخاب شد" : "فایل آپلودی وجــــود ندارد"}
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

      <ChangeStatus />
    </form>
  );
};

export default CreateTicketForm;
