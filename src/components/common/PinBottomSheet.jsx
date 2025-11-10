"use client";
import React, { useState, useEffect } from "react";
import BottomSheet from "./BottomSheet";
import { useRouter } from "next/navigation";

const PinBottomSheet = ({ isOpen, onClose, onConfirm }) => {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [padNumbers, setPadNumbers] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false); // 검증 중 상태
  const [error, setError] = useState("");

  // 숫자 0~9 섞기
  const shuffleNumbers = () => {
    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  };

  // 바텀시트 열 때 초기 숫자 패드 생성
  useEffect(() => {
    if (isOpen) {
      const shuffled = shuffleNumbers();
      setPadNumbers([
        ...shuffled.slice(0, 3),
        ...shuffled.slice(3, 6),
        ...shuffled.slice(6, 9),
        "지움",
        shuffled[9],
        "←",
      ]);
      setPin(""); // 바텀시트 열 때 입력 초기화
    }
  }, [isOpen]);

  const handlePadClick = (val) => {
    if (val === "←") {
      setPin(pin.slice(0, -1));
    } else if (val === "지움") {
      setPin("");
    } else if (pin.length < 6) {
      setPin(pin + val);
    }
  };

  const handleConfirm = () => {
    if (pin.length !== 6) {
      alert("6자리 PIN을 입력해주세요.");
      return;
    }
    onConfirm(pin);
    setPin("");
    onClose();
  };

  // 6자리 입력 완료 시 자동 검증
  useEffect(() => {
    const verifyPin = async () => {
      setIsVerifying(true);
      setError("");

      try {
        // TODO: 실제 API 엔드포인트로 변경 필요
        // const response = await fetch("/api/verify-pin", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ pin }),
        // });

        // TODO: 로직 완성 후, 삭제 필요
        router.push("/transactions/create/result");

        // if (response.ok && result.success) {
        //   onConfirm(pin); // 성공 시 콜백 실행
        //   setPin("");
        //   onClose();
        //   router.push("/transactions/create/result");
        // } else {
        //   setError("비밀번호가 올바르지 않습니다.");
        //   setPin("");
        // }
      } catch (err) {
        console.error("PIN 검증 오류:", err);
        setError("서버 오류가 발생했습니다.");
      } finally {
        setIsVerifying(false);
      }
    };

    if (pin.length === 6) {
      verifyPin();
    }
  }, [pin]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-4 text-center">
        <h2 className="pretendard-semibold-18 m-10">간편 비밀번호 입력</h2>

        {/* PIN 입력 표시 */}
        <div className="pretendard-medium-14 tracking-widest m-10">
          {Array.from({ length: 6 }, (_, i) => (pin[i] ? "•" : "_")).join(" ")}
        </div>

        {/* 숫자 패드 */}
        <div className="grid grid-cols-3 gap-10 m-10">
          {padNumbers.map((val, idx) => (
            <button
              key={idx}
              onClick={() => handlePadClick(val)}
              className={`py-4 mb-4 pretendard-medium-16 rounded-lg cursor-pointer`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};

export default PinBottomSheet;
