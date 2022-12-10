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
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/atoms/button/PrimaryButton";
import Like from "../../components/atoms/Like";
import DetailModal from "../../components/organisms/Modal";
import { app } from "../../firebase";
import { deletePost, getSelectPost } from "../../lib/api/post";
import { getCurrentUser } from "../../lib/api/user";

const Post = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [selectPost, setSelectPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getPost = async () => {
      try {
        if (router.isReady) {
          const routeId = router.query.id;
          const currentUser = auth.currentUser;
          const token = await currentUser.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectPost(routeId, config);
          setSelectPost(res.data);
          console.log(res.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken(true);
        const config = {
          headers: { authorization: `Bearer ${token}` },
          params: { uid: currentUser.uid },
        };
        const res = await getCurrentUser(config);
        setUser(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e.errors);
      }
    };
    getUser();
  }, []);

  const handleDelete = async () => {
    try {
      const routeId = router.query.id;
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = { headers: { authorization: `Bearer ${token}` } };
      const res = await deletePost(routeId, config);
      console.log(res.data);
      router.push("/posts");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!loading && (
        <Flex justify="center" mt={10}>
          <Box
            w="xl"
            bg="white"
            p={6}
            borderRadius="md"
            shadow="lg"
            display="flex"
          >
            <HStack align="top">
              <Avatar src={selectPost.user.icon.url} mr={3} />
              <Stack spacing={5}>
                <Text as="u" color="cyan.600">
                  <Link href={`/users/${selectPost.user.id}`}>
                    {selectPost.user.name}
                  </Link>
                </Text>
                <Box fontSize="lg" fontWeight="bold">
                  {selectPost.body}
                </Box>
                {selectPost.image ? (
                  <Image
                    src={selectPost?.image.url}
                    width="100%"
                    height="100%"
                  />
                ) : (
                  ""
                )}
                {!loading && auth.currentUser.uid === selectPost.user.uid && (
                  <HStack spacing={4} display="flex" justify="center">
                    <PrimaryButton onClick={onOpen} color="red">
                      delete
                    </PrimaryButton>
                    <PrimaryButton
                      onClick={() =>
                        router.push(`/posts/edit/${selectPost.id}`)
                      }
                      color="green"
                    >
                      update
                    </PrimaryButton>
                  </HStack>
                )}
                <PrimaryButton
                  colorScheme="cyan"
                  color="cyan"
                  fontcolor="white"
                  onClick={() => router.push("/posts")}
                >
                  Back
                </PrimaryButton>
              </Stack>
            </HStack>
            <Spacer />
            <Box>
              {user.id && <Like postId={selectPost.id} userId={user.id} />}
            </Box>
          </Box>
        </Flex>
      )}
      <DetailModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Post;
