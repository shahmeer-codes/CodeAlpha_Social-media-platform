
import axiosInstance from "./axiosInstance";

export const getPosts = async () => {
  const { data } = await axiosInstance.get("/posts");
  return data;
};

export const createPost = async (postData) => {
  const formData = new FormData();

  formData.append("content", postData.content);

  if (postData.image) {
    formData.append("image", postData.image);
  }

  const { data } = await axiosInstance.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const toggleLike = async (postId) => {
  const { data } = await axiosInstance.put(`/posts/${postId}/like`);
  return data;
};

export const deletePost = async (postId) => {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
  return data;
};
