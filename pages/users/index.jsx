import { Heading, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UserCard from "../../components/organisms/UserCard";
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
      {!loading && (
        <Wrap m={5} spacing={5}>
          {userList.map((user) => (
            <WrapItem key={user.id}>
              <UserCard
                imageUrl={user.icon.url}
                userName={user.name}
                id={user.id}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
};

export default Users;
