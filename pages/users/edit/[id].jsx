import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormButton from "../../../components/atoms/button/FormButton";
import InputForm from "../../../components/atoms/InputForm";
import { app } from "../../../firebase";
import { getSelectUser, updateUser } from "../../../lib/api/user";

const Edit = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    uid: "",
    icon: "",
  });
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setEditUser({ ...editUser, [name]: value });
    console.log(editUser);
  };

  const uploadImage = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setEditUser({ ...editUser, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const createFormData = () => {
    const formData = new FormData();

    formData.append("user[name]", editUser.name);
    formData.append("user[icon]", editUser.icon ? editUser.icon : "");

    return formData;
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        if (router.isReady) {
          const routeId = router.query.id;
          const currentUser = auth.currentUser;
          const token = await currentUser.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectUser(routeId, config);
          if (auth.currentUser.uid !== res.data.uid) {
            router.replace("/users");
          }
          setEditUser({
            name: res.data.name,
            email: res.data.email,
            uid: res.data.uid,
            icon: res.data.icon,
          });
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleonSubmit = async () => {
    try {
      const id = router.query.id;
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Context-Type": "multipart/form-data",
        },
      };
      const data = createFormData();
      const res = await updateUser(id, data, config);
      console.log(res.data);
      router.push("/users");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit(handleonSubmit)}>
        {!loading && (
          <InputForm
            title="name"
            type="text"
            value={editUser.name}
            handleChange={handleChange}
          />
        )}
        {errors.name && <p>nameを入力してください</p>}
        <input id="icon" name="icon" type="file" onChange={uploadImage} />
        <FormButton type="submit">Edit</FormButton>
      </form>
      {preview && (
        <>
          <p>preview</p>
          <img src={preview} alt="preview img" width="30%" height="30%" />
        </>
      )}
    </>
  );
};

export default Edit;
