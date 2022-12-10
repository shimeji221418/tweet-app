import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/atoms/button/PrimaryButton";
import Like from "../../components/atoms/Like";
import DetailModal from "../../components/organisms/Modal";
import { app } from "../../firebase";
import { getSelectUser } from "../../lib/api/user";
import { deleteSelectUser } from "../../lib/api/user";

const User = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [selectUser, setSelectUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCurrentUser = async () => {
    try {
      const user = auth.currentUser;
      await deleteUser(user);
      await signOut(auth);
      router.replace(`/signUp`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!loading && (
        <Flex justify="center" align="center">
          <Box
            bg="white"
            w="sm"
            shadow="lg"
            py={8}
            borderRadius="md"
            mr={5}
            mt={5}
          >
            <Stack textAlign="center" alignItems="center" spacing={2}>
              <Image
                src={selectUser.icon.url}
                boxSize="150px"
                alt="userImage"
                borderRadius="full"
              />
              <Text as="h1" fontSize="5xl" fontWeight="bold">
                {selectUser.name}
              </Text>
              <Text as="h2" fontSize="2xl" pb={5}>
                {selectUser.email}
              </Text>
              {auth.currentUser.uid === selectUser.uid && (
                <>
                  <PrimaryButton
                    onClick={() => router.push(`/users/edit/${selectUser.id}`)}
                    color="green"
                  >
                    update
                  </PrimaryButton>
                  <PrimaryButton onClick={onOpen} color="red">
                    delete
                  </PrimaryButton>
                </>
              )}
            </Stack>
          </Box>
          <Stack>
            <Text as="h1" fontSize="lg" color="gray.600" fontWeight="bold">
              {selectUser.name}の投稿一覧
            </Text>
            {selectUser.posts.id ? (
              <>
                {selectUser.posts.map((post) => (
                  <Box
                    key={post.id}
                    w="md"
                    bg="white"
                    p={2}
                    borderRadius="md"
                    shadow="lg"
                  >
                    <HStack>
                      <Avatar src={selectUser.icon.url} mr={3} />
                      <Stack>
                        <Text as="u" color="cyan.600">
                          <Link href={`/users/${post.userId}`}>
                            {selectUser.name}
                          </Link>
                        </Text>
                        <Box fontSize="lg" fontWeight="bold">
                          <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </Box>
                      </Stack>
                      <Spacer />
                      <Box>
                        {post.userId && (
                          <Like postId={post.id} userId={post.userId} />
                        )}
                      </Box>
                    </HStack>
                  </Box>
                ))}
              </>
            ) : (
              <Text>「{selectUser.name}の投稿はまだありません」</Text>
            )}
          </Stack>
        </Flex>
      )}
      <Box m={8}>
        <PrimaryButton color="cyan" onClick={() => router.push("/users")}>
          ←Index
        </PrimaryButton>
      </Box>
      <DetailModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleonDelete}
      />
    </>
  );
};

export default User;
