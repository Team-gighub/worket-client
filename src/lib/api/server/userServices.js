import { createServerAxiosInstance } from "../../instances/serverApiInstance";

const getUsers = async (userId) => {
  const axios = await createServerAxiosInstance();
  return axios.get(`/users/${userId}`);
};

const postUsers = async (userId, payload) => {
  const axios = await createServerAxiosInstance();
  return axios.post(`/users/${userId}`, payload);
};

export { getUsers, postUsers };
