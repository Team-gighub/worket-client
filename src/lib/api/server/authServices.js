//server API

import { createServerAxiosInstance } from "../instances/serverApiInstance";

/** 로그아웃 (POST /auth/logout) */
const postLogout = async () => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.post(`/auth/logout`);
};

/** 카카오토큰 재발급 (POST /auth/token/refresh) */
const postRefreshToken = async () => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.post(`/auth/token/refresh`);
};

/** 회원 탈퇴 (POST /auth/unlink) */
const postUnlink = async () => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.post(`/auth/unlink`);
};

/** 간편 비밀번호 등록 (POSt /auth/passcode/register) 
[payload 예시]
payload = {
  passcode: "123456",
};
*/
const postPasscodeRegister = async () => {
  const serverInstance = await createServerAxiosInstance(payload);
  return serverInstance.post(`/auth/passcode/register`, payload);
};

/** 간편 비밀번호 검증 (POST /auth/passcode/verify) 
[payload 예시]
payload = {
  passcode: "123456",
};
*/
const postPasscodeVerify = async (payload) => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.post(`/auth/passcode/verify`, payload);
};

export {
  postLogout,
  postPasscodeRegister,
  postPasscodeVerify,
  postRefreshToken,
  postUnlink,
};
