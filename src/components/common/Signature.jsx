"use client";
import SignatureCanvas from "react-signature-canvas";
import useSignature from "../../hooks/useSignature";
import DualButtons from "./DualButtons";
import MainButton from "./MainButton";
import { postContractsSignatures } from "@/lib/api/client/contractServices";
/**
 * Signature Component
 *
 * @param {function(): void} onClose - 서명 완료 동작이 수행되고 나면, 바텀시트가 닫히도록 지정하는 함수
 * @param {function(): Promise<string>} getPresignedUrl - 서버에서 S3 업로드용 presigned URL을 받아오는 비동기 함수
 */
const Signature = ({ onClose }) => {
  const { signatureRef, clearSignature, saveSignature } = useSignature(onClose);
  const saveSignatureAndPost = async () => {
    const signUrl = await saveSignature();
    const contractId = sessionStorage.getItem("contractId");
    postContractsSignatures(contractId, signUrl);
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
          className: "bg-basic-200 rounded-lg w-full h-[150px]",
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
