import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const MenuDrawer = (props) => {
  const { onClose, isOpen, handleLogout } = props;
  const router = useRouter();
  return (
    <Drawer placement="right" size="sm" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent bg="gray.100">
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody p={0}>
            <Stack spacing={4}>
              <Button w="100%" onClick={() => router.push("/users")}>
                ユーザー一覧
              </Button>
              <Button w="100%" onClick={() => router.push("/posts")}>
                投稿一覧
              </Button>
              <Button w="100%" onClick={() => router.push("/posts/new")}>
                新規投稿
              </Button>
              <Button w="100%" onClick={handleLogout}>
                ログアウト
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MenuDrawer;
