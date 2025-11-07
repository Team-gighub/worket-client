import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @typedef {Object} ClientTradeState
 * @property {string|null} status 거래 상태 (CREATED, SIGNED, DEPOSIT_HOLD, PAYMENT_CONFIRMED, SETTLED)
 * @property {boolean} isLoading 로딩 여부
 * @property {string|null} error 에러 메시지
 * @property {(tradeId: string) => Promise<void>} fetchStatus 거래 상태를 서버에서 불러오는 함수
 * @property {(status: string) => void} setStatus 거래 상태를 수동으로 변경하는 함수
 */

export const useClientTradeStatusStore = create(
  persist(
    (set) => ({
      status: null, // 초기값 null : 불러오기 전엔 로딩
      isLoading: false,
      error: null,

      /** TODO: 거래 상태를 서버에서 가져오기 (현재는 임시 더미 데이터로 동작) */
      fetchStatus: async (tradeId) => {
        set({ isLoading: true, error: null });
        try {
          console.log(`Fetching trade status for tradeId: ${tradeId}`);

          await new Promise((resolve) => setTimeout(resolve, 500));

          const dummyStatusMap = {
            1: "CREATED",
            2: "SIGNED",
            3: "DEPOSIT_HOLD",
            4: "PAYMENT_CONFIRMED",
            5: "SETTLED",
          };

          const status = dummyStatusMap[tradeId] || "CREATED"; // 기본값

          set({ status, isLoading: false });
        } catch (err) {
          set({
            error: err?.message || "거래 상태를 불러오는 데 실패했습니다.",
            isLoading: false,
          });
        }
      },

      /** 상태 직접 변경 */
      setStatus: (status) => set({ status }),
    }),
    {
      name: "client-trade-status-store",
      partialize: (state) => ({ status: state.status }),
    },
  ),
);
