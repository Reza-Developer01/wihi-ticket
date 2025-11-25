"use client";

import { useState, useEffect } from "react";
import DropDown from "../DropDown";
import Input from "../Input";
import TextArea from "../TextArea";
import SubmitButton from "../SubmitButton";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { requestCall } from "@/actions/call";

const CallRequestForm = ({ categories, services, phones }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(requestCall, {});

  const [categorySelected, setCategorySelected] = useState(false);
  const [contactSelected, setContactSelected] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  // const [filteredServices, setFilteredServices] = useState([]);
  // const [filteredContacts, setFilteredContacts] = useState([]);

  // const handleCategoryChange = (categoryId) => {
  //   setCategorySelected(true);
  //   setContactSelected(false);
  //   const relatedServices = services.filter(
  //     (item) => item.category_id === categoryId
  //   );

  //   const relatedIssues = issues.filter(
  //     (item) => item.category_id === categoryId
  //   );

  //   setFilteredServices(relatedServices);
  //   setFilteredContacts(relatedIssues);
  // };

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

  return (
    <form action={formAction} className="flex flex-col gap-y-[15px]">
      <DropDown
        options={categories}
        placeholder="انتخاب دسته بندی"
        labelKey="name"
        valueKey="id"
        onChange={(value) => handleCategoryChange(value)}
        name="category"
      />

      {categorySelected && (
        <>
          <DropDown
            options={services}
            placeholder="انتخاب سرویس"
            labelKey="name"
            valueKey="id"
            onChange={() => {}}
            name="service"
          />

          <DropDown
            options={phones}
            placeholder="انتخاب شماره تماس"
            labelKey="phone_numbers"
            valueKey="id"
            onChange={(value) => setContactSelected(true)}
            name="phone_number"
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
