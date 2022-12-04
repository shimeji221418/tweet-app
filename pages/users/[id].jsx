import { deleteUser, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/atoms/button/PrimaryButton";
import { app } from "../../firebase";
import { getSelectUser } from "../../lib/api/user";
import { deleteSelectUser } from "../../lib/api/user";

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
          setSelectUser(res.data);
          console.log(res.data);
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
      const res = await deleteSelectUser(id, config);
      console.log(res.data);
      deleteCurrentUser();
      router.push(`/signUp`);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCurrentUser = async () => {
    try {
      const user = auth.currentUser;
      await deleteUser(user);
    } catch (e) {
      console(e);
    }
  };

  return (
    <>
      <h1>User</h1>
      {auth.currentUser.uid === selectUser.uid && (
        <>
          <PrimaryButton
            onClick={() => router.push(`/users/edit/${selectUser.id}`)}
          >
            update
          </PrimaryButton>
          <PrimaryButton onClick={handleonDelete}>delete</PrimaryButton>
        </>
      )}
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
    </>
  );
};

export default User;
