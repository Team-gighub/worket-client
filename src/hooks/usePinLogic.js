import { useState, useCallback } from "react";
import { MODES, PIN_LENGTH } from "../components/pin/pinUtils";

export const usePinLogic = (mode, storedPin, onSuccess, reshuffle) => {
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
      setConfirmedPin(pin);
      setPin("");
      setStep(2);
      reshuffle();
      return;
    }

    if (pin === confirmedPin) {
      onSuccess?.(pin);
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
    if (pin === storedPin) {
      onSuccess?.(pin);
    } else {
      const newAttempts = attempts + 1;
      setError("비밀번호가 일치하지 않습니다.");
      setPin("");
      setAttempts(newAttempts);
      reshuffle();
    }
  }, [pin, storedPin, attempts, onSuccess, reshuffle]);

  return {
    pin,
    setPin,
    step,
    error,
    handleSetupMode,
    handleVerifyMode,
  };
};
