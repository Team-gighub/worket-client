import React from "react";
import { PASSCODE_LENGTH } from "./passcodeUtils";

/**
 * passcode 입력을 위한 표시 ui
 * @param {number} passcodeLength passcode 비밀번호의 자릿수
 * @param {string} instruction passcode 비밀번호 설정을 위한 안내 문구
 * @param {string} error passcode 비밀번호 설정 시, 발생가능한 에러 문구
 * @returns
 */
const PasscodeDisplay = ({ passcodeLength, instruction, error }) => (
  <div className="text-center flex flex-col gap-[2rem] py-[5rem]">
    <div className="flex justify-center mb-[3rem]">
      {Array.from({ length: PASSCODE_LENGTH }, (_, i) => (
        <span
          key={i}
          className={`w-4 h-4 mx-2 rounded-full ${
            i < passcodeLength ? "bg-basic-700" : "bg-basic-300"
          }`}
        />
      ))}
    </div>
    <p className="text-basic-700 pretendard-bold-14">{instruction}</p>
    {error && (
      <p className="text-point-red-300 pretendard-medium-12 h-[3rem]">
        {error}
      </p>
    )}
  </div>
);

export default PasscodeDisplay;
