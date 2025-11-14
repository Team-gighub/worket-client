import { useState, useCallback } from "react";
import { registerPasscode, verifyPasscode } from "../app/api/passcode";

export const usePinLogic = (mode, handlePinComplete, reshuffle) => {
  const [pin, setPin] = useState("");
  const [storedPin, setStoredPin] = useState("");
  const [step, setStep] = useState(mode === "register" ? 1 : 2);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  // 암호화 함수
  const encryptPin = useCallback((value) => {
    // TODO: 암호화 로직
    return value;
  }, []);

  // reset 함수
  const resetSetup = useCallback(() => {
    setPin("");
    setStoredPin("");
    setAttempts(0);
    setStep(1);
    reshuffle();
  }, [reshuffle]);

  // Register (비밀번호 등록) 함수
  const handleRegisterMode = useCallback(async () => {
    setError("");

    // STEP 1 → PIN 저장
    if (step === 1) {
      setStoredPin(pin);
      setPin("");
      setStep(2);
      reshuffle();
      return;
    }

    // STEP 2 → PIN 확인
    if (pin !== storedPin) {
      const next = attempts + 1;

      if (next >= 3) {
        setError("3회 이상 틀렸습니다. 다시 설정해주세요.");
        resetSetup();
        return;
      }

      setError("비밀번호가 일치하지 않습니다.");
      setPin("");
      setAttempts(next);
      reshuffle();
      return;
    }

    // pin == storedPin → 등록 API 호출
    try {
      const encrypted = encryptPin(pin);
      await registerPasscode(encrypted);

      setPin("");
      setStoredPin("");
      handlePinComplete();
    } catch (e) {
      console.error(e);
      setError("간편 비밀번호 등록 중 오류가 발생했습니다.");
    }
  }, [
    pin,
    step,
    storedPin,
    attempts,
    reshuffle,
    encryptPin,
    resetSetup,
    handlePinComplete,
  ]);

  // Verify (비밀번호 검증) 함수
  const handleVerifyMode = useCallback(async () => {
    setError("");

    try {
      const encrypted = encryptPin(pin);
      await verifyPasscode(encrypted);

      setPin("");
      handlePinComplete(); // 검증 성공 시, 페이지 이동
    } catch (e) {
      console.error(e);
      setError("잘못된 비밀번호입니다.");
      setPin("");
      reshuffle();
    }
  }, [pin, encryptPin, handlePinComplete, reshuffle]);

  return {
    pin,
    setPin,
    step,
    error,
    handleRegisterMode,
    handleVerifyMode,
  };
};
