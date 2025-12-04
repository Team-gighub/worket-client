import { createClientAxiosInstance } from "../instances/clientApiInstance";

const clientInstance = createClientAxiosInstance();

// 계약 수정 요청 목록 조회
const getContractList = () => {
  return clientInstance.get(`/contract-modifications`);
};

// 특정 계약 수정 요청 상세 조회
const getContractDetail = (modificationId) => {
  return clientInstance.get(`/contract-modifications/${modificationId}`);
};

// 계약 수정 승인
export const postContractModifyApprove = (modificationId, body) => {
  // console.log("postContractModifyApprove called with:", modificationId, body);
  return clientInstance.post(
    `/contract-modifications/${modificationId}/apply`,
    body,
  );
};

export default {
  getContractList,
  getContractDetail,
};
