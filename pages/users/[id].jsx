import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/atoms/button/PrimaryButton";
import { app } from "../../firebase";
import { getSelectUser } from "../../lib/api/user";
import { deleteUser } from "../../lib/api/user";

const User = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [selectUser, setSelectUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (router.isReady) {
          const routeId = router.query.id;
          const currentUser = auth.currentUser;
          const token = await currentUser.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectUser(routeId, config);
          setSelectUser(res.data.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleonDelete = async () => {
    try {
      const id = selectUser.id;
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };
      const res = await deleteUser(id, config);
      console.log(res.data.data);
      router.push(`/users`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>User</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <li>
            <strong>name:</strong>
            {selectUser.name}
          </li>
          <li>
            <strong>email:</strong>
            {selectUser.email}
          </li>
        </ul>
      )}
      <PrimaryButton onClick={handleonDelete}>delete</PrimaryButton>
    </>
  );
};

export default User;
