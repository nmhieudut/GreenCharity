import axiosClient from "src/libs/axios";
import Rest from "src/api";

const fetchPosts = async () => {
  try {
    const res = await axiosClient.get(Rest.posts);
    return res.data;
  } catch (err) {
    return err;
  }
};
const createPost = async content => {
  try {
    const res = await axiosClient.post(Rest.posts, { content });
    return res.data;
  } catch (err) {
    return err;
  }
};
const updatePost = async (id, content) => {
  try {
    const res = await axiosClient.put(`${Rest.posts}/${id}`, { content });
    return res.data;
  } catch (err) {
    return err;
  }
};
const deletePost = async id => {
  try {
    const res = await axiosClient.delete(`${Rest.posts}/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

const likePost = async id => {
  try {
    const res = await axiosClient.put(`${Rest.posts}/${id}/like`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const commentPost = async (id, content) => {
  try {
    const res = await axiosClient.post(`${Rest.posts}/${id}/comment`, {
      content
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const searchPosts = async query => {
  try {
    const res = await axiosClient.get(`${Rest.posts}/search?q=${query}`);
    return res.data;
  } catch (err) {
    return err;
  }
};
export {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  searchPosts
};
