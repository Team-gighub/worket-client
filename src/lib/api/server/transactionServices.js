import axios from "axios";
import { createServerAxiosInstance } from "../instances/serverApiInstance";

/** 거래 전체 조회 (GET /transactions) */
const getTransactions = async (year, month) => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.get(`/transactions?year=${year}&month=${month}`);
};

/** 거래 상세 조회 (GET /transactions/{transactionId})
 * client, freelancer 공통 사용 로직이므로 role에 따라 401,403에러 시 분기처리
 */
const getTransactionsDetail = async (transactionId, role = "FREELANCER") => {
  const serverInstance = await createServerAxiosInstance(
    role === "CLIENT" ? transactionId : "",
  );
  return serverInstance.get(`/transactions/${transactionId}`);
};

/** 거래 정보 미리보기 = (GET /transactions/{transactionId}/preview) */
const getTransactionsPreview = async (transactionId) => {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_BASE_URL +
      `/transactions/${transactionId}/preview`,
  );
  return data;
};

/** 거래 접근권한 판단 (GET /transactions/{transactionId}/permissions) */
const getTransactionsPermissions = async (transactionId) => {
  const serverInstance = await createServerAxiosInstance(transactionId);
  return serverInstance.get(`/transactions/${transactionId}/permissions`);
};

export {
  getTransactions,
  getTransactionsDetail,
  getTransactionsPreview,
  getTransactionsPermissions,
};
