import { useCallback, useRef } from "react";
import { getPresignedUrl } from "@/lib/api/client/uploadServices";
import { uploadToS3 } from "@/lib/api/client/uploadServices";
import md5 from "js-md5";
const useSignature = (onClose) => {
  // TODO: 업로드 시 구조 지정
  const contractId = "0";
  const signer = "a"; // "a" 또는 "b"
  const timestamp = new Date().toISOString();
  const filename = `${contractId}/${signer}-signature-${timestamp}.png`;
  const signatureRef = useRef(null);
  const clearSignature = useCallback(() => {
    if (signatureRef.current) signatureRef.current.clear();
  }, []);
  // MD5 Base64 계산 (js-md5 사용)
  const calculateMD5Base64 = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const md5Hex = md5(arrayBuffer); // ArrayBuffer 직접 사용
    const md5Bytes = new Uint8Array(
      md5Hex.match(/.{2}/g).map((h) => parseInt(h, 16)),
    );
    const md5Base64 = btoa(String.fromCharCode(...md5Bytes));
    return md5Base64;
  };
  const saveSignature = useCallback(async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      alert("서명을 입력해주세요.");
      return;
    }
    const canvas = signatureRef.current.getCanvas();
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    if (!blob) {
      alert("캔버스에서 Blob 데이터를 가져오는 데 실패했습니다.");
      return;
    }
    try {
      // MD5 Base64 계산
      const md5Base64 = await calculateMD5Base64(blob);
      // Presigned URL 요청
      const response = await getPresignedUrl(filename, "image/png", md5Base64);
      const presignedUrl = JSON.parse(response.data.body).url;
      // S3 업로드
      await uploadToS3(presignedUrl, blob, md5Base64);
      const fileUrl = presignedUrl.split("?")[0];
      // TODO: DB 저장
      // const responseDB = await postContractsSignatures(contractId, fileUrl);
      onClose();
      return fileUrl;
    } catch (error) {
      console.error(error);
      alert("서명 업로드 중 오류가 발생했습니다.");
    }
  }, [onClose]);
  return { signatureRef, clearSignature, saveSignature };
};
export default useSignature;
