import {
  Avatar,
  Box,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ThemeContext } from "@emotion/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Like from "../../components/atoms/Like";
import { app } from "../../firebase";
import { getPosts } from "../../lib/api/post";
import { getUsers } from "../../lib/api/user";

const Posts = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        const res = await getPosts(config);
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPosts();
  }, []);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        const res = await getUsers(config);
        setUserList(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUserList();
  }, []);

  useEffect(() => {
    const loginUser = userList.find(
      (user) => user.uid === auth.currentUser.uid
    );
    if (loginUser) {
      setUser(loginUser);
      console.log(user);
      setLoading(false);
    }
  }, [userList]);

  return (
    <>
      {!loading && (
        <Stack align="center" mt={6}>
          {posts.map((post) => (
            <Box
              key={post.id}
              w="xl"
              bg="white"
              p={2}
              borderRadius="md"
              shadow="lg"
            >
              <HStack>
                <Avatar src={post.user.icon.url} mr={3} />
                <Stack>
                  <Text as="u" color="cyan.600">
                    <Link href={`/users/${post.user.id}`}>
                      {post.user.name}
                    </Link>
                  </Text>
                  <Box fontSize="lg" fontWeight="bold">
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                  </Box>
                </Stack>
                <Spacer />
                <Box>
                  {user.id && <Like postId={post.id} userId={user.id} />}
                </Box>
              </HStack>
            </Box>
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
