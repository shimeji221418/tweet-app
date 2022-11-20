import React from "react";

const PrimaryButton = (props) => {
  const { children, onClick } = props;
  return (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default PrimaryButton;
