import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";

const MenuIconButton = (props) => {
  const { onOpen } = props;
  return (
    <IconButton
      aria-label="menuButton"
      icon={<HamburgerIcon />}
      variant="solid"
      size="md"
      display={{ base: "block", lg: "none" }}
      onClick={onOpen}
    />
  );
};

export default MenuIconButton;
