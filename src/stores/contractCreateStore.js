import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * @typedef {Object} ContractUploadData
 * @property {string} title
 * @property {number} amount
 * @property {string} client_name
 * @property {string} client_phone
 * @property {string} freelancer_sign
 */

export const useContractCreateStore = create(
  persist(
    (set) => ({
      contract: {
        title: "",
        amount: 0,
        client_name: "",
        client_phone: "",
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
            amount: 0,
            client_name: "",
            client_phone: "",
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
