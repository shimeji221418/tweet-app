import React from "react";
import Header from "../organisms/Header";

const HeaderLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderLayout;
