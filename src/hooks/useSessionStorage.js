"use client";
import { useState } from "react";

/**
 * Session Storage에서 데이터를 읽고 쓰는 커스텀 훅
 * @param {string} key Session Storage에 저장된 키 (여기서는 'ocrResult')
 * @param {any} initialValue 초기값
 */
const useSessionStorage = (key, initialValue) => {
  // 상태를 초기화하는 함수를 정의
  // 이 함수는 초기 렌더링 시 한 번만 실행
  const [storedValue, setStoredValue] = useState(() => {
    // 1. 서버(SSR) 환경에서는 window 객체가 없으므로 초기값을 반환
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // 2. 클라이언트 환경에서 Session Storage에서 해당 키의 값을 가져옴
      const item = window.sessionStorage.getItem(key);
      // 3. JSON.parse를 통해 객체로 변환하여 반환
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 에러 발생 시 초기값을 사용
      console.error("Error reading sessionStorage:", error);
      return initialValue;
    }
  });

  // 상태가 변경될 때마다 Session Storage를 업데이트
  const setValue = (value) => {
    try {
      // Function을 전달받으면 이전 값을 이용해 새로운 값을 계산
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // 상태를 업데이트
      setStoredValue(valueToStore);

      // Session Storage에 저장
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error setting sessionStorage:", error);
    }
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
