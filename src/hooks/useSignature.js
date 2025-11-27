import { useCallback, useRef } from "react";
import { getPresignedUrl, uploadToS3 } from "@/lib/api/client/uploadServices";
import { postContractsSignatures } from "@/lib/api/client/contractServices";
import md5 from "js-md5";
import { useSignatureStore } from "@/stores/signatureStore";

const useSignature = () => {
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
    setTempPreviewUrl,
    setTempSignatureData,
    clearTempPreviewUrl,
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

  // 1. 캡처 및 임시 저장
  const saveSignature = useCallback(async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      alert("서명을 입력해주세요.");
    }

    setError(null);

    try {
      const canvas = signatureRef.current.getCanvas();
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );

      if (!blob) {
        throw new Error("캔버스에서 Blob 데이터를 가져오는 데 실패했습니다.");
      }

      const previewUrl = URL.createObjectURL(blob);
      setTempPreviewUrl(previewUrl);

      // Blob 데이터를 Base64로 변환하여 임시 저장
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      await new Promise((resolve) => {
        reader.onloadend = () => {
          // "data:image/png;base64,..." 형태에서 데이터 부분만 저장
          const base64Data = reader.result.split(",")[1];
          setTempSignatureData(base64Data);
          resolve();
        };
      });
    } catch (error) {
      console.error("❌ Save signature error:", error);
      setError(error.message);
      alert("서명 캡처 중 오류가 발생했습니다.");
    }
  }, [setError, setTempPreviewUrl, setTempSignatureData]);

  // 2. S3 업로드 및 서버 POST
  const postSignature = useCallback(
    async (contractId, signer, base64Data) => {
      if (!base64Data) {
        console.error("❌ Base64 data is not available");
      }

      setIsUploading(true);
      setError(null);

      try {
        const blob = await (
          await fetch(`data:image/png;base64,${base64Data}`)
        ).blob();
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
        const presignedUrl = response.data.url;

        // S3 업로드
        await uploadToS3(presignedUrl, blob, md5Base64);

        const fileUrl = presignedUrl.split("?")[0];

        // 서명 URL 서버 전송
        await postContractsSignatures(contractId, { signatureUrl: fileUrl });

        // 서버에 저장 완료 후 스토어 초기화 및 URL 설정
        setSignUrl(fileUrl);
        clearSignatureStore(); // 서명 관련 모든 임시 상태 초기화
        clearTempPreviewUrl();
      } catch (error) {
        setError(error.message);

        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [
      setIsUploading,
      setError,
      setSignUrl,
      clearSignatureStore,
      clearTempPreviewUrl,
    ],
  );
  const fetchSignUrl = useCallback(async (contractId) => {
    return true;
  }, []);
  return {
    // Refs
    signatureRef,

    // State
    signUrl,
    isUploading,
    error,

    // Actions
    clearSignature,
    saveSignature, // 캡처 후 임시 저장
    postSignature, // S3 업로드 및 서버 POST
    fetchSignUrl, // (CreateResultPage에서 사용)
    clearSignatureStore,
  };
};
export default useSignature;
