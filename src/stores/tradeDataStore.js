// stores/tradeDataStore.js

import { create } from "zustand";

// 초기 상태는 null 또는 빈 객체로 설정하여 데이터 로딩 전 상태 나타냄
const initialTradeData = null;

export const useTradeDataStore = create((set) => ({
  // [tradeData] 거래 데이터 상태
  tradeData: initialTradeData,

  // [setTradeData] 데이터 주입 액션 (Hydrator에서 호출)
  setTradeData: (data) => set({ tradeData: data }),

  // 3. [updateTradeStatus] (선택 사항) 거래 상태 업데이트 액션 (클라이언트에서 서명 완료 등 시 호출)
  updateTradeStatus: (newStatus) =>
    set((state) => ({
      tradeData: {
        ...state.tradeData,
        status: newStatus,
      },
    })),

  // 4. [resetTradeData] (선택 사항) 상태 리셋 액션
  resetTradeData: () => set({ tradeData: initialTradeData }),
}));
