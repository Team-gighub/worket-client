/**
 * 통합 거래 상태 관리를 위한 Zustand 스토어
 */

import { MOCK_TRANSACTION_DETAIL_RESET } from "@/constants/mock_transactions";
import { create } from "zustand";

// 초기 상태는 null 또는 빈 객체로 설정하여 데이터 로딩 전 상태 나타냄
const initialTradeData = MOCK_TRANSACTION_DETAIL_RESET;

export const useTradeDataStore = create((set) => ({
  data: null,

  // [setTradeData] 데이터 주입 액션 (Hydrator에서 호출)
  setTradeData: (newData) => set({ data: newData }),

  // 3. [updateTradeStatus] (선택 사항) 거래 상태 업데이트 액션 (클라이언트에서 서명 완료 등 시 호출)
  updateTradeStatus: (newStatus) =>
    set((state) => ({
      data: {
        ...state.data,
        status: newStatus,
      },
    })),

  // 4. [resetTradeData] (선택 사항) 상태 리셋 액션
  resetTradeData: () => set({ data: initialTradeData }),
}));
