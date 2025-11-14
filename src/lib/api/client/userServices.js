import { createClientAxiosInstance } from "@/lib/api/clientApiInstance";

const axios = createClientAxiosInstance();

/** 사용자 등록/업데이트 (POST /users/:userId) */
const postUsers = (userId, payload) => axios.post(`/users/${userId}`, payload);

/** 특정 사용자 조회 (GET /users/:userId) */
const getUsers = (userId) => axios.get(`/users/${userId}`);

export { postUsers, getUsers };
