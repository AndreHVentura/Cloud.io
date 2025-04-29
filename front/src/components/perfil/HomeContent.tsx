import styled from "styled-components";
import WeatherDashboard from "./WeatherDashboard";
import TempWidget from "../widgets/TempWidget";
import HumWidget from "../widgets/HumWidget";
import PressWidget from "../widgets/PressWidget";
import TempCabineWidget from "../widgets/TempCabineWidget";
import ChargeWidget from "../widgets/ChargeWidget";
import SolarRadiationWidget from "../widgets/SolarRadiationWidget";

export default function HomeContent() {
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
  background-color: whitesmoke;
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