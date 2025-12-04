import { createClientAxiosInstance } from "../instances/clientApiInstance";

//worket 서버를 통해서 전달되는 API (결제 승인)
export const postPgPaymentApproval = (payload) => {
  const clientInstance = createClientAxiosInstance();
  return clientInstance.post(`/payment/approval`, payload);
};

//worket 서버를 통해서 전달되는 API (지급 확정)
export const postPgPaymentConfirm = (payload) => {
  const clientInstance = createClientAxiosInstance();
  return clientInstance.post(`/payment/confirm`, payload);
};
