import { client, client3 } from "./client";

export const getUsers = (config) => {
  return client.get("/", config);
};

export const getSelectUser = (id, config) => {
  return client.get(`${id}`, config);
};

export const updateUser = (id, params, config) => {
  return client.patch(`${id}`, params, config);
};

export const deleteSelectUser = (id, config) => {
  return client.delete(`${id}`, config);
};

export const signUpUser = (config) => {
  return client3.post("/", config);
};
