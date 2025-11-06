"use client";

import React from "react";
import MainButton from "./MainButton";

const DualButtons = ({
  mainText,
  onMainClick,
  subText,
  onSubClick,
  mainButtonTheme = "default",
  width = 31.5,
  height = 5.1,
}) => {
  return (
    <div className="flex justify-center">
      <div
        className={`w-[${width}rem] h-[${height}rem] flex justify-between my-4 pretendard-semibold-16 gap-4`}
      >
        <button
          onClick={onSubClick}
          className={`rounded-[1rem] flex items-center justify-center bg-basic-300 text-basic-100 px-10 whitespace-nowrap`}
        >
          <span>{subText}</span>
        </button>
        <MainButton
          text={mainText}
          onClick={onMainClick}
          theme={mainButtonTheme}
          isFullWidth={true}
        />
      </div>
    </div>
  );
};
export default DualButtons;
