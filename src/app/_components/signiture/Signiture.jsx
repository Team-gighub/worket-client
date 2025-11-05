"use client";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

/**
 * 🖋️ Signature Component
 *
 * 사용자가 서명한 이미지(png)를 S3에 업로드하고,
 * 업로드된 이미지의 URL을 부모 컴포넌트로 전달하는 컴포넌트입니다.
 *
 * @param {function(string): void} onSave - 업로드 완료 시 S3 URL을 인자로 받아 실행되는 콜백 함수
 * @param {function(): Promise<string>} getPresignedUrl - 서버에서 S3 업로드용 presigned URL을 받아오는 비동기 함수
 */
const Signature = ({ onSave, getPresignedUrl }) => {
  const signatureRef = useRef(null);

  // 캔버스 초기화
  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  // 서명 저장 로직 (저장~업로드)
  const handleSave = async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      alert("서명을 입력해주세요.");
      return;
    }

    const canvas = signatureRef.current.getCanvas();

    // Canvas → Blob 변환
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      // TODO: 아래 요청 부분은 추후 필요에 따라 수정이 필요합니다.
      try {
        const presignedUrl = await getPresignedUrl();
        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          body: blob,
          headers: {
            "Content-Type": "image/png",
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("S3 업로드에 실패했습니다.");
        }

        const fileUrl = presignedUrl.split("?")[0];

        if (onSave) onSave(fileUrl);

        // alert("서명이 성공적으로 업로드되었습니다!");
      } catch (error) {
        console.error("서명 업로드 오류:", error);
        // alert("서명 업로드 중 문제가 발생했습니다. 다시 시도해주세요.");
        // TODO: alret 외 다른 표현 방법 혹은 UI 있는지 검토가 필요합니다.
      }
    }, "image/png");
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
      <div className="flex justify-between gap-10 mb-10 mt-10">
        <button
          onClick={clearSignature}
          className="flex-1 px-4 py-2 pretendard-semibold-16 bg-basic-300 text-basic-100 rounded-lg"
        >
          수정
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 pretendard-semibold-16 bg-primary text-basic-100 rounded-lg"
        >
          서명 완료
        </button>
      </div>
    </div>
  );
};

export default Signature;
