import { createServerAxiosInstance } from "../instances/serverApiInstance";
const serverInstance = createServerAxiosInstance();

// 특정 계약 수정 요청 상세 조회
const getContractDetail = (modificationId) => {
  return serverInstance.get(`/contract-modifications/${modificationId}`);
  // return (
  //   mockRevisionDetails[modificationId] || {
  //     status: "error",
  //     data: null,
  //   }
  // );
};

// 계약 수정 승인
const postContractModifyApprove = (modificationId) => {
  return serverInstance.post(
    `/contract-modifications/${modificationId}/approve`,
  );
};

export default {
  getContractDetail,
  postContractModifyApprove,
};
