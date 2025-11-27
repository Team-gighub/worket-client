"use client";
import React from "react";
import BottomSheet from "./BottomSheet";
import { useRouter } from "next/navigation";
import PasscodeForm from "../passcode/PasscodeForm";

const PasscodeBottomSheet = ({ isOpen, onClose, handlePasscodeComplete }) => {
  const router = useRouter();
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <PasscodeForm
        mode="verify"
        handlePasscodeComplete={handlePasscodeComplete}
      />
    </BottomSheet>
  );
};

export default PasscodeBottomSheet;
