"use client";

import PollSystem from "./PollSystem";
import TextArea from "../TextArea";
import { useActionState, useEffect, useState } from "react";
import { pollSystem } from "@/actions/poll";
import SubmitButton from "../SubmitButton";
import toast from "react-hot-toast";

const PollForm = () => {
  const [state, formAction] = useActionState(pollSystem, {});
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;
    if (state?.status) {
      toast.success(state?.message);
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-y-9">
      <PollSystem />

      <TextArea
        height="300px"
        placeholder="سوال متداول شماره یک"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <SubmitButton title="ارسال نظرسنجی" />
    </form>
  );
};

export default PollForm;
