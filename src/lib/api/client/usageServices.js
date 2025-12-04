import { createClientAxiosInstance } from "../instances/clientApiInstance";

const clientInstance = createClientAxiosInstance();

/**
 * API 사용량 조회
 */
export const getUsages = (payload) => {
  //   return clientInstance.get(`api/v1/usages`, payload);
  return MOCK_USAGE_DATA;
};

/**
 * Mock 데이터를 위한 상수 정의 (HTTP 200 Success Response Body)
 */
const MOCK_USAGE_DATA = {
  totalCount: 12350,
  totalSuccessCount: 11500,
  totalClientErrorCount: 750, // 4XX
  totalServerErrorCount: 100, // 5XX
  estimatedTotalCost: 487.25,

  // 차트 데이터를 위한 상세 일별 데이터 (선택적 추가)
  //   dailyUsages: [
  //     {
  //       date: "2023-11-01",
  //       count: 400,
  //       success: 380,
  //       clientError: 15,
  //       serverError: 5,
  //     },
  //     {
  //       date: "2023-11-02",
  //       count: 550,
  //       success: 500,
  //       clientError: 40,
  //       serverError: 10,
  //     },
  //     {
  //       date: "2023-11-03",
  //       count: 300,
  //       success: 290,
  //       clientError: 7,
  //       serverError: 3,
  //     },
  // ... 더 많은 날짜 데이터 ...
  //   ],
};
