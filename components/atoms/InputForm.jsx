import React from "react";
import { useFormContext } from "react-hook-form";

const InputForm = (props) => {
  const { title, handleChange, type, value } = props;
  const { register } = useFormContext();
  return (
    <div>
      <label htmlFor={title}>{title}:</label>
      <input
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
      />
    </div>
  );
};

export default InputForm;
