import { createPgApiInstance } from "./pgApiInstance";

export const postPgPaymentAuthorize = (payload) => {
  console.log(payload);
  const clientInstance = createPgApiInstance();
  return clientInstance.post(`/payment/authorize`, payload);
};
