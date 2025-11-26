"use client";
import React, { useState, useEffect, useCallback } from "react";
import { shuffleArray, KEYS, PASSCODE_LENGTH } from "./passcodeUtils";
import PasscodeDisplay from "./PasscodeDisplay";
import KeypadButton from "./KeypadButton";

const INSTRUCTION_TEXT = "비밀번호를 입력해 주세요.";

/**
 * @param {function} handlePasscodeComplete 비밀번호 입력 완료 시, 처리할 함수 (페이지 라우팅 역할)
 * @returns
 */
const TradePasscodeForm = ({ handlePasscodeComplete }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const [shuffledNumbers, setShuffledNumbers] = useState(() =>
    [...Array(10).keys()].map(String),
  );

  const reshuffle = useCallback(() => {
    setShuffledNumbers(shuffleArray([...Array(10).keys()].map(String)));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => reshuffle(), 0);
    return () => clearTimeout(timer);
  }, [reshuffle]);

  // 키패드 입력 처리를 위한 함수
  const handleKeypadInput = useCallback(
    (value) => {
      if (value === KEYS.CLEAR) {
        // Clear 버튼: 초기화
        reshuffle();
        setPasscode("");
        setError("");
      } else if (value === KEYS.DELETE) {
        // Delete 버튼: 마지막 숫자 삭제
        setPasscode((p) => p.slice(0, -1));
        setError("");
      } else if (passcode.length < PASSCODE_LENGTH) {
        // 숫자 버튼: 패스코드에 숫자 추가
        setPasscode((p) => p + value);
        setError("");
      }
    },
    [passcode, setPasscode, reshuffle],
  );

  // 6자리 숫자 입력 완료 감지 & 콜백 함수 실행
  useEffect(() => {
    if (passcode.length === PASSCODE_LENGTH) {
      const timeout = setTimeout(() => {
        handlePasscodeComplete(passcode);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [passcode, handlePasscodeComplete]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-[2rem]">
      <PasscodeDisplay
        passcodeLength={passcode.length}
        instruction={INSTRUCTION_TEXT}
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

export default TradePasscodeForm;
