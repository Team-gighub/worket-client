"use client";

import React from "react";

const BottomButton = ({ text, onClick, theme = "default" }) => {
  const themes = {
    default: { button: "bg-primary", text: "text-basic-100" },
    secondary: { button: "bg-point-purple-100", text: "text-point-purple-300" },
    disabled: { button: "bg-basic-300", text: "text-basic-100" },
  };

  const selectedTheme = themes[theme];

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={onClick}
        className={`w-[315px] h-[51px] rounded-[10px] flex items-center justify-center ${selectedTheme.button}`}
      >
        <span className={`pretendard-semibold-16 ${selectedTheme.text}`}>
          {text}
        </span>
      </button>
    </div>
  );
};
export default BottomButton;
