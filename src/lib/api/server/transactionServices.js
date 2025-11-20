import axios from "axios";
import { createServerAxiosInstance } from "../instances/serverApiInstance";

/** 거래 전체 조회 (GET /transactions) */
const getTransactions = async (year, month) => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.get(`/transactions?year=${year}&month=${month}`);
};

/** 거래 상세 조회 (GET /transactions/{transactionId}) */
const getTransactionsDetail = async (transactionId) => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.get(`/transactions/${transactionId}`);
};

/** 거래 정보 미리보기 = (GET /transactions/{transactionId}/preview) */
const getTransactionsPreview = async (transactionId) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/transactions/${transactionId}/preview`,
    );
    return data;
  } catch (err) {
    //TODO: 에러 형식 정해지면 수정하기
    return err;
  }
};

/** 거래 접근권한 판단 (GET /transactions/{transactionId}/permissions) */
const getTransactionsPermissions = async (transactionId) => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.get(`/transactions/${transactionId}/permissions`);
};

export {
  getTransactions,
  getTransactionsDetail,
  getTransactionsPreview,
  getTransactionsPermissions,
};
