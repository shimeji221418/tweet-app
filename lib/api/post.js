import { client2 } from "./client";

export const getPosts = (config) => {
  return client2.get("/", config);
};

export const getSelectPost = (id, config) => {
  return client2.get(`${id}`, config);
};

export const createPost = (params, config) => {
  return client2.post("/", params, config);
};

export const updatePost = (id, params, config) => {
  return client2.patch(`${id}`, params, config);
};

export const deletePost = (id, config) => {
  return client2.delete(`${id}`, config);
};
