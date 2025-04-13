import styled from "styled-components";
import WeatherDashboard from "./WeatherDashboard";

export default function MainContent() {
    return(
      <Main>
        <MainDiv>
          <WeatherDashboard />
        </MainDiv>
      </Main>
    );
  };
  
const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
`;
  
const MainDiv = styled.div`
   max-width: 1200px;
   width: 100%; 
`;