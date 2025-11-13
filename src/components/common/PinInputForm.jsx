"use client";
import React, { useState, useEffect, useCallback } from "react";

const PIN_LENGTH = 6;
const MODES = { SETUP: "setup", VERIFY: "verify" };
const KEYS = { CLEAR: "clear", DELETE: "delete" };

// 숫자 랜덤 셔플 함수
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// 키패드 버튼
const KeypadButton = ({ value, onClick }) => {
  const displayValue =
    value === KEYS.CLEAR ? "지움" : value === KEYS.DELETE ? "←" : value;

  return (
    <button
      className="w-full flex justify-center items-center h-[5rem] pretendard-semibold-16"
      onClick={() => onClick(value)}
    >
      {displayValue}
    </button>
  );
};

// PIN 표시부
const PinInputDisplay = ({ pinLength, instruction, error }) => {
  return (
    <div className="text-center flex flex-col gap-[2rem] py-[5rem]">
      <div className="flex justify-center mb-[3rem]">
        {Array.from({ length: PIN_LENGTH }, (_, i) => (
          <span
            key={i}
            className={`w-4 h-4 mx-2 rounded-full ${
              i < pinLength ? "bg-basic-700" : "bg-basic-300"
            }`}
          />
        ))}
      </div>

      <p className="text-basic-700 pretendard-bold-14">{instruction}</p>

      <div className="h-[3rem]">
        {error && (
          <p className="text-point-red-300 pretendard-medium-12">{error}</p>
        )}
      </div>
    </div>
  );
};

/**
 *  핀 번호 입력 컴포넌트
 * @param {string} mode {"setup": 등록 | "verify": 검증}
 * @param {string} storedPin 검증을 위해 설정한 핀 번호 전달
 * @param {function} onSuccess 핀 번호 검증에 성공한 후, 동작할 함수
 */
export const PinInputForm = ({ mode, storedPin = "", onSuccess }) => {
  /*
   * storedPin - db에 저장되어 있는 사용자의 pin
   * confirmedPin - 등록을 위해 입력한 첫 번째 pin (저장해두고, 재확인 시 사용)
   * pin - 등록을 위해 입력한 두 번째 pin (confirmedPin과 다르면 등록 안 됨)
   *
   */
  const [confirmedPin, setConfirmedPin] = useState("");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState(mode === MODES.SETUP ? 1 : 2);
  const [error, setError] = useState("");
  const [shuffledNumbers, setShuffledNumbers] = useState(() =>
    shuffleArray([...Array(10).keys()].map(String)),
  );

  const reshuffle = useCallback(() => {
    setShuffledNumbers(shuffleArray([...Array(10).keys()].map(String)));
  }, []);

  const handleKeypadInput = useCallback(
    (value) => {
      if (error) setError("");

      switch (value) {
        case KEYS.CLEAR:
          setPin("");
          break;
        case KEYS.DELETE:
          setPin((prev) => prev.slice(0, -1));
          break;
        default:
          if (pin.length < PIN_LENGTH) setPin((prev) => prev + value);
          break;
      }
    },
    [pin, error],
  );

  // 입력 완료 시 로직
  const handleCompletedPin = useCallback(() => {
    if (mode === MODES.SETUP) {
      if (step === 1) {
        setConfirmedPin(pin);
        setPin("");
        setStep(2);
        reshuffle();
        return;
      }

      if (pin === confirmedPin) {
        onSuccess?.(pin);
      } else {
        setError("비밀번호가 일치하지 않습니다.");
        setPin("");
        reshuffle();
      }
    } else if (mode === MODES.VERIFY) {
      if (pin === storedPin) {
        onSuccess?.(pin);
      } else {
        setError("비밀번호가 일치하지 않습니다.");
        setPin("");
        reshuffle();
      }
    }
  }, [mode, step, pin, confirmedPin, storedPin, onSuccess, reshuffle]);

  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      // 비동기 처리로 한 틱 뒤에 실행
      const timeout = setTimeout(() => {
        handleCompletedPin();
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [pin, handleCompletedPin]);

  const instructionText =
    mode === MODES.SETUP
      ? step === 1
        ? "간편 비밀번호 6자리를 입력해주세요"
        : "간편 비밀번호 6자리를 한번 더 입력해주세요"
      : "간편 비밀번호를 입력해주세요";

  return (
    <div className="w-full h-full flex flex-col justify-between p-[2rem]">
      <PinInputDisplay
        pinLength={pin.length}
        instruction={instructionText}
        error={error}
      />

      {/* 키패드 */}
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
