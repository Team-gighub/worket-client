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
const Signature = ({ onClose, userRole }) => {
  const { signatureRef, clearSignature, saveSignature } = useSignature(onClose);
  const saveSignatureAndPost = async () => {
    const contractId = sessionStorage.getItem("contractId");
    await saveSignature(contractId, userRole);
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
          onClick={saveSignatureAndPost}
          isFullWidth={true}
        ></MainButton>
      </div>
    </div>
  );
};
export default Signature;
