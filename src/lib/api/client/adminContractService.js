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
  console.log("postContractModifyApprove called with:", modificationId, body);
  return clientInstance.post(
    `/contract-modifications/${modificationId}/apply`,
    body,
  );
};

// 수정 요청 상세 조회 스펙에 맞는 Mock 데이터
const mockRevisionDetails = {
  101: {
    status: "success",
    data: {
      freelancerInfoDto: {
        name: "이동현",
        phone: "010-4444-5555",
        account: "111-22-333333",
        bank: "국민은행",
      },
      clientInfoDto: { name: "ABC 주식회사", phone: "02-1234-5678" },
      contractInfoDto: {
        title: "프론트엔드 개발 계약서 수정 요청",
        amount: "1500000",
        startDate: "2025-12-01",
        endDate: "2025-12-31",
      },
      content:
        "계약 금액을 130만원에서 150만원으로 수정 요청합니다. 확인 부탁드립니다.",
      originalPdf:
        "https://s3-worket-bucket.s3.ap-northeast-2.amazonaws.com/contracts-temp/1/contract.pdf",
    },
  },
  // 다른 ID에 대한 상세 데이터를 필요에 따라 추가할 수 있습니다.
};

export default {
  getContractList,
  getContractDetail,
};
