"use client";

import { useEffect, useState } from "react";

const ShowPhoneNumber = () => {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const storedPhone = sessionStorage.getItem("username");
    if (storedPhone) setPhone(storedPhone);
  }, []);

  return (
    <p className="flex items-center gap-x-1.5 text-[#FFFFFFB2] text-xs/[16.8px] tracking-[-0.12px]">
      کد تایید به شماره “ {phone} ” ارسال شد لطفا وارد کنید
    </p>
  );
};

export default ShowPhoneNumber;
