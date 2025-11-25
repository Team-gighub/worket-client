import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * @typedef {Object} BankInfo
 * @property {string} id 은행 고유 ID
 * @property {string} label 은행 이름 (예: KB국민)
 * @property {Object} icon 아이콘 정보 { src: string, alt: string }
 */

/**
 * 반환값
 * @typedef {Object} PaymentStore
 * @property {string|null} selectedBankId 현재 선택된 은행 ID
 * @property {BankInfo|null} selectedBankInfo 현재 선택된 은행의 전체 정보
 * @property {(bankId: string, bankInfo: BankInfo) => void} selectBank 은행 선택 함수
 * @property {() => void} reset 선택 정보를 초기 상태로 리셋하는 함수
 */

export const usePaymentStore = create(
  persist(
    (set) => ({
      // 1. 상태 (State)
      // 1. 상태 초기값
      selectedBankId: null,
      selectedBankInfo: {
        id: null,
        label: null,
        icon: {
          src: null,
          alt: null,
        },
      },
      selectedAccount: null,

      // 2. 액션: 은행 선택 (selectBank)
      selectBank: (bankId, bankInfo) =>
        set({
          // selectedBankId 필드 업데이트 (선택 사항)
          selectedBankId: bankId,

          // selectedBankInfo 필드 업데이트
          selectedBankInfo: {
            id: bankId, // ID를 명확히 저장
            label: bankInfo.label, // 레이블 저장
            icon: {
              src: bankInfo.icon.src, // 아이콘 src 저장
              alt: bankInfo.icon.alt, // 아이콘 alt 저장
            },
          },
        }),

      selectAccount: (bankAccount) => {
        set({
          selectedAccount: bankAccount,
        });
      },
      /**
       * 3. 액션: 전체 초기화 (reset)
       * useContractCreateStore와 동일한 형태로 초기 상태로 되돌립니다.
       */
      reset: () =>
        set({
          selectedBankId: null,
          selectedBankInfo: {
            id: null, // ID를 명확히 저장
            label: null, // 레이블 저장
            icon: {
              src: null, // 아이콘 src 저장
              alt: null, // 아이콘 alt 저장
            },
          }, // selectedBankInfo도 초기 객체 구조로 리셋
          selectedAccount: null, // ⭐️ 리셋 로직 추가 ⭐️
        }),
    }),
    {
      // Persist 옵션
      name: "payment-selection-store", // 저장소에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용

      // 저장할 필드 지정
      partialize: (state) => ({
        selectedBankId: state.selectedBankId,
        selectedBankInfo: state.selectedBankInfo,
        selectedAccount: state.selectedAccount,
      }),
    },
  ),
);
