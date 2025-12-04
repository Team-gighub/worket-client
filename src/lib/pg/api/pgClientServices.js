import { createPgApiInstance } from "./pgApiInstance";

//pg 서버로 바로 요청하는 api (결제 인증)
export const postPgPaymentAuthorize = (payload) => {
  const clientInstance = createPgApiInstance();
  return clientInstance.post(`api/v1/payment/authorize`, payload);
};
