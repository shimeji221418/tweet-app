import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import InputForm from "../components/atoms/InputForm";
import FormButton from "../components/atoms/button/FormButton";
import { signUpUser } from "../lib/api/user";
import { useFormContext } from "react-hook-form";

const SignUp = () => {
  const auth = getAuth(app);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleonSubmit = () => {
    const request = async () => {
      await signUpEmail();
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true);
        const config = { token };
        try {
          await signUpUser(config);
        } catch (e) {
          console.log(e);
        }
      }
    };
    request();
  };

  const signUpEmail = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      await updateProfile(auth.currentUser, {
        displayName: newUser.name,
      });
      console.log(auth.currentUser.displayName);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };
  return (
    <>
      <h1>SignUp</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(handleonSubmit)}>
        <InputForm title="name" type="text" handleChange={handleChange} />
        {errors.name && <p>nameを入力してください</p>}
        <InputForm title="email" type="text" handleChange={handleChange} />
        {errors.email && <p>emailを入力してください</p>}
        <InputForm
          title="password"
          type="password"
          handleChange={handleChange}
        />
        {errors.password && <p>passwordを入力してください</p>}
        <FormButton type="submit" children="SignUp" />
      </form>
    </>
  );
};

export default SignUp;
