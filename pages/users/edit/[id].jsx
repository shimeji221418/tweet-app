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
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setEditUser({ ...editUser, [name]: value });
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
      const config = { headers: { authorization: `Bearer ${token}` } };
      const res = await updateUser(id, editUser, config);
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
        {!loading && (
          <InputForm
            title="email"
            type="text"
            value={editUser.email}
            handleChange={handleChange}
          />
        )}
        {errors.email && <p>emailを入力してください</p>}
        <FormButton type="submit">Edit</FormButton>
      </form>
    </>
  );
};

export default Edit;
