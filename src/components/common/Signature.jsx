"use client";
import SignatureCanvas from "react-signature-canvas";
import useSignature from "../../hooks/useSignature";
import MainButton from "./MainButton";
/**
 * Signature Component
 *
 * @param {function(): void} onClose - 서명 완료 동작이 수행되고 나면, 바텀시트가 닫히도록 지정하는 함수
 * @param {string} userRole - 서명하는 사용자의 역할 ("CLIENT" 또는 "FREELANCER")
 */
const Signature = ({ onClose }) => {
  const { signatureRef, clearSignature, saveSignature } = useSignature();
  const handleSaveAndClose = async () => {
    // 1. 서버 통신 없이 로컬 스토어에 서명 데이터만 저장합니다.
    const isSaved = await saveSignature();

    // 2. 저장에 성공하면 바텀시트를 닫습니다.
    if (isSaved) {
      onClose();
    }
  };
  return (
    <div className="relative rounded-lg p-4 mt-3 ">
      <span className="absolute top-10 left-11 pretendard-semibold-16 text-basic-400">
        서명란
      </span>
      {/* Signature Canvas 영역 */}
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{
          className: "bg-basic-200 rounded-lg w-full h-[15rem]",
        }}
      />
      {/* 버튼 영역 */}
      <div className="w-full flex gap-[1rem] justify-between my-9">
        <MainButton
          text="수정"
          onClick={clearSignature}
          theme="gray"
          isFullWidth={true}
        ></MainButton>
        <MainButton
          text="서명완료"
          onClick={handleSaveAndClose}
          isFullWidth={true}
        ></MainButton>
      </div>
    </div>
  );
};
export default Signature;
