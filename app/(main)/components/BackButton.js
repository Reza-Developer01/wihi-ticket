"use client";

import { useRouter, usePathname } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const url = pathname;
  const parts = url.split("/");
  const result = parts.slice(2).join("/");

  const handleBack = () => {
    switch (pathname) {
      case `/requests-list/${result}`:
        return router.replace("/requests-list");
      case `/requests-list`:
        return router.replace("/");
      case `/call-request/${result}`:
        return router.replace("/call");
      case `/call`:
        return router.replace("/");
      case `/admin/agents-list`:
        return router.replace("/");
    }

    router.back();
  };

  return (
    <button onClick={handleBack}>
      <svg className="w-6 h-6 text-white">
        <use href="#arrow-narrow-left" />
      </svg>
    </button>
  );
};

export default BackButton;
