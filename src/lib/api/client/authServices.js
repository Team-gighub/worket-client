//client API

import { createClientAxiosInstance } from "../instances/clientApiInstance";

const clientInstance = createClientAxiosInstance();

/** 로그아웃 (POST /auth/logout) */
const postLogout = () => {
  return clientInstance.post(`/auth/logout`);
};

/** 카카오토큰 재발급 (POST /auth/token/refresh) */
const postRefreshToken = () => {
  return clientInstance.post(`/auth/token/refresh`);
};

/** 회원 탈퇴 (POST /auth/unlink) */
const postUnlink = () => {
  return clientInstance.post(`/auth/unlink`);
};

/** 간편 비밀번호 등록 (POSt /auth/passcode/register) 
[payload 예시]
payload = {
  passcode: "123456",
};
*/
const postPasscodeRegister = (payload) => {
  return clientInstance.post(`/auth/passcode/register`, payload);
};

/** 간편 비밀번호 검증 (POST /auth/passcode/verify) 
[payload 예시]
payload = {
  passcode: "123456",
};
*/
const postPasscodeVerify = (payload) => {
  return clientInstance.post(`/auth/passcode/verify`, payload);
};

export {
  postLogout,
  postPasscodeRegister,
  postPasscodeVerify,
  postRefreshToken,
  postUnlink,
};
