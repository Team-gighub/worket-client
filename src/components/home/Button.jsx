"use client";

import React from "react";
import Image from "next/image";

/**
 * 홈 버튼 공통 컴포넌트
 */
const HomeButton = ({
  title,
  subtitle,
  onClick,
  titleColor, // 윗줄 색
  subtitleColor, // 아랫줄 색
  width = "15rem",
  height = "8rem",
  icon = null, // { src: string, alt: string } 형태
  isDisabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{ width, height }}
      className={`
        rounded-[1rem] bg-basic-100 
        flex
        p-4 border border-solid border-basic-100
        hover:bg-basic-50 transition 
        shadow-md
        ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      <div className="flex justify-between flex-grow">
        {/* 1. 아이콘 영역*/}
        {icon && (
          <div className="relative w-[3.5rem] h-[3.1rem] flex-shrink-0 self-end mb-1">
            <Image
              src={icon.src}
              alt={icon.alt}
              fill // 부모 div 크기에 맞추어 채우기
              sizes="3.5rem"
              className="object-contain" // 이미지 비율 유지
            />
          </div>
        )}

        {/* 2. 텍스트 영역 - 윗줄, 아랫줄 수직으로 배치 */}
        <div className="flex flex-col items-end justify-center text-left">
          <span
            className={`pretendard-semibold-13 ${titleColor} whitespace-nowrap`}
          >
            {title}
          </span>
          <span
            className={`pretendard-medium-12 ${subtitleColor} whitespace-nowrap`}
          >
            {subtitle}
          </span>
        </div>
      </div>
    </button>
  );
};

export default HomeButton;
