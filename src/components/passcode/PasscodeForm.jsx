"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  shuffleArray,
  getInstructionText,
  KEYS,
  PASSCODE_LENGTH,
} from "./passcodeUtils";
import PasscodeDisplay from "./PasscodeDisplay";
import KeypadButton from "./KeypadButton";
import { usePasscodeLogic } from "../../hooks/usePasscodeLogic";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 *
 * @param {string} mode "register"(비밀번호 등록) | "verify"(비밀번호 입력)
 * @param {function} handlePasscodeComplete 비밀번호 검증 완료 시, 처리할 함수 (페이지 라우팅 역할)
 * @returns
 */
const PasscodeForm = ({ mode, handlePasscodeComplete }) => {
  const [shuffledNumbers, setShuffledNumbers] = useState(() =>
    [...Array(10).keys()].map(String),
  );

  // 키패드에 보여질 숫자 랜덤화를 위한 함수
  const reshuffle = useCallback(() => {
    setShuffledNumbers(shuffleArray([...Array(10).keys()].map(String)));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => reshuffle(), 0);
    return () => clearTimeout(timer);
  }, [reshuffle]);

  const {
    passcode,
    setPasscode,
    step,
    error,
    handleRegisterMode,
    handleVerifyMode,
    isVerifying,
  } = usePasscodeLogic(mode, handlePasscodeComplete, reshuffle);

  // 키패드 입력 처리를 위한 함수
  const handleKeypadInput = useCallback(
    (value) => {
      if (value === KEYS.CLEAR) reshuffle();
      if (value === KEYS.CLEAR) setPasscode("");
      else if (value === KEYS.DELETE) setPasscode((p) => p.slice(0, -1));
      else if (passcode.length < PASSCODE_LENGTH) setPasscode((p) => p + value);
    },
    [passcode, setPasscode],
  );

  // 6자리 숫자 입력 완료 감지 & 모드에 따른 처리 함수 실행
  useEffect(() => {
    if (passcode.length === PASSCODE_LENGTH) {
      const timeout = setTimeout(() => {
        mode === "register" ? handleRegisterMode() : handleVerifyMode();
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [passcode, mode, handleRegisterMode, handleVerifyMode]);

  if (isVerifying) return <LoadingSpinner />;

  return (
    <div className="w-full h-full flex flex-col justify-between p-[2rem]">
      <PasscodeDisplay
        passcodeLength={passcode.length}
        instruction={getInstructionText(mode, step)}
        error={error}
      />

      <div className="grid grid-cols-3 gap-[1rem] py-[2rem]">
        {shuffledNumbers.slice(0, 9).map((num) => (
          <KeypadButton key={num} value={num} onClick={handleKeypadInput} />
        ))}
        <KeypadButton value={KEYS.CLEAR} onClick={handleKeypadInput} />
        <KeypadButton value={shuffledNumbers[9]} onClick={handleKeypadInput} />
        <KeypadButton value={KEYS.DELETE} onClick={handleKeypadInput} />
      </div>
    </div>
  );
};

export default PasscodeForm;
