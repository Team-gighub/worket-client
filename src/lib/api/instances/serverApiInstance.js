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
      console.error("[Server API Error]", err.response);

      if (err.response?.status === 401) {
        switch (err.response.data.customCode) {
          case "ACCESS_1001":
            return err.response;
          default:
            redirect("/login");
        }
      }

      if (err.response?.status === 403) {
        switch (err.response.data.customCode) {
          case "ACCESS_3001":
            return err.response;
          case "AUTH_2001":
            redirect("/signup");
          case "AUTH_3001":
            redirect("/passcode");
          default:
            return Promise.reject(err.response?.data || new Error(err.message));
        }
      }

      return Promise.reject(err.response?.data || new Error(err.message));
    },
  );

  return instance;
};
