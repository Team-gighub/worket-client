"use client";

import React from "react";
import MainButton from "./MainButton";

/**
 * 두 개의 버튼을 나란히 배치하는 컴포넌트
 *
 * @param {string} mainText - 메인 버튼 텍스트 (필수)
 * @param {function(): void} onMainClick - 메인 버튼 클릭 핸들러 (필수)
 * @param {string} subText - 서브 버튼 텍스트 (필수)
 * @param {function(): void} onSubClick - 서브 버튼 클릭 핸들러 (필수)
 * @param {"default" | "secondary" | "disabled"} [mainButtonTheme="default"] - 메인 버튼 테마
 * @param {string} width - 전체 너비 (단위 포함)
 * @param {number} [height=5.1] - 버튼 높이 (rem 단위)
 */
const DualButtons = ({
  mainText,
  onMainClick,
  subText,
  onSubClick,
  mainButtonTheme = "default",
  width,
  height = 5.1,
}) => {
  return (
    <div className="flex justify-center">
      <div
        className={`${width ? "" : "w-full"} h-[${height}rem] flex justify-between my-4 pretendard-semibold-16 gap-4`}
        style={
          width
            ? { width: `${width}`, height: `${height}` }
            : { height: `${height}` }
        }
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
