import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/atoms/button/PrimaryButton";
import { app } from "../../firebase";
import { deletePost, getSelectPost } from "../../lib/api/post";

const Post = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [selectPost, setSelectPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (router.isReady) {
          const routeId = router.query.id;
          const currentUser = auth.currentUser;
          const token = await currentUser.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectPost(routeId, config);
          setSelectPost(res.data);
          console.log(res.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getPost();
  }, []);

  const handleDelete = async () => {
    try {
      const routeId = router.query.id;
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };
      const res = await deletePost(routeId, config);
      console.log(res.data);
      router.push("/posts");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Post Show</h1>
      {!loading && <p>{selectPost.body}</p>}
      {selectPost.image && (
        <img
          src={selectPost.image.url}
          alt="selectPostImage"
          width="30%"
          height="30%"
        />
      )}
      {!loading && auth.currentUser.uid === selectPost.user.uid && (
        <PrimaryButton onClick={handleDelete}>delete</PrimaryButton>
      )}
    </>
  );
};

export default Post;
