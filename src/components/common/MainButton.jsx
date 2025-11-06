"use client";

import React from "react";

const MainButton = ({
  text,
  onClick,
  theme = "default",
  width = 31.5,
  height = 5.1,
  isFullWidth = false,
}) => {
  const themes = {
    default: { button: "bg-primary", text: "text-basic-100" },
    secondary: { button: "bg-point-purple-100", text: "text-point-purple-300" },
    disabled: { button: "bg-basic-300", text: "text-basic-100" },
  };

  const selectedTheme = themes[theme];

  const buttonElement = (
    <button
      onClick={onClick}
      style={
        !isFullWidth ? { width: `${width}rem`, height: `${height}rem` } : {}
      }
      className={`rounded-[1rem] flex items-center justify-center ${
        selectedTheme.button
      } ${isFullWidth ? "flex-grow" : ""} whitespace-nowrap`}
      disabled={theme === "disabled"}
    >
      <span className={`pretendard-semibold-16 ${selectedTheme.text}`}>
        {text}
      </span>
    </button>
  );

  // isFullWidth일 때는 위 여백 없이 버튼만 렌더링
  if (isFullWidth) return buttonElement;

  // 아닐 때(단독 사용)는 중앙 정렬과 여백을 위한 div로 감싸기
  return <div className="flex justify-center my-4">{buttonElement}</div>;
};

export default MainButton;
