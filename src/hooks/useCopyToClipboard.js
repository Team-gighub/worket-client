import { useState, useCallback } from "react";

/**
 * 클립보드에 텍스트를 복사하는 기능을 제공하는 커스텀 훅입니다.
 * @returns [isCopied, copy]
 */
const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (textToCopy) => {
    if (!navigator.clipboard) {
      // ⚠️ 클립보드 API를 지원하지 않는 환경 (구형 브라우저 등)
      alert("이 브라우저에서는 클립보드 복사를 지원하지 않습니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      // 1.5초 후 상태를 초기화하여 사용자에게 복사 완료 피드백을 줍니다.
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      setIsCopied(false);
    }
  }, []);

  return [isCopied, copy];
};

export default useCopyToClipboard;
