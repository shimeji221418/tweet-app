import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";

const SignUp = () => {
  const auth = getAuth(app);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">SignUp</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
