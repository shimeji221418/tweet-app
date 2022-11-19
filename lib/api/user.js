import { client } from "./client";

export const getUsers = () => {
  return client.get("/");
};

export const getSelectUser = (id) => {
  return client.get(`${id}`);
};
