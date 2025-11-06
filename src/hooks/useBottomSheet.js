import { useState, useCallback } from "react";

/**
 * 바텀 시트의 열림/닫힘 상태를 관리하는 커스텀 훅
 * @param {boolean} [initialState=false] - 초기 열림 상태
 * @returns {{
 * isOpen: boolean,
 * open: function(): void,
 * close: function(): void
 * }}
 */
const useBottomSheet = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};

export default useBottomSheet;
