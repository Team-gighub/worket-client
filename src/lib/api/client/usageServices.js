import { createClientAxiosInstance } from "../instances/clientApiInstance";

const clientInstance = createClientAxiosInstance();

/**
 * API 사용량 조회
 */
export const getUsages = (payload) => {
  return clientInstance.get(`api/v1/usages`, payload);
  // return MOCK_USAGE_DATA;
};

/**
 * Mock 데이터를 위한 상수 정의 (HTTP 200 Success Response Body)
 */
const MOCK_USAGE_DATA = {
  status: "success",
  data: {
    totalCount: 12350,
    totalSuccessCount: 11500,
    totalClientErrorCount: 750, // 4XX
    totalServerErrorCount: 100, // 5XX
    estimatedTotalCost: 487.25,
  },
};
