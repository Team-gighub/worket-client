import { useCallback, useRef } from "react";
import { getPresignedUrl, uploadToS3 } from "@/lib/api/client/uploadServices";
import { postContractsSignatures } from "@/lib/api/client/contractServices";
import md5 from "js-md5";
import { useSignatureStore } from "@/stores/signatureStore";

const useSignature = (onClose) => {
  const signatureRef = useRef(null);

  // Store에서 상태와 액션 가져오기
  const {
    signUrl,
    isUploading,
    error,
    setSignUrl,
    setIsUploading,
    setError,
    clearSignature: clearSignatureStore,
  } = useSignatureStore();

  // MD5 계산 (유틸 함수)
  const calculateMD5Base64 = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const md5Hex = md5(arrayBuffer);
    const md5Bytes = new Uint8Array(
      md5Hex.match(/.{2}/g).map((h) => parseInt(h, 16)),
    );
    return btoa(String.fromCharCode(...md5Bytes));
  };

  // 캔버스 초기화
  const clearSignature = useCallback(() => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  }, []);

  // 서명 저장 및 업로드
  const saveSignature = useCallback(
    async (contractId, signer) => {
      if (!signatureRef.current || signatureRef.current.isEmpty()) {
        alert("서명을 입력해주세요.");
        return false;
      }

      setIsUploading(true);
      setError(null);

      try {
        const canvas = signatureRef.current.getCanvas();
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png"),
        );

        if (!blob) {
          throw new Error("캔버스에서 Blob 데이터를 가져오는 데 실패했습니다.");
        }

        // 파일명 생성
        const timestamp = new Date().toISOString();
        const filename = `${contractId}/${signer}-signature-${timestamp}.png`;

        // MD5 계산
        const md5Base64 = await calculateMD5Base64(blob);

        // Presigned URL 요청
        const response = await getPresignedUrl(
          filename,
          "image/png",
          md5Base64,
        );
        const presignedUrl = JSON.parse(response.data.body).url;

        // S3 업로드
        await uploadToS3(presignedUrl, blob, md5Base64);

        const fileUrl = presignedUrl.split("?")[0];

        // Store에 저장
        setSignUrl(fileUrl);
        setIsUploading(false);

        console.log("✅ Signature uploaded:", fileUrl);

        // 모달 닫기
        setTimeout(() => onClose?.(), 0);

        return true;
      } catch (error) {
        console.error("❌ Upload error:", error);
        setError(error.message);
        setIsUploading(false);
        alert("서명 업로드 중 오류가 발생했습니다.");
        return false;
      }
    },
    [setSignUrl, setIsUploading, setError, onClose],
  );

  // 서명 URL 서버 전송
  const fetchSignUrl = useCallback(
    async (contractId) => {
      if (!signUrl) {
        console.error("❌ SignUrl is not available");
        alert("서명 URL이 준비되지 않았습니다. 먼저 서명을 완료해주세요.");
        return false;
      }

      try {
        console.log("🚀 Submitting signature URL:", signUrl);
        await postContractsSignatures(contractId, { signatureUrl: signUrl });
        console.log("✅ Signature URL submitted successfully");
        return true;
      } catch (error) {
        console.error("❌ Submit error:", error);
        setError(error.message);
        alert("서명 전송 중 오류가 발생했습니다.");
        return false;
      }
    },
    [signUrl, setError],
  );

  return {
    // Refs
    signatureRef,

    // State
    signUrl,
    isUploading,
    error,

    // Actions
    clearSignature,
    saveSignature,
    fetchSignUrl,
    clearSignatureStore,
  };
};

export default useSignature;
