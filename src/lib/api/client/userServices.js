import { createClientAxiosInstance } from "@/lib/api/clientApiInstance";

const clientInstance = createClientAxiosInstance();

/** 유저 정보 조회 (GET /users/me) */
const getUsers = () => clientInstance.get(`/users/me`);

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
const postUsers = (payload) => clientInstance.post(`/users/me`, payload);

export { postUsers, getUsers };
