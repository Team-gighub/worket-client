import React from "react";
import { KEYS } from "./pinUtils";

/**
 * 키패드의 버튼 컴포넌트
 * @param {string} value 표시될 숫자
 * @param {function} onClick 클릭된 이후 동작할 함수
 * @returns
 */
const KeypadButton = ({ value, onClick }) => {
  const displayValue =
    { [KEYS.CLEAR]: "지움", [KEYS.DELETE]: "←" }[value] ?? value;

  return (
    <button
      className="w-full flex justify-center items-center h-[5rem] pretendard-semibold-16"
      onClick={() => onClick(value)}
    >
      {displayValue}
    </button>
  );
};

export default KeypadButton;
