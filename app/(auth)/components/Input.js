"use client";

import { useState } from "react";

const Input = ({
  name = "",
  placeholder,
  type,
  style,
  placeholderColor = "#1A1C1E",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {type === "password" ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-0 bottom-0 m-auto"
          >
            <svg className="w-4 h-4 text-[#ACB5BB]">
              <use href="#eye-off" />
            </svg>
          </button>
          <input
            name="password"
            placeholder={placeholder}
            className={`custom__input w-full h-[46px] px-3.5 text-sm/[19.6px] bg-white text-[#1A1C1E] font-medium border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[${placeholderColor}]`}
            type={showPassword ? "text" : "password"}
            style={style}
            {...props}
          />
        </div>
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          className={`custom__input w-full h-[46px] px-3.5 text-sm/[19.6px] bg-white text-[#1A1C1E] font-medium border border-[#EDF1F3] rounded-[10px] outline-none placeholder:text-[${placeholderColor}]`}
          type={type}
          style={style}
          {...props}
        />
      )}
    </>
  );
};

export default Input;
