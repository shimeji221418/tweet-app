import { client4 } from "./client";

export const getLike = (params) => {
  return client4.get("/", {
    params: { user_id: params.user_id, post_id: params.post_id },
  });
};

export const createLike = (params) => {
  return client4.post("/", params);
};

export const deleteLike = (id) => {
  return client4.delete(`${id}`);
};

export const countLike = (id) => {
  return client4.get("/count", {
    params: { post_id: id },
  });
};
