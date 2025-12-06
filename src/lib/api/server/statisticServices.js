// server API

import { createServerAxiosInstance } from "../instances/serverApiInstance";

/** 통계 조회 (GET /statistics) */
const getStatistics = async () => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.get(`/statistics`);
};

export { getStatistics };
