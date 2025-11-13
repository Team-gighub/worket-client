"use client";
import React from "react";
import BottomSheet from "./BottomSheet";
import { useRouter } from "next/navigation";
import PinInputForm from "../pin/PinInputForm";

const PinBottomSheet = ({ isOpen, onClose }) => {
  const router = useRouter();
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* TODO: storedPin props로 설정된 pin 번호 넘겨주기 */}
      <PinInputForm
        mode="verify"
        onSuccess={(pin) => {
          router.push("/transactions/create/result");
        }}
      />
    </BottomSheet>
  );
};

export default PinBottomSheet;
