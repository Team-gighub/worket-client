"use client";
import axios from "axios";

export const createPgApiInstance = (transactionId = "") => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PG_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      console.error("[pg API Error]", err.response);

      return Promise.reject(err.response?.data || new Error(err.message));
    },
  );

  return instance;
};
