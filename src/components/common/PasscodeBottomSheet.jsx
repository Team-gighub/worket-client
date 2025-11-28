"use client";
import React from "react";
import BottomSheet from "./BottomSheet";
import PasscodeForm from "../passcode/PasscodeForm";

const PasscodeBottomSheet = ({ isOpen, onClose, handlePasscodeComplete }) => {
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
