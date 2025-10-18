"use client";

import Input from "./Input";
import { login } from "@/actions/auth";
import SubmitButton from "./SubmitButton";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, formAction] = useActionState(login, {});
  const router = useRouter();

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;

    if (state?.status === "error") {
      toast.error(state?.message);
    } else {
      sessionStorage.setItem("phone", state?.phone);
      toast.success(state?.message);
      router.push("/auth/check-otp");
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-y-4">
      <Input
        name="phone"
        type="text"
        placeholder="09123456789"
        style={{ direction: "ltr" }}
      />

      <Input
        type="password"
        placeholder="*******"
        style={{ direction: "ltr" }}
      />

      <SubmitButton title="ورود" />
    </form>
  );
};

export default LoginForm;
