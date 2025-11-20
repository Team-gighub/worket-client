import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createServerAxiosInstance = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      console.error("[Server API Error]", err);

      if (err.response?.status === 401) {
        if (err.response.data.customCode === "ACCESS_1001") {
          return err.response;
        }
        //401에러 시 /login으로 리다이랙트
        redirect("/login");
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
