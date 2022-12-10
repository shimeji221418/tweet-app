import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/atoms/button/PrimaryButton";
import { app } from "../firebase";

const Home = () => {
  const auth = getAuth(app);

  return (
    <>
      <h1>Home</h1>
      <div>Welcome to tweet-app</div>
    </>
  );
};

export default Home;
