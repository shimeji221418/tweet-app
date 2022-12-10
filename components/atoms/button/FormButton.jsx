import { Button } from "@chakra-ui/react";
import React from "react";

const FormButton = (props) => {
  const { children, type, size } = props;
  return (
    <Button type={type} bg="cyan.600" color="white" size={size}>
      {children}
    </Button>
  );
};

export default FormButton;
