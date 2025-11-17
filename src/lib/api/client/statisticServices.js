// client API

import { createClientAxiosInstance } from "../instances/clientApiInstance";

const clientInstance = createClientAxiosInstance();

/** 통계 조회 (GET /statistics) */
const getStatistics = () => {
  return clientInstance.get(`/statistics`);
};

export { getStatistics };
