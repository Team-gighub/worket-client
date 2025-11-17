import { create } from "zustand";

// 목데이터 - 월별로 다른 데이터 반환
const getMockData = (year, month) => {
  // 11월 목데이터
  if (month === 11) {
    return {
      userName: "홍길동",
      totalAmount: 400000,
      statusCounts: [
        { status: "CREATED", count: 2 },
        { status: "SIGNED", count: 2 },
        { status: "SETTLED", count: 2 },
        { status: "DEPOSIT_HOLD", count: 1 },
      ],
      contractList: [
        {
          id: 1,
          status: "CREATED",
          amount: 100000,
          startDate: "2025-11-05",
          endDate: "2025-11-06",
          title: "11월 계약건 1",
        },
        {
          id: 2,
          status: "DEPOSIT_HOLD",
          amount: 250000,
          startDate: "2025-11-15",
          endDate: null,
          title: "11월 프로젝트 2",
        },
        {
          id: 3,
          status: "SIGNED",
          amount: 150000,
          startDate: "2025-11-01",
          endDate: "2025-11-30",
          title: "11월 프로젝트 A",
        },
        {
          id: 4,
          status: "SETTLED",
          amount: 200000,
          startDate: "2025-11-10",
          endDate: "2025-11-20",
          title: "11월 프로젝트 B",
        },
      ],
    };
  }

  // 10월 목데이터
  if (month === 10) {
    return {
      userName: "홍길동",
      totalAmount: 550000,
      statusCounts: [
        { status: "CREATED", count: 1 },
        { status: "SIGNED", count: 3 },
        { status: "SETTLED", count: 3 },
        { status: "DEPOSIT_HOLD", count: 0 },
      ],
      contractList: [
        {
          id: 5,
          status: "CREATED",
          amount: 120000,
          startDate: "2025-10-01",
          endDate: "2025-10-15",
          title: "10월 웹사이트 개발",
        },
        {
          id: 6,
          status: "SIGNED",
          amount: 180000,
          startDate: "2025-10-05",
          endDate: "2025-10-25",
          title: "10월 앱 디자인",
        },
        {
          id: 7,
          status: "SIGNED",
          amount: 200000,
          startDate: "2025-10-10",
          endDate: "2025-10-30",
          title: "10월 백엔드 개발",
        },
        {
          id: 8,
          status: "SETTLED",
          amount: 300000,
          startDate: "2025-10-01",
          endDate: "2025-10-20",
          title: "10월 컨설팅 프로젝트",
        },
      ],
    };
  }

  // 기타 월 - 빈 데이터
  return {
    userName: "홍길동",
    totalAmount: 0,
    statusCounts: [
      { status: "CREATED", count: 0 },
      { status: "SIGNED", count: 0 },
      { status: "SETTLED", count: 0 },
      { status: "DEPOSIT_HOLD", count: 0 },
    ],
    contractList: [],
  };
};

export const useTransactionStore = create((set, get) => ({
  // 현재 선택된 월
  selectedMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },

  // 거래 데이터 (초기값 null - 데이터 없음을 명확히 표시)
  transactionData: null,

  // 월별 캐시 { "2024-11": {...}, "2024-10": {...} }
  cache: {},

  // 월 변경 (캐시 확인 후 필요시 fetch)
  setSelectedMonth: async (month) => {
    const key = `${month.year}-${month.month}`;
    const cachedData = get().cache[key];

    // 캐시에 있으면 즉시 사용
    if (cachedData) {
      set({
        selectedMonth: month,
        transactionData: cachedData,
      });
      return;
    }

    // 캐시에 없으면 fetch
    await get().fetchTransactions(month);
  },

  // API에서 거래 데이터 가져오기
  fetchTransactions: async (month) => {
    try {
      // TODO: 실제 API 연동 시 주석 해제
      // const res = await fetch(
      //   `http://localhost:8080/transactions?year=${month.year}&month=${month.month}`,
      //   { cache: "no-store" }
      // );
      // if (!res.ok) throw new Error("Failed to fetch transactions");
      // const response = await res.json();
      // const data = response.data;

      // 개발 중: 목데이터 사용
      const data = getMockData(month.year, month.month);
      const key = `${month.year}-${month.month}`;

      // 데이터 저장 + 캐시에 저장
      set((state) => ({
        selectedMonth: month,
        transactionData: data,
        cache: { ...state.cache, [key]: data },
      }));
    } catch (err) {
      console.error("거래 데이터를 불러오는 데 실패했습니다:", err);
    }
  },

  // Store에 현재 월 데이터가 있는지 확인
  hasCurrentMonthData: () => {
    const { selectedMonth, cache } = get();
    const key = `${selectedMonth.year}-${selectedMonth.month}`;
    return !!cache[key];
  },

  // 필터 관리
  selectedFilter: "all",
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),

  // Dashboard에서 초기 데이터 주입할 때 사용
  hydrateData: (month, data) => {
    const key = `${month.year}-${month.month}`;
    set({
      selectedMonth: month,
      transactionData: data,
      cache: { ...get().cache, [key]: data },
    });
  },
}));
