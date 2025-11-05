"use client";
import React from "react";
import BottomSheet from "../BottomSheet";
import Signiture from "./Signiture";
import useSigniture from "./useSigniture";

const SignatureForm = ({ onSave }) => {
  const { isOpen, openSheet, closeSheet, handleSave } = useSigniture(onSave);

  return (
    <div className="relative w-full h-full">
      <button onClick={openSheet} className="w-full h-[19rem] p-[2rem]">
        <div className="bg-basic-200 w-full h-full relative rounded-lg">
          <span className="absolute top-4 left-5 pretendard-semibold-16 text-basic-400">
            서명란
          </span>
        </div>
      </button>

      <BottomSheet isOpen={isOpen} onClose={closeSheet}>
        <Signiture onSave={handleSave} />
      </BottomSheet>
    </div>
  );
};

export default SignatureForm;
