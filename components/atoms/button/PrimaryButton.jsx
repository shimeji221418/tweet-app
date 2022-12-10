import { Button } from "@chakra-ui/react";
import React from "react";

const PrimaryButton = (props) => {
  const { children, onClick, color, fontcolor = "white" } = props;
  return (
    <div>
      <Button onClick={onClick} colorScheme={color} color={fontcolor}>
        {children}
      </Button>
    </div>
  );
};

export default PrimaryButton;
