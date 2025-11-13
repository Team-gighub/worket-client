import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * 서버 컴포넌트에서 쿠키로부터 토큰을 가져오는 함수입니다.
 * @returns {{ accessToken: string | null, refreshToken: string | null }}
 */
export const getServerAuthTokens = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY) || null;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY) || null;

  return { accessToken, refreshToken };
};
