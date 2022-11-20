import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/atoms/button/PrimaryButton";
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
      <PrimaryButton children="logout" onClick={handleLogout} />
    </>
  );
};

export default Home;
