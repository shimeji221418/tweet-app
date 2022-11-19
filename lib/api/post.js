import { client2 } from "./client";

export const getPosts = () => {
  return client2.get("/");
};

export const getSelectPost = (id) => {
  return client2.get(`${id}`);
};
