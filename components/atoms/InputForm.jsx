import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const InputForm = (props) => {
  const { title, handleChange, type, value } = props;
  const { register } = useFormContext();
  return (
    <InputGroup>
      <InputLeftAddon children={title} bg="gray.500" color="white" />
      <Input
        id={title}
        name={title}
        type={type}
        placeholder={title}
        value={value}
        {...register(`${title}`, {
          required: true,
          onChange: (e) => {
            handleChange(e);
          },
        })}
        bg="white"
      />
    </InputGroup>
  );
};

export default InputForm;
