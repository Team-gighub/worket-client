import { createServerAxiosInstance } from "../../instances/serverApiInstance";

/** 유저 정보 조회 (GET /users/me) */
const getUsers = async () => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.get(`/users/me`);
};

/** 유저 프로필 생성/갱신 (POST /users/me)
[payload 예시]
payload = {
  birthDate: "2026-09-26", /optional/
  gender: "FEMALE", /optional/
  businessSector: "청소", /optional/
  businessSectorYears: 8, /optional/
  businessRegistrationNumber: "88539684723", /optional/
}
 */
const postUsers = async (payload) => {
  const serverInstance = await createServerAxiosInstance();
  return serverInstance.post(`/users/me`, payload);
};

export { getUsers, postUsers };
