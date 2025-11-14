import { useState, useCallback } from "react";
import { MODES, PIN_LENGTH } from "../components/pin/pinUtils";

export const usePinLogic = (mode, onSuccess, reshuffle) => {
  const [pin, setPin] = useState("");
  const [confirmedPin, setConfirmedPin] = useState("");
  const [step, setStep] = useState(mode === MODES.SETUP ? 1 : 2);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const resetSetup = useCallback(() => {
    setStep(1);
    setConfirmedPin("");
    setPin("");
    setAttempts(0);
    reshuffle();
  }, [reshuffle]);

  const handleSetupMode = useCallback(() => {
    if (step === 1) {
      setError("");
      setConfirmedPin(pin);
      setPin("");
      setStep(2);
      reshuffle();
      return;
    }

    if (pin === confirmedPin) {
      // TODO: 간편 비밀번호 등록 api 연동 필요
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      if (newAttempts >= 3) {
        setError("3회 이상 틀렸습니다. 다시 설정해주세요.");
        resetSetup();
      } else {
        setError("비밀번호가 일치하지 않습니다.");
        setPin("");
        setAttempts(newAttempts);
        reshuffle();
      }
    }
  }, [step, pin, confirmedPin, attempts, onSuccess, reshuffle, resetSetup]);

  const handleVerifyMode = useCallback(() => {
    // TODO: 간편 비밀번호 검증 api 연동 필요
    // TODO: api 응답에 따른 조건문 처리 필요 (현재는 임의로 true)
    if (true) {
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setError("비밀번호가 일치하지 않습니다.");
      setPin("");
      setAttempts(newAttempts);
      reshuffle();
    }
  }, [pin, attempts, onSuccess, reshuffle]);

  return {
    pin,
    setPin,
    step,
    error,
    handleSetupMode,
    handleVerifyMode,
  };
};
