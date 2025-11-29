"use client";

import Input from "./Input";
import { login } from "@/actions/auth";
import SubmitButton from "./SubmitButton";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, formAction] = useActionState(login, {});
  const router = useRouter();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status === "error") {
      toast.error(state?.message);
    } else {
      console.log(state.code);
      sessionStorage.setItem("username", state?.username);
      toast.success(state?.message);
      router.push("/auth/check-otp");
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-y-4">
      <Input
        name="username"
        type="text"
        placeholder="09123456789"
        style={{ direction: "ltr" }}
        value={formData.username}
        onChange={handleChange}
      />

      <Input
        name="password"
        type="password"
        placeholder="*******"
        style={{ direction: "ltr" }}
        value={formData.password}
        onChange={handleChange}
      />

      <SubmitButton title="ورود" />
    </form>
  );
};

export default LoginForm;
