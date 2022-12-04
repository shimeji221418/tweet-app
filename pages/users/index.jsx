import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase";
import { getUsers } from "../../lib/api/user";

const Users = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        const res = await getUsers(config);
        console.log(res.data);
        setUserList(res.data);
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
      <h1>Users</h1>
      {!loading &&
        userList.map((user) => {
          return (
            <ul key={user.id}>
              <li>
                {user.name}
                <img
                  src={user.icon.url}
                  alt="defaultImage"
                  width="100px"
                  height="100px"
                  style={{ borderRadius: "50%" }}
                />
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default Users;
