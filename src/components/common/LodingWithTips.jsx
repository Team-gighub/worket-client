"use client";
import React, { useState, useEffect, useRef } from "react";

const LoadingWithTips = ({
  isLoading,
  message = "계약서 OCR 추출 중..",
  tips = [
    "계약서의 모든 글자가 선명하게 인식되고 있는지 확인 중입니다.",
    "전자계약의 법적 효력을 위한 필수 정보를 추출하고 있어요.",
    "잠시 후, 추출된 주요 항목을 확인하실 수 있습니다.",
  ],
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const updateTip = useCallback(() => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  }, [tips.length]);

  useEffect(() => {
    const interval = setInterval(updateTip, 4500);

    return () => clearInterval(interval);
  }, [updateTip]);

  if (!isLoading) return null;

  return (
    <div className="inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-basic-600 bg-opacity-60">
        <div className="flex flex-col items-center text-center px-6 py-8">
          {/* 메인 메시지 */}
          <p className="pretendard-semibold-18 text-basic-100 mb-4 whitespace-pre-line">
            {message}
          </p>

          {/* Loading dots */}
          <div className="flex gap-2 mt-4 mb-6">
            <div className="w-4 h-4 bg-point-purple-100 rounded-full animate-bounce" />
            <div className="w-4 h-4 bg-point-purple-200 rounded-full animate-bounce delay-150" />
            <div className="w-4 h-4 bg-point-purple-300 rounded-full animate-bounce delay-300" />
            <div className="w-4 h-4 bg-point-purple-200 rounded-full animate-bounce delay-150" />
            <div className="w-4 h-4 bg-point-purple-100 rounded-full animate-bounce" />
          </div>

          {/* Tip Box */}
          <div
            key={currentTipIndex}
            className="mt-2 px-4 py-2 bg-basic-100/90 text-primary rounded-[100px] pretendard-medium-12 leading-relaxed shadow transition-all duration-700 ease-in-out"
          >
            {tips[currentTipIndex]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingWithTips;
