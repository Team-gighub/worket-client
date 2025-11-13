"use client";
import { useState } from "react";

const GroupButton = ({ category, onChange }) => {
  const [selected, setSelected] = useState("");

  const handleClick = (type) => {
    setSelected(type);
    onChange(type);
  };

  return (
    <div className="flex flex-wrap gap-x-[0.5rem] gap-y-[1rem]">
      {category.map((type) => (
        <button
          key={type}
          className={`pretendard-medium-12 px-4 py-2 rounded-full ${
            selected === type
              ? "bg-primary text-basic-100 border border-primary"
              : "border border-primary"
          }`}
          onClick={() => handleClick(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default GroupButton;
