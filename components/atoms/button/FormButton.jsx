import React from "react";

const FormButton = (props) => {
  const { children, type } = props;
  return (
    <div>
      <button type={type}>{children}</button>
    </div>
  );
};

export default FormButton;
