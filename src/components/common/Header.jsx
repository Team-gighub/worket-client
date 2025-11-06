"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * 공통 헤더 컴포넌트
 * @param {string} title - 페이지 제목 (선택사항)
 * @param {string|number|function} onBack - 뒤로가기 동작
 *    - 문자열: 특정 경로로 이동
 *    - 숫자: 그만큼 히스토리 뒤로 이동 (ex. 2 → 2단계 뒤로)
 *    - 함수: 커스텀 동작 실행
 * @param {function} onClose - 닫기 버튼 클릭 핸들러 (선택사항)
 */
const Header = ({ title, onBack, onClose }) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (typeof onBack === "string") {
      router.push(onBack);
    } else if (typeof onBack === "number") {
      window.history.go(-Math.abs(onBack));
    } else if (typeof onBack === "function") {
      onBack();
    } else {
      router.back();
    }
  };

  const handleCloseClick = () => {
    if (onClose) onClose();
  };

  return (
    <header className="absolute top-0 w-full h-[6rem] px-[2rem] pt-[3rem] pb-[1rem] bg-basic-100">
      <div className="flex justify-between items-center h-[1.9rem]">
        {/* 뒤로가기 아이콘: onBack 있을 때만 표시 */}
        <button
          onClick={handleBackClick}
          className={`flex flex-col items-center hover:opacity-80 ${
            !onBack ? "opacity-0 pointer-events-none" : ""
          }`}
          aria-label="뒤로가기"
        >
          <div className="relative w-[1.6rem] h-[1.6rem]">
            <Image
              src="/icons/icLeftArrow.png"
              alt="<"
              fill
              sizes="1.6rem"
              className="object-contain"
              loading="eager"
            />
          </div>
        </button>

        {/* 제목 */}
        <h1 className="pretendard-semibold-16 text-basic-800">{title}</h1>

        {/* 닫기 아이콘 */}
        <button
          onClick={handleCloseClick}
          className={`flex flex-col items-center hover:opacity-80 ${
            !onClose ? "opacity-0 pointer-events-none" : ""
          }`}
          aria-label="닫기"
        >
          <div className="relative w-[1.6rem] h-[1.6rem]">
            <Image
              src="/icons/icClose.png"
              alt="닫기"
              fill
              sizes="1.6rem"
              className="object-contain"
              loading="eager"
            />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
