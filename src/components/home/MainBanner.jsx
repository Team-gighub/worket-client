"use client";

import React from "react";
import Image from "next/image";

/**
 * 홈 버튼 공통 컴포넌트 (워캣 이미지 스타일 배너)
 */
const MainBanner = ({
  title,
  subtitle,
  description, // 추가: 설명 문구
  titleColor,
  subtitleColor,
  width = "30rem",
  height = "20rem",
  icon = null,
  isDisabled = false,
  className = "", // 추가
}) => {
  return (
    <div
      disabled={isDisabled}
      style={{ width, height }}
      className={`
        rounded-[1rem] bg-point-blue-100
        flex p-6 
        hover:bg-basic-50 transition 
        shadow-md
        text-left
        whitespace-pre-line
        ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {/* 전체 영역: 좌 텍스트 + 우 아이콘 */}
      <div className="relative flex flex-row w-full justify-between items-start py-5">
        {/* ⬅️ 1. 텍스트 영역 */}
        <div className="flex flex-col gap-2 max-w-[70%]">
          <span
            className={`pretendard-semibold-13 ${subtitleColor} whitespace-pre-line`}
          >
            {subtitle}
          </span>
          <span
            className={`pretendard-semibold-18 ${titleColor} whitespace-pre-line`}
          >
            {title}
          </span>

          {description && (
            <p className="text-[1rem] text-gray-600 leading-snug mt-2">
              {description}
            </p>
          )}
        </div>

        {/* ➡️ 2. 아이콘 영역 */}
        {icon && (
          <div className="absolute w-[8rem] h-[10rem] flex-shrink-0 right-0 bottom-0">
            <Image
              src={icon.src}
              alt={icon.alt}
              fill
              className="object-contain"
              sizes="10rem"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBanner;
