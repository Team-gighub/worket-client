"use client";

import React from "react";

const DualButtons = ({ mainText, onMainClick, subText, onSubClick }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[315px] h-[51px] flex justify-between my-4 pretendard-semibold-16 gap-4">
        <button
          onClick={onSubClick}
          className={`rounded-[10px] flex items-center justify-center bg-basic-300 text-basic-100 px-10 whitespace-nowrap`}
        >
          {subText}
        </button>
        <button
          onClick={onMainClick}
          className={`rounded-[10px] flex items-center justify-center bg-primary text-basic-100 px-10 flex-grow whitespace-nowrap`}
        >
          <span>{mainText}</span>
        </button>
      </div>
    </div>
  );
};
export default DualButtons;
