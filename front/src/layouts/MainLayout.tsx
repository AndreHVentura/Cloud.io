import React from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  );
};

export default MainLayout;