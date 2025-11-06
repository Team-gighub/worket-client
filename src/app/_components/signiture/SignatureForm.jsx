"use client";
import React from "react";
import BottomSheet from "../BottomSheet";
import Signature from "./Signature";
import useBottomSheet from "../useBottomSheet";

const SignatureForm = () => {
  const { isOpen, open, close } = useBottomSheet();

  return (
    <div className="relative w-full h-full">
      <button onClick={open} className="w-full h-[19rem] p-[2rem]">
        <div className="bg-basic-200 w-full h-full relative rounded-lg">
          <span className="absolute top-4 left-5 pretendard-semibold-16 text-basic-400">
            서명란
          </span>
        </div>
      </button>

      <BottomSheet isOpen={isOpen} onClose={close}>
        <Signature onClose={close} />
      </BottomSheet>
    </div>
  );
};

export default SignatureForm;
