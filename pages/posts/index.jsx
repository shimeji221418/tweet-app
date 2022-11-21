import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase";
import { getPosts } from "../../lib/api/post";

const Posts = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        const res = await getPosts(config);
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      {!loading &&
        posts.map((post) => {
          return (
            <ul key={post.id}>
              <li>
                {post.title} by:{post.user.name}
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default Posts;
