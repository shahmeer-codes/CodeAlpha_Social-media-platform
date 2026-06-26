
import axiosInstance from "./axiosInstance";

export const getComments = async (postId) => {
  const { data } = await axiosInstance.get(`/comments/${postId}`);
  return data;
};

export const createComment = async (postId, text) => {
  const { data } = await axiosInstance.post(`/comments/${postId}`, {
    text,
  });

  return data;
};

export const deleteComment = async (commentId) => {
  const { data } = await axiosInstance.delete(`/comments/${commentId}`);
  return data;
};
