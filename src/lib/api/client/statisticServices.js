// client API

import { createClientAxiosInstance } from "../instances/clientApiInstance";

const clientInstance = createClientAxiosInstance();

/** 통계 조회 (GET /statistics) */
const getStatistics = () => {
  return clientInstance.get(`/statistics`);
};

/** 사용자 통계 조회 (GET /user-statics) */
const getUserStatistics = () => {
  return clientInstance.get(`/user-statics`);
};
export { getStatistics, getUserStatistics };
