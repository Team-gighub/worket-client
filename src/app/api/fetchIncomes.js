// 소득 관리 탭에서 보여줄 데이터 패칭 함수
const fetchIncomes = async () => {
  try {
    // TODO: api 연동 필요
    // const response = await fetch(`${process.env.SPRING_API_URL}/incomes/summary`, {
    //   cache: "no-store",
    // });
    //
    // if (!response.ok) {
    //   throw new Error("소득 데이터를 불러올 수 없습니다.");
    // }
    //
    // const res = await response.json();
    //
    // // 구조: { status: "...", data: { ... } }
    // if (res.status != "success" || !res.data) {
    //   throw new Error("올바르지 않은 응답 구조입니다.");
    // }
    //
    // return res.data;

    // --- 테스트용 더미 데이터(실제 response 구조) ---
    const dummyResponse = {
      status: "SUCCESS",
      data: {
        currentYearProfit: { incomes: 12000000, transactions: 600 },
        statistics: [
          { month: "2025-09", incomes: 3000000, transactions: 150 },
          { month: "2025-10", incomes: 4000000, transactions: 200 },
          { month: "2025-11", incomes: 5000000, transactions: 250 },
        ],
      },
    };

    return dummyResponse.data;
  } catch (error) {
    console.error("fetchIncomes error:", error);
    throw new Error("소득 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

export default fetchIncomes;
