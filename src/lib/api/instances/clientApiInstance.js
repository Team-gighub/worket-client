"use client";
import axios from "axios";

export const createClientAxiosInstance = (transactionId = "") => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      console.error("[Client API Error]", err.response);

      if (err.response?.status === 401) {
        switch (err.response.data.customCode) {
          case "ACCESS_1001":
            return err.response;
          default:
            if (transactionId) {
              return err.response;
            } else {
              window.location.href = "/login";
            }
        }
      }

      if (err.response?.status === 403) {
        switch (err.response.data.customCode) {
          case "ACCESS_3001":
            return err.response;
          case "AUTH_2001":
            window.location.href = "/signup";
            return;
          case "AUTH_3011":
            window.location.href = "/passcode";
            return;
          case "AUTH_3021":
            if (transactionId) {
              window.location.href = `/trade/passcode/${transactionId}`;
              return;
            }
          default:
            return Promise.reject(err.response?.data || new Error(err.message));
        }
      }

      return Promise.reject(err.response?.data || new Error(err.message));
    },
  );

  return instance;
};
