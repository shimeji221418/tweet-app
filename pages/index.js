import { async } from "@firebase/util";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { app } from "../firebase";

const Home = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
    await router.replace("/Login");
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Home;
