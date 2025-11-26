"use client";
import React from "react";
import BottomSheet from "./BottomSheet";
import Signature from "./Signature";
import useBottomSheet from "../../hooks/useBottomSheet";
import { useSignatureStore } from "@/stores/signatureStore";

const SignatureForm = ({ userRole, contractId }) => {
  const { isOpen, open, close } = useBottomSheet();
  const { tempPreviewUrl } = useSignatureStore();

  return (
    <div className="w-full mx-auto max-w-[33.5rem] my-[2rem]">
      <button onClick={open} className="w-full h-[15rem]">
        <div className="bg-basic-200 w-full h-full relative rounded-lg">
          <span className="absolute top-4 left-5 pretendard-semibold-16 text-basic-400">
            서명란
          </span>
          {tempPreviewUrl && (
            <img
              src={tempPreviewUrl}
              alt="Signature Preview"
              className="w-full h-full object-contain absolute top-0 left-0 z-0"
            />
          )}
        </div>
      </button>

      <BottomSheet isOpen={isOpen} onClose={close}>
        <Signature
          onClose={close}
          userRole={userRole}
          contractId={contractId}
        />
      </BottomSheet>
    </div>
  );
};

export default SignatureForm;
