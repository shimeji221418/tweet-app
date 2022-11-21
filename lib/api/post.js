import { client2 } from "./client";

export const getPosts = (config) => {
  return client2.get("/", config);
};

export const getSelectPost = (id) => {
  return client2.get(`${id}`);
};
