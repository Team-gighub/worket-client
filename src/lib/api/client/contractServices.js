import { createClientAxiosInstance } from "../instances/clientApiInstance";

const clientInstance = createClientAxiosInstance();

/** 계약서 추출 (POST /contracts/extract)
[payload 예시]
payload = formData // file, message 를 담은 formData형식이여야함
*/
const postContractsExtract = (payload) => {
  return clientInstance.post(`/contracts/extract`, payload);
};

/** 계약서 등록 (POST /contracts)
[payload 예시]
payload = {
  type: "UPLOAD", //"UPLOAD"||"CREATE"
  contractInfo: {
    title: "ㅇㅇ 프로젝트",
    amount: 150000,
    startDate: "2025-12-05",
    endDate: "2025-03-13",
  },
  clientInfo: {
    name: "이영은",
    phone: "010-2815-1244",
  },
  freelancerInfo: {
    name: "김윤서",
    phone: "010-3923-4054",
    account: "135165135845",
    bank: "국민은행",
  },
};
 */
const postContracts = (payload) => {
  return clientInstance.post(`/contracts`, payload);
};

/** 서명 등록 (POST /contracts/${contractId}/signatures)
[payload 예시]
payload = {
  signatureUrl: "https://gifted-colon.org/",
};
*/
const postContractsSignatures = (contractId, payload) => {
  return clientInstance.post(`/contracts/${contractId}/signatures`, payload);
};

export { postContractsExtract, postContracts, postContractsSignatures };
