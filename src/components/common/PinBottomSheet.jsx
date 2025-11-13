"use client";
import React from "react";
import BottomSheet from "./BottomSheet";
import { useRouter } from "next/navigation";
import PinInputForm from "./PinInputForm";

const PinBottomSheet = ({ isOpen, onClose }) => {
  const router = useRouter();
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
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
