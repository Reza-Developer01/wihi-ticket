"use client";

import { useState } from "react";

const PollSystem = () => {
  const [rating, setRating] = useState(0);
  const totalStars = 5;
  const activeColor = "#FFA600";
  const inactiveColor = "#B9B9B9";

  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalStars }).map((_, index) => {
        const filled = rating >= index + 1;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            className="flex items-center justify-center w-[53px] h-[53px] focus:outline-none"
          >
            <svg
              className="w-[43px] h-[43px]"
              style={{ color: filled ? activeColor : inactiveColor }}
            >
              <use href="#star" />
            </svg>
          </button>
        );
      })}
      <input
        type="hidden"
        name="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
    </div>
  );
};

export default PollSystem;
