import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { app } from "../../firebase";
import MenuIconButton from "../atoms/button/MenuIconButton";
import MenuDrawer from "../molecules/MenuDrawer";

const Header = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const onClickHome = () => router.push("/");
  const handleLogout = async () => {
    await signOut(auth);
    await router.replace("/Login");
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        bg="cyan.500"
        padding={{ base: 2, md: 3 }}
        m={0}
      >
        <Flex as="a" align="center" _hover={{ cursor: "pointer" }}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl" }}
            my={0}
            color="white"
            pr={6}
            onClick={onClickHome}
          >
            tweet-app
          </Heading>
          <Text textAlign="center" color="white">
            CurrentUser:
          </Text>
          <Text
            ml={1}
            mr={4}
            color="white"
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
          >
            {auth.currentUser && auth.currentUser.displayName}
          </Text>
        </Flex>
        <Flex
          flexGrow={4}
          align="center"
          color="white"
          fontSize={{ base: "sm", md: "md" }}
          display={{ base: "none", lg: "flex" }}
        >
          <Box pr={3}>
            <Link href="/users">ユーザー一覧</Link>
          </Box>
          <Box pr={3}>
            <Link href="/posts">投稿一覧</Link>
          </Box>
          <Box>
            <Link href="/posts/new">新規投稿</Link>
          </Box>
        </Flex>
        <Flex
          align="center"
          color="white"
          fontSize={{ base: "sm", md: "md" }}
          _hover={{ cursor: "pointer" }}
          display={{ base: "none", md: "flex" }}
        >
          <Box onClick={handleLogout} display={{ base: "none", lg: "block" }}>
            ログアウト
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Header;
