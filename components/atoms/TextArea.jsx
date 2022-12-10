import { Textarea } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const TextArea = (props) => {
  const { title, handleChange, value, placeholder } = props;
  const { register } = useFormContext();
  return (
    <Textarea
      id={title}
      name={title}
      rows="5"
      cols="33"
      placeholder={placeholder}
      value={value}
      {...register(`${title}`, {
        required: true,
        onChange: (e) => {
          handleChange(e);
        },
      })}
    />
  );
};

export default TextArea;
