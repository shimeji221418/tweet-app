import React from "react";
import { useFormContext } from "react-hook-form";

const TextArea = (props) => {
  const { title, handleChange, value } = props;
  const { register } = useFormContext();
  return (
    <div>
      <label htmlFor={title}>{title}:</label>
      <textarea
        id={title}
        name={title}
        rows="5"
        cols="33"
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

export default TextArea;
