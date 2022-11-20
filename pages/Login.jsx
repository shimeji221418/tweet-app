import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import FormButton from "../components/atoms/button/FormButton";
import InputForm from "../components/atoms/InputForm";
import { app } from "../firebase";

const Login = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [loginUser, setLoginUser] = useState({
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
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleonSubmit = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginUser.email,
        loginUser.password
      );
      router.push("/");
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };
  return (
    <>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(handleonSubmit)}>
        <InputForm title="email" type="text" handleChange={handleChange} />
        {errors.email && <p>emailを入力してください</p>}
        <InputForm
          title="password"
          type="password"
          handleChange={handleChange}
        />
        {errors.password && <p>passwordを入力してください</p>}
        <FormButton type="submit">Login</FormButton>
      </form>
    </>
  );
};

export default Login;
