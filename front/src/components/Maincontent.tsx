import styled from "styled-components";
import WeatherDashboard from "./WeatherDashboard";
import TempWidget from "./TempWidget";
import HumWidget from "./HumWidget";
import PressWidget from "./PressWidget";
import TempCabineWidget from "./TempCabineWidget";
import ChargeWidget from "./ChargeWidget";
import SolarRadiationWidget from "./SolarRadiationWidget";

export default function MainContent() {
    return(
      <Main>
      <MainDiv>
        <WidgetsContainer>
          <TempWidget />
          <HumWidget />
          <PressWidget />
          <TempCabineWidget />
          <ChargeWidget />
          <SolarRadiationWidget />
        </WidgetsContainer>
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

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;