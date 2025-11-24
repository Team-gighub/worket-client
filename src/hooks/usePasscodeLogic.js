import { useState, useCallback } from "react";
import {
  postPasscodeRegister,
  postPasscodeVerify,
} from "@/lib/api/client/authServices";

export const usePasscodeLogic = (mode, handlePasscodeComplete, reshuffle) => {
  const [passcode, setPasscode] = useState("");
  const [storedPasscode, setStoredPasscode] = useState("");
  const [step, setStep] = useState(mode === "register" ? 1 : 2);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  // 암호화 함수
  const encryptpasscode = useCallback((value) => {
    // TODO: 암호화 로직
    return value;
  }, []);

  // reset 함수
  const resetSetup = useCallback(() => {
    setPasscode("");
    setStoredPasscode("");
    setAttempts(0);
    setStep(1);
    reshuffle();
  }, [reshuffle]);

  // Register (비밀번호 등록) 함수
  const handleRegisterMode = useCallback(async () => {
    setError("");

    // STEP 1 → passcode 저장
    if (step === 1) {
      setStoredPasscode(passcode);
      setPasscode("");
      setStep(2);
      reshuffle();
      return;
    }

    // STEP 2 → passcode 확인
    if (passcode !== storedPasscode) {
      const next = attempts + 1;

      if (next >= 3) {
        setError("3회 이상 틀렸습니다. 다시 설정해주세요.");
        resetSetup();
        return;
      }

      setError("비밀번호가 일치하지 않습니다.");
      setPasscode("");
      setAttempts(next);
      reshuffle();
      return;
    }

    // passcode == storedPasscode → 등록 API 호출
    try {
      const encrypted = encryptpasscode(passcode);
      await postPasscodeRegister({ passcode: encrypted });

      setPasscode("");
      setStoredPasscode("");
      handlePasscodeComplete();
    } catch (e) {
      console.error(e);
      setError("간편 비밀번호 등록 중 오류가 발생했습니다.");
    }
  }, [
    passcode,
    step,
    storedPasscode,
    attempts,
    reshuffle,
    encryptpasscode,
    resetSetup,
    handlePasscodeComplete,
  ]);

  // Verify (비밀번호 검증) 함수
  const handleVerifyMode = useCallback(async () => {
    setError("");

    try {
      const encrypted = encryptpasscode(passcode);
      await postPasscodeVerify(encrypted);

      setPasscode("");
      handlePasscodeComplete(); // 검증 성공 시, 페이지 이동
    } catch (e) {
      console.error(e);
      setError("잘못된 비밀번호입니다.");
      setPasscode("");
      reshuffle();
    }
  }, [passcode, encryptpasscode, handlePasscodeComplete, reshuffle]);

  return {
    passcode,
    setPasscode,
    step,
    error,
    handleRegisterMode,
    handleVerifyMode,
  };
};
