import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormButton from "../../../components/atoms/button/FormButton";
import InputForm from "../../../components/atoms/InputForm";
import TextArea from "../../../components/atoms/TextArea";
import { app } from "../../../firebase";
import { getSelectPost, updatePost } from "../../../lib/api/post";

const EditPost = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [editPost, setEditPost] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setEditPost({ ...editPost, [name]: value });
  };

  const handleonSubmit = async () => {
    try {
      const routeId = router.query.id;
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };
      const res = await updatePost(routeId, editPost, config);
      router.push("/posts");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        if (router.isReady) {
          const routeId = router.query.id;
          const currentUser = auth.currentUser;
          const token = await currentUser.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectPost(routeId, config);
          setEditPost({
            title: res.data.title,
            body: res.data.body,
          });
          console.log(res.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    getPost();
  }, []);
  return (
    <>
      <h1>EditPost</h1>
      {!loading && (
        <form onSubmit={handleSubmit(handleonSubmit)}>
          <InputForm
            title="title"
            type="text"
            value={editPost.title}
            handleChange={handleChange}
          />
          <TextArea
            title="body"
            value={editPost.body}
            handleChange={handleChange}
          />
          {errors.body && <p>本文を入力してください</p>}
          <FormButton type="submit">submit</FormButton>
        </form>
      )}
    </>
  );
};

export default EditPost;
