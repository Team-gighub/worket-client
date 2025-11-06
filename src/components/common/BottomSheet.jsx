"use client";

import React from "react";

/**
 *
 * @param {boolean} isOpen - 바텀 시트의 열림 상태 (필수)
 * @param {function(): void} onClose - 바텀 시트를 닫는 함수 (필수)
 * @param {React.ReactNode} children - 바텀 시트 안에 들어갈 내용물 (필수)
 * @param {string} [maxHeight="max-h-[80vh]"] - 바텀 시트의 최대 높이 (선택)
 */
const BottomSheet = ({
  isOpen,
  onClose,
  children,
  maxHeight = "max-h-[80vh]",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="inset-0 z-50 overflow-hidden">
      {/* 1. 오버레이 (바텀 시트 외 영역) - 클릭 시 닫기 */}
      <div
        className="absolute inset-0 bg-basic-800 bg-opacity-60"
        onClick={onClose}
      />

      {/* 2. 바텀 시트 컨테이너 */}
      <div
        className={`absolute bottom-0 left-0 right-0 
            w-full bg-basic-100 rounded-lg
            ${maxHeight}`}
      >
        <div className="w-full flex justify-center py-2">
          <div className="mt-3 w-20 h-2 bg-basic-300 rounded-full" />
        </div>

        {/* 3. 내용물 (Children) */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100% - 2rem)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
