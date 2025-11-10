import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * @typedef {Object} ContractData
 * @property {string} title 계약 제목
 * @property {Date|null} start_date 시작일
 * @property {Date|null} end_date 종료일
 * @property {number} amount 계약 금액
 * @property {string} client_name 클라이언트 이름
 * @property {number} client_phone 클라이언트 전화번호
 * @property {number} account_number 프리랜서 계좌번호
 * @property {string} bank 프리랜서 은행명
 * @property {string} freelancer_sign 프리랜서 서명 URL
 */

/**
 * 반환값
 * @typedef {Object} ContractCreateStore
 * @property {ContractData} contract 현재 작성 중인 계약 데이터
 * @property {(key: keyof ContractData, value: any) => void} setField 개별 필드 업데이트 함수
 * @property {() => void} reset 계약 데이터를 초기 상태로 리셋하는 함수
 */

export const useContractCreateStore = create(
  persist(
    (set) => ({
      contract: {
        title: "",
        start_date: null,
        end_date: null,
        amount: 0,
        client_name: "",
        client_phone: 0,
        account_number: 0,
        bank: "",
        freelancer_sign: "",
      },

      /** 개별 필드 업데이트 */
      setField: (key, value) =>
        set((state) => ({
          contract: { ...state.contract, [key]: value },
        })),

      /** 전체 초기화 */
      reset: () =>
        set({
          contract: {
            title: "",
            start_date: null,
            end_date: null,
            amount: 0,
            client_name: "",
            client_phone: 0,
            account_number: 0,
            bank: "",
            freelancer_sign: "",
          },
        }),
    }),
    {
      name: "contract-upload-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ contract: state.contract }),
    },
  ),
);
