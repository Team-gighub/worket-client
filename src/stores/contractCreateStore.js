import { MOCK_CONTRACT, MOCK_CONTRACT_RESET } from "@/constants/mock_contracts";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * 반환값
 * @typedef {Object} ContractCreateStore
 * @property {ContractData} contract 현재 작성 중인 계약 데이터
 * @property {(groupKey: keyof ContractData, fieldKey: string, value: any) => void} setNestedField 중첩된 필드 업데이트 함수
 * @property {(newFields: Object) => void} updateContract 계약 전체 필드 병합 업데이트 함수
 * @property {() => void} reset 계약 데이터를 초기 상태로 리셋하는 함수
 */

export const useContractCreateStore = create(
  persist(
    (set) => ({
      contract: MOCK_CONTRACT_RESET,

      setNestedField: (groupKey, fieldKey, value) =>
        set((state) => ({
          contract: {
            ...state.contract,
            [groupKey]: {
              ...state.contract[groupKey],
              [fieldKey]: value,
            },
          },
        })),
      setFreelancerInfo: (name, phone) =>
        set((state) => ({
          contract: {
            ...state.contract,
            freelancerInfo: {
              ...state.contract.freelancerInfo,
              name: name,
              phone: phone,
            },
          },
        })),
      /**
       * 계약 객체의 최상위 필드를 병합하여 한 번에 업데이트합니다.
       * 예: { contractInfo: { title: '새 제목' }, clientInfo: { name: '새 이름' } }
       */
      updateContract: (newFields) =>
        set((state) => ({
          contract: {
            ...state.contract,
            ...newFields,
          },
        })),

      /** 전체 초기화 */
      reset: () => set(MOCK_CONTRACT_RESET),
    }),
    {
      name: "contract-upload-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ contract: state.contract }),
    },
  ),
);
