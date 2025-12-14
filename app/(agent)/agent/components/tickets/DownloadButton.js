"use client";

import React from "react";

const DownloadButton = ({ fileUrl }) => {
  const handleDownload = (e) => {
    e.preventDefault();
    if (!fileUrl) return;

    const apiLink = `/api/download?file=${encodeURIComponent(fileUrl)}`;

    const link = document.createElement("a");
    link.href = apiLink;
    link.setAttribute("download", fileUrl.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center w-[45px] h-[45px] border border-[#808392] rounded-[10px]"
      onClick={handleDownload}
    >
      <svg className="w-6 h-6 text-[#808392]">
        <use href="#paper-download" />
      </svg>
      <span className="text-[#808392] text-[7px]/[9.8px] tracking-[-0.12px]">
        {fileUrl ? fileUrl.split("/").pop().split(".").pop().toUpperCase() : ""}
      </span>
    </button>
  );
};

export default DownloadButton;
