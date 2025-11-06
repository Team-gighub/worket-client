import { useCallback, useRef } from "react";

/**
 *
 * useSignature
 * 서명 관리를 위한 여러가지 함수가 정의되어 있습니다.
 *
 * 1. 서명 캔버스 초기화
 * 2. 서명 png화 (blob)
 * 3. 서명 업로드 (blob -> S3)
 * 4. 서명 업로드 후, 저장된 url 반환
 */
const useSignature = (onClose, getPresignedUrl) => {
  // 1. 캔버스 Ref 관리
  const signatureRef = useRef(null);

  // 2. 캔버스 초기화
  const clearSignature = useCallback(() => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  }, []);

  // 3. 서명 저장 및 업로드
  const saveSignature = useCallback(async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      alert("서명을 입력해주세요.");
      return;
    }

    const canvas = signatureRef.current.getCanvas();

    // (1) canvas -> blob 변환
    const uploadPromise = new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(
            new Error("캔버스에서 Blob 데이터를 가져오는 데 실패했습니다."),
          );
          return;
        }

        // (2) S3에 업로드
        try {
          const presignedUrl = await getPresignedUrl();
          const uploadResponse = await fetch(presignedUrl, {
            // TODO: 요청 부분 추후 수정 필요
            method: "PUT",
            body: blob,
            headers: {
              "Content-Type": "image/png",
            },
          });

          if (!uploadResponse.ok) {
            throw new Error(
              `S3 업로드에 실패했습니다. 상태: ${uploadResponse.status}`,
            );
          }

          // (3) S3 URL 추출 및 성공 콜백 호출
          const fileUrl = presignedUrl.split("?")[0];
          // TODO: 업로드 완료 된 URL(fileUrl) 반환 처리 필요
          onClose();
        } catch (error) {
          alert("서명 업로드 중 문제가 발생했습니다. 다시 시도해주세요.");
          reject(error);
        }
      }, "image/png");
    });
  }, [getPresignedUrl]);

  return { signatureRef, clearSignature, saveSignature };
};

export default useSignature;
