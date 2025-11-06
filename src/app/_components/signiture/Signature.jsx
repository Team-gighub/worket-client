"use client";

import SignatureCanvas from "react-signature-canvas";
import useSignature from "./useSignature";

/**
 * Signature Component
 *
 * @param {function(): void} onClose - 서명 완료 동작이 수행되고 나면, 바텀시트가 닫히도록 지정하는 함수
 * @param {function(): Promise<string>} getPresignedUrl - 서버에서 S3 업로드용 presigned URL을 받아오는 비동기 함수
 */
const Signature = ({ onClose, getPresignedUrl }) => {
  const { signatureRef, clearSignature, saveSignature } = useSignature(
    onClose,
    getPresignedUrl,
  );

  return (
    <div className="relative rounded-lg p-4 mt-3 ">
      <span className="absolute top-10 left-11 pretendard-semibold-16 text-basic-400">
        서명란
      </span>

      {/* Signature Canvas 영역 */}
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{
          className: "bg-basic-200 rounded-lg w-full h-[150px]",
        }}
      />

      {/* 버튼 영역 */}
      <div className="flex justify-between gap-10 mb-10 mt-10">
        <button
          onClick={clearSignature}
          className="flex-1 px-4 py-2 pretendard-semibold-16 bg-basic-300 text-basic-100 rounded-lg"
        >
          수정
        </button>
        <button
          onClick={saveSignature}
          className="flex-1 px-4 py-2 pretendard-semibold-16 bg-primary text-basic-100 rounded-lg"
        >
          서명 완료
        </button>
      </div>
    </div>
  );
};

export default Signature;
