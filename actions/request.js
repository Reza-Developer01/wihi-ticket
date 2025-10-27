"use server";

import { postFetch } from "@/utils/fetch";

const createRequest = async (state, formData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const service = formData.get("service");
  const issue = formData.get("issue");

  if (
    title === "" ||
    description === "" ||
    category === "" ||
    service === "" ||
    issue === ""
  ) {
    return {
      status: "error",
      message: "پر کردن تمام موارد الزامی است.",
    };
  }

  const data = await postFetch("tickets/", {
    title,
    description,
    category,
    service,
    issue,
  });
  console.log(data);
};

export { createRequest };
