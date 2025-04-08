import React from "react";
import GlobalStyle from "../styles/GlobalStyles";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default MainLayout;