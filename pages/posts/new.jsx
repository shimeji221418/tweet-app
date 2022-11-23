import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormButton from "../../components/atoms/button/FormButton";
import InputForm from "../../components/atoms/InputForm";
import TextArea from "../../components/atoms/TextArea";
import { app } from "../../firebase";
import { createPost } from "../../lib/api/post";
import { getUsers } from "../../lib/api/user";

const New = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({
    title: "",
    body: "",
    user_id: "",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setPost({ ...post, [name]: value });
  };

  const handleonSubmit = async () => {
    try {
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };
      const loginUser = user.find((user) => user.uid === currentUser.uid);
      const id = loginUser.id;
      setPost({ ...post, user_id: id });
      console.log(post);
      const res = await createPost(post, config);
      router.push("/posts");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getUserList = async () => {
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        const res = await getUsers(config);
        setUser(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.errors);
      }
    };
    getUserList();
  }, []);

  useEffect(() => {
    const loginUser = user.find((user) => user.uid === auth.currentUser.uid);
    if (loginUser) {
      const id = loginUser.id;
      setPost({ ...post, user_id: id });
      console.log(loginUser.id);
    }
  }, [user]);

  return (
    <>
      <h1>NewPost</h1>
      {!loading && (
        <form onSubmit={handleSubmit(handleonSubmit)}>
          <InputForm
            title="title"
            type="text"
            handleChange={handleChange}
            value={post.title}
          />
          {errors.title && <p>titleを入力してください</p>}
          <TextArea
            title="body"
            handleChange={handleChange}
            value={post.body}
          />
          {errors.title && <p>bodyを入力してください</p>}
          <FormButton type="submit">submit</FormButton>
        </form>
      )}
    </>
  );
};
export default New;
