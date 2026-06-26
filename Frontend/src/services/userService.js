
import axiosInstance from "./axiosInstance";

export const getUserProfile = async (userId) => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};

export const toggleFollow = async (userId) => {
  const { data } = await axiosInstance.put(`/users/${userId}/follow`);
  return data;
};
