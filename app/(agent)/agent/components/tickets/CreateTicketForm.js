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
  console.log("🟦 DATA RECEIVED IN FORM:", data);

  const router = useRouter();
  const [state, formAction] = useActionState(requestCall, {});

  const [category, setCategory] = useState(data?.category_detail?.id || null);
  const [service, setService] = useState(data?.service_detail?.id || null);

  console.log({ category, service });

  const [phoneNumber, setPhoneNumber] = useState(
    data?.phone_number_detail?.id || null
  );
  const [extension, setExtension] = useState(
    data?.phone_number_detail?.extension || ""
  );
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [hasFile, setHasFile] = useState(!!data?.file);

  const [categorySelected, setCategorySelected] = useState(false);
  const [contactSelected, setContactSelected] = useState(false);

  const handleCategoryChange = (value) => {
    setCategory(value);
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
    if (data?.category) setCategory(data.category);
    if (data?.service) setService(data.service);
  }, [data]);

  return (
    <div className="flex flex-col gap-y-[15px]">
      <DropDown
        options={data.category_detail ? [data.category_detail] : []}
        labelKey="name"
        valueKey="id"
        value={category}
        onChange={setCategory}
      />

      <DropDown
        options={data.service_detail ? [data.service_detail] : []}
        labelKey="name"
        valueKey="id"
        value={service}
        onChange={setService}
      />

      {/* شماره تماس */}
      <DropDown
        options={data.phone_number_detail ? [data.phone_number_detail] : []}
        placeholder="انتخاب شماره تماس"
        labelKey="phone_numbers"
        valueKey="id"
        name="phone_number"
        value={phoneNumber}
        onChange={setPhoneNumber}
        defaultValue={phoneNumber}
      />

      {/* داخلی */}
      <Input
        type="text"
        name="phone_number"
        value={extension}
        onChange={(e) => setExtension(e.target.value)}
        placeholder="داخلی خود را وارد کنید (درصورت دارا بودن)"
        placeholderColor=""
      />

      {/* عنوان */}
      <Input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان درخواست را وارد کنید"
        placeholderColor=""
      />

      {/* توضیحات */}
      <TextArea
        height="220px"
        placeholder="شرح در درخواست را وارد کنید"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
