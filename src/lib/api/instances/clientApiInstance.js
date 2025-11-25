"use client";
import axios from "axios";

export const createClientAxiosInstance = () => {
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
            window.location.href = "/login";
        }
      }

      if (err.response?.status === 403) {
        console.log(err.response.data.customCode === "AUTH_2001");
        switch (err.response.data.customCode) {
          case "ACCESS_3001":
            return err.response;
          case "AUTH_2001":
            window.location.href = "/signup";
            return;
          case "AUTH_3001":
            window.location.href = "/passcode";
            return;
          default:
            return Promise.reject(err.response?.data || new Error(err.message));
        }
      }

      return Promise.reject(err.response?.data || new Error(err.message));
    },
  );

  return instance;
};
