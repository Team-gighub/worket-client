// pg 뷰에 보내져야할 데이터들 저장하는 store
import { create } from "zustand";

export const usePgStore = create((set) => ({
  payload: {
    marchantId: "",
    userName: "",
    productName: "",
    amount: 0,
    orderNo: "",
    payerInfo: {
      accountNo: "",
      bankCode: "",
      name: "",
      phone: "",
    },
    payeeInfo: {
      accountNo: "",
      bankCode: "",
      name: "",
      phone: "",
    },
    successUrl: "",
    failUrl: "",
  },
  setPgStore: (payload) =>
    set((state) => ({
      ...state,
      payload: payload,
    })),

  setField: (key, value) =>
    set((state) => ({
      payload: {
        ...state.payload,
        [key]: value,
      },
    })),

  setPayerInfo: (data) =>
    set((state) => ({
      payload: {
        ...state.payload,
        payerInfo: {
          ...state.payload.payerInfo,
          ...data,
        },
      },
    })),

  setPayeeInfo: (data) =>
    set((state) => ({
      payload: {
        ...state.payload,
        payeeInfo: {
          ...state.payload.payeeInfo,
          ...data,
        },
      },
    })),

  reset: () =>
    set(() => ({
      payload: {
        marchantId: "",
        userName: "",
        productName: "",
        amount: 0,
        orderNo: "",
        payerInfo: {
          accountNo: "",
          bankCode: "",
          name: "",
          phone: "",
        },
        payeeInfo: {
          accountNo: "",
          bankCode: "",
          name: "",
          phone: "",
        },
        successUrl: "",
        failUrl: "",
      },
    })),
}));
