/** client API */

import axios from "axios";
import { createClientAxiosInstance } from "../instances/clientApiInstance";

const clientInstance = createClientAxiosInstance();

/** 거래 전체 조회 (GET /transactions) */
const getTransactions = (year, month) => {
  return clientInstance.get(`/transactions?year=${year}&month=${month}`);
};

/** 거래 상세 조회 (GET /transactions/{transactionId}) */
const getTransactionsDetail = (transactionId) => {
  const instance = createClientAxiosInstance(
    role === "CLIENT" ? transactionId : "",
  );
  return instance.get(`/transactions/${transactionId}`);
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
const getTransactionsPermissions = (transactionId) => {
  return clientInstance.get(`/transactions/${transactionId}/permissions`);
};

export {
  getTransactions,
  getTransactionsDetail,
  getTransactionsPreview,
  getTransactionsPermissions,
};
