import React from "react";
import Image from "next/image";

/**
 * 메인 버튼 컴포넌트
 *
 * - 단독으로 사용 시 가운데 정렬 + 여백 자동 적용
 * - 다른 컴포넌트 내에서 사용할 땐 `isFullWidth`로 레이아웃 제어
 *
 * @param {string} text - 버튼에 표시할 텍스트 (필수)
 * @param {function(): void} onClick - 버튼 클릭 핸들러 (필수)
 * @param {"default" | "secondary" | "gray"} [theme="default"] - 버튼 테마
 * @param {string} [width=31.5] - 버튼 너비 (단위 포함한 string)
 * @param {string} [height=5.1] - 버튼 높이 (단위 포함한 string)
 * @param {boolean} [isFullWidth=false] - true면 남은 공간 전체 차지
 * @param {{ src: string, alt: string }} icon - 아이콘 이미지 정보 (경로 및 대체 텍스트)
 */
const MainButton = ({
  text,
  onClick,
  theme = "default",
  width = "31.5rem",
  height = "5.1rem",
  isFullWidth = false,
  isDisabled = false,
  icon = null,
}) => {
  const themes = {
    default: { button: "bg-primary", text: "text-basic-100" },
    secondary: { button: "bg-point-purple-100", text: "text-point-purple-300" },
    gray: { button: "bg-basic-300", text: "text-basic-100" },
    darkgray: { button: "bg-basic-300", text: "text-basic-500" },
  };

  const selectedTheme = themes[theme];

  const buttonElement = (
    <button
      onClick={onClick}
      style={
        !isFullWidth
          ? { width: `${width}`, height: `${height}` }
          : { height: `${height}` }
      }
      className={`rounded-[1rem] flex items-center justify-center ${
        selectedTheme.button
      } ${isFullWidth ? "flex-grow" : ""} whitespace-nowrap`}
      disabled={isDisabled}
    >
      <div className="flex justify-center items-center gap-[1rem]">
        {icon && (
          <div className="relative w-[1.5rem] h-[1.5rem]">
            <Image
              src={icon.src}
              alt={icon.alt}
              fill
              sizes="1.5rem"
              className="object-contain"
              loading="eager"
            />
          </div>
        )}
        <span className={`pretendard-semibold-16 ${selectedTheme.text}`}>
          {text}
        </span>
      </div>
    </button>
  );

  // isFullWidth일 때는 위 여백 없이 버튼만 렌더링
  if (isFullWidth) return buttonElement;

  // 아닐 때(단독 사용)는 중앙 정렬과 여백을 위한 div로 감싸기
  return <div className="flex justify-center my-4">{buttonElement}</div>;
};

export default MainButton;
