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
      console.error("[Client API Error]", err);
      if (err.response?.status === 401) {
        if (err.response.data.customCode === "ACCESS_1001") {
          return;
        }
        // 로그인 페이지로 이동
        window.location.href = "/login";
        return;
      }

      if (err.response?.status === 403) {
        if (err.response.data.customCode === "ACCESS_3001") {
          return err.response;
        }
      }

      return Promise.reject(err.response?.data || new Error(err.message));
    },
  );

  return instance;
};
