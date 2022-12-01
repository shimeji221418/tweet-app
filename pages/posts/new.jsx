import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormButton from "../../components/atoms/button/FormButton";
import InputForm from "../../components/atoms/InputForm";
import TextArea from "../../components/atoms/TextArea";
import { app } from "../../firebase";
import { createPost } from "../../lib/api/post";
import { getCurrentUser } from "../../lib/api/user";

const New = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");
  const [post, setPost] = useState({
    title: "",
    body: "",
    user_id: "",
    image: "",
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

  const uploadImage = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setPost({ ...post, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const createFormData = () => {
    const formData = new FormData();

    formData.append("post[title]", post.title);
    formData.append("post[body]", post.body);
    formData.append("post[image]", post.image ? post.image : "");
    formData.append("user_id", post.user_id);

    return formData;
  };

  const handleonSubmit = async () => {
    try {
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Context-Type": "multipart/form-data",
        },
      };
      const data = createFormData();
      const res = await createPost(data, config);
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
        const config = {
          headers: { authorization: `Bearer ${token}` },
          params: { uid: currentUser.uid },
        };
        const res = await getCurrentUser(config);
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
    setPost({ ...post, user_id: user.id });
    console.log(post);
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
          {errors.body && <p>bodyを入力してください</p>}
          <label htmlFor="image">image:</label>
          <input id="image" name="image" type="file" onChange={uploadImage} />
          <FormButton type="submit">submit</FormButton>
        </form>
      )}
      {preview && (
        <>
          <p>preview</p>
          <img src={preview} alt="preview img" width="30%" height="30%" />
        </>
      )}
    </>
  );
};
export default New;
