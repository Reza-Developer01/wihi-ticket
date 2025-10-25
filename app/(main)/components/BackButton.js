"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <svg className="w-6 h-6 text-white">
        <use href="#arrow-narrow-left" />
      </svg>
    </button>
  );
};

export default BackButton;
