import { createPgApiInstance } from "./pgApiInstance";

export const postPgPaymentAuthorize = (payload) => {
  const clientInstance = createPgApiInstance();
  return clientInstance.post(`/payment/authorize`, payload);
};

export const postPgPaymentApproval = (payload) => {
  console.log(payload);
  const clientInstance = createPgApiInstance();
  return clientInstance.post(`/payment/approval`, payload);
};
