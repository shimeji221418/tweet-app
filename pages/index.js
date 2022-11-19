import { async } from "@firebase/util";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { getUsers } from "../lib/api/user";

const Home = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await signOut(auth);
    await router.replace("/Login");
  };

  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await getUsers();
        console.log(res.data);
        setUserList(res.data.data);
        setLoading(false);
      } catch (e) {
        console.log(e.errors);
        setLoading(false);
      }
    };
    getUserList();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>logout</button>
      {!loading &&
        userList.map((user) => {
          return (
            <ul key={user.id}>
              <li>{user.name}</li>
            </ul>
          );
        })}
    </>
  );
};

export default Home;
