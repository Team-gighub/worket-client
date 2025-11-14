"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  MODES,
  shuffleArray,
  getInstructionText,
  KEYS,
  PIN_LENGTH,
} from "./pinUtils";
import PinInputDisplay from "./PinInputDisplay";
import KeypadButton from "./KeypadButton";
import { usePinLogic } from "../../hooks/usePinLogic";

/**
 *
 * @param {string} mode "setup"(초기 비밀번호 등록) | "verify"(비밀번호로 본인인증)
 * @param {function} onSuccess 비밀번호 검증 후 동작할 함수
 * @returns
 */
const PinInputForm = ({ mode, onSuccess }) => {
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

  const { pin, setPin, step, error, handleSetupMode, handleVerifyMode } =
    usePinLogic(mode, onSuccess, reshuffle);

  // 키패드 입력 처리를 위한 함수
  const handleKeypadInput = useCallback(
    (value) => {
      if (value === KEYS.CLEAR) reshuffle();
      if (value === KEYS.CLEAR) setPin("");
      else if (value === KEYS.DELETE) setPin((p) => p.slice(0, -1));
      else if (pin.length < PIN_LENGTH) setPin((p) => p + value);
    },
    [pin, setPin],
  );

  // 6자리 숫자 입력 완료 감지 & 모드에 따른 처리 함수 실행
  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      const timeout = setTimeout(() => {
        mode === MODES.SETUP ? handleSetupMode() : handleVerifyMode();
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [pin, mode, handleSetupMode, handleVerifyMode]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-[2rem]">
      <PinInputDisplay
        pinLength={pin.length}
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

export default PinInputForm;
