"use client";

import { DatePicker } from "zaman";
import Input from "../Input";
import { PhoneInput } from "react-international-phone";
import { useActionState, useEffect, useState } from "react";
import "react-international-phone/style.css";
import SubTitle from "../SubTitle";
import AgentsCategories from "../CreateAgent/AgentsCategories";
import AuthorizationCheckbox from "../CreateAgent/AuthorizationCheckbox";
import OperationAdmin from "./OperationAdmin";
import { editAgent } from "@/actions/agent";
import toast from "react-hot-toast";
import SubmitButton from "../SubmitButton";
import { toJalaali } from "jalaali-js";
import { useRouter } from "next/navigation";

const EditAgent = ({ agentsCategory, agent, selectedCategories }) => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [selected, setSelected] = useState([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    register_date: "",
    register_date_gregorian: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    rePassword: "",
  });

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (!agent) return;

    let register_date = "";
    let register_date_gregorian = "";

    if (agent.register_date) {
      const d = new Date(agent.register_date);
      if (!isNaN(d.getTime())) {
        const { jy, jm, jd } = toJalaali(d);
        register_date = `${jy}/${String(jm).padStart(2, "0")}/${String(
          jd
        ).padStart(2, "0")}`;

        // حفظ تاریخ میلادی برای submit
        register_date_gregorian = agent.register_date;
      }
    }

    setFormData({
      first_name: agent.first_name || "",
      last_name: agent.last_name || "",
      register_date,
      register_date_gregorian,
      email: agent.email || "",
      phone: agent.phone || "",
      username: agent.username || "",
      password: "",
      rePassword: "",
    });

    setPermissions(agent.permissions || []);
    setSelected(selectedCategories || []);
  }, [agent]);

  const handlePermissionChange = (key, checked) => {
    setPermissions((prev) =>
      checked ? [...prev, key] : prev.filter((item) => item !== key)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [state, formAction] = useActionState(editAgent, {});

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status) {
      toast.success(state?.message);
      router.push("/admin/agents-list");
    } else toast.error(state?.message);
  }, [state]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-y-4">
        <input type="hidden" name="id" value={agent?.id || ""} />

        {/* نام و نام خانوادگی */}
        <div className="flex items-center gap-x-4">
          <Input
            placeholder="نام"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <Input
            placeholder="نام خانوادگی"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        {/* تاریخ */}
        <div className="input-shadow flex items-center justify-between gap-x-2.5 w-full h-[46px] border border-[#EDF1F3] rounded-[10px] px-3.5">
          <svg className="w-4 h-4 text-[#ACB5BB]">
            <use href="#calendar-due" />
          </svg>

          <div className="relative w-full">
            {/* نمایش شمسی */}
            {formData.register_date && (
              <span className="custom__jalali absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1C1E] pointer-events-none font-medium text-sm">
                {formData.register_date}
              </span>
            )}

            <DatePicker
              value={
                formData.register_date_gregorian
                  ? new Date(formData.register_date_gregorian)
                  : null
              }
              onChange={(e) => {
                const d = new Date(e.value);
                if (!isNaN(d.getTime())) {
                  const { jy, jm, jd } = toJalaali(d);
                  const jDateFormatted = `${jy}/${String(jm).padStart(
                    2,
                    "0"
                  )}/${String(jd).padStart(2, "0")}`;

                  const gDateFormatted = `${d.getFullYear()}-${String(
                    d.getMonth() + 1
                  ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

                  setFormData((prev) => ({
                    ...prev,
                    register_date: jDateFormatted,
                    register_date_gregorian: gDateFormatted,
                  }));
                }
              }}
              round="x2"
              className="w-full"
            />

            {/* input مخفی برای submit با فرمت میلادی */}
            <input
              type="hidden"
              name="register_date"
              value={formData.register_date_gregorian || ""}
            />
          </div>
        </div>

        {/* ایمیل */}
        <Input
          placeholder="Loisbecket@gmail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ textAlign: "left", direction: "ltr" }}
        />

        {/* شماره تماس */}
        <PhoneInput
          name="phone"
          value={formData.phone}
          onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
          defaultCountry="ir"
          className="input-shadow w-full h-[46px] text-sm/[19.6px] text-[#1A1C1E] font-medium rounded-[10px] outline-none"
          inputClassName="!h-full !pl-2.5 !bg-white !text-[#1A1C1E] placeholder:!text-[#1A1C1E] !text-left !grow !outline-none !shadow-none !ring-0 !p-0 !rounded-r-[10px] !border-[#EDF1F3]"
          countrySelectorStyleProps={{
            buttonClassName:
              "!w-[62px] !h-full !bg-transparent !rounded-l-[10px] !border-[#EDF1F3] flag__button",
            dropdownClassName: "!bg-white !shadow-lg !rounded-md",
            flagClassName: "custom__flag",
          }}
          style={{ direction: "ltr" }}
        />

        <AgentsCategories
          allCategories={agentsCategory}
          selected={selected}
          onChange={setSelected}
        />

        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="اطلاعات ورود کارشناس" w="w-[96px]" />
        </div>

        {/* نام کاربری */}
        <input
          type="text"
          placeholder="نام کاربری را وارد کنید"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input-shadow w-full h-[46px] px-3.5 bg-white text-[#1A1C1E] font-medium text-xs/[19.6px] border border-[#EDF1F3] rounded-[10px] tracking-[-0.12px] outline-none placeholder:text-[#8C8C8C]"
        />

        {/* پسورد */}
        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          {showPass ? (
            <svg
              className="w-4 h-4 text-[#ACB5BB]"
              onClick={() => setShowPass((v) => !v)}
            >
              <use href="#eye-on" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-[#ACB5BB]"
              onClick={() => setShowPass((v) => !v)}
            >
              <use href="#eye-off" />
            </svg>
          )}

          <input
            name="password"
            type={showPass ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="*******"
            className="text-left outline-none placeholder:text-[#1A1C1E] font-medium text-sm/[19.6px] tracking-[-0.12px]"
            style={{ direction: "ltr", width: "100%" }}
          />
        </div>

        {/* تکرار پسورد */}
        <div className="input-shadow flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-[#EDF1F3] rounded-[10px]">
          {showRePass ? (
            <svg
              className="w-4 h-4 text-[#ACB5BB]"
              onClick={() => setShowRePass((v) => !v)}
            >
              <use href="#eye-on" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-[#ACB5BB]"
              onClick={() => setShowRePass((v) => !v)}
            >
              <use href="#eye-off" />
            </svg>
          )}

          <input
            name="rePassword"
            type={showRePass ? "text" : "password"}
            value={formData.rePassword}
            onChange={handleChange}
            placeholder="*******"
            className="text-left outline-none placeholder:text-[#1A1C1E] font-medium text-sm/[19.6px] tracking-[-0.12px]"
            style={{ direction: "ltr", width: "100%" }}
          />
        </div>

        <div className="w-full *:mb-0 *:mt-5">
          <SubTitle title="سطح دسترسی کارشناس" w="w-[96px]" />
        </div>

        <AuthorizationCheckbox
          onChangePermission={handlePermissionChange}
          permissions={permissions}
        />

        <input
          type="hidden"
          name="permissions"
          value={JSON.stringify(permissions)}
        />

        <OperationAdmin agentId={agent.id} getCategory={agentsCategory} />
        <SubmitButton title="ویرایش کارشناس" />
      </div>
    </form>
  );
};

export default EditAgent;
