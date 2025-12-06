"use client";

import React from "react";
import Image from "next/image";

/**
 * 결제 수단/카드사 공통 컴포넌트 (PaymentGrid Item용)
 * 이미지와 레이블을 세로로 중앙 정렬합니다.
 */
const PaymentButton = ({
  label, // 버튼 아래 표시될 텍스트 (예: 엘페이, 삼성)
  onClick,
  icon, // { src: string, alt: string } 형태
  isDisabled = false,
  width = "10rem",
  height = "7rem",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{ width, height }}
      className={`
        rounded-[1rem] bg-basic-100
        shadow-md
        p-4 border border-solid border-basic-100
        hover:bg-basic-300 transition
        ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}
        flex flex-col items-center justify-center
      `}
    >
      {/* 1. 아이콘 영역 */}
      {icon && (
        // 아이콘 크기를 고정하고 비율 유지
        <div className="relative w-[3rem] h-[3rem] flex-shrink-0 mb-2">
          <Image
            src={icon.src}
            alt={icon.alt}
            fill
            sizes="2.7rem"
            className="object-contain" // 이미지 비율 유지
          />
        </div>
      )}

      {/* 2. 텍스트 레이블 영역 */}
      <div className="flex flex-col items-center justify-center">
        <span
          // 결제 버튼의 텍스트 레이블에 맞게 스타일 조정
          className={`pretendard-medium-12 text-basic-700 whitespace-nowrap`}
        >
          {label}
        </span>
      </div>
    </button>
  );
};

export default PaymentButton;
