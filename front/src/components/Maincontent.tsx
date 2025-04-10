import styled from "styled-components";

export default function MainContent() {
    return(
      <Main>
        <MainDiv>Os gráficos ficarão aqui</MainDiv>
      </Main>
    );
  };
  
const Main = styled.main`
  height: calc(100vh - 3rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;
  
const MainDiv = styled.div`
  background-color: skyblue;
  height: 90%;
  width: 95%; 
`;