"use client";
import { useState } from "react";

const GroupButton = ({ onChange }) => {
  const [selected, setSelected] = useState("");

  // TODO: 카테고리 설정 필요
  const categories = ["카테고리1", "카테고리2", "카테고리3"];

  const handleClick = (type) => {
    setSelected(type);
    onChange(type);
  };

  return (
    <div className="flex gap-2">
      {categories.map((type) => (
        <button
          key={type}
          className={`pretendard-medium-12 px-4 py-2 rounded-full ${
            selected === type
              ? "bg-primary text-basic-100"
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
