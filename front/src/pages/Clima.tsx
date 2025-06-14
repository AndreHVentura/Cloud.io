import { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/perfil/Navbar";
import TopBar from "../components/perfil/Topbar";
import WeatherMap, { WeatherData } from "../components/pagina/WeatherMap";
import TempWidget from "../components/widgets/TempWidget";
import HumWidget from "../components/widgets/HumWidget";
import PressWidget from "../components/widgets/PressWidget";
import SolarRadiationWidget from "../components/widgets/SolarRadiationWidget";
import Footer from "../components/pagina/Footer";

export default function Clima() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <Container>
      <NavBar isOpen={isNavOpen} />
      <TopBar helper={toggleNav} isNavOpen={isNavOpen} />
      <Main>
        <MainDiv>
          <ContentRow>
            <WidgetsContainer>
              <TempWidget weatherData={weatherData} />
              <HumWidget weatherData={weatherData} />
              <PressWidget weatherData={weatherData} />
              <SolarRadiationWidget weatherData={weatherData} />
            </WidgetsContainer>
            <MapContainer>
              <WeatherMap onDataFetched={setWeatherData} />
            </MapContainer>
          </ContentRow>
        </MainDiv>
      </Main>
      <Footer />
    </Container>
  );
}

// Styled Components (copiados do climate.tsx)

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background: ${({ theme }) => theme.body};
`;

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 4rem;
  background: ${({ theme }) => theme.body};
`;

const MainDiv = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const ContentRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;

const MapContainer = styled.div`
  flex: 2;
  max-width: 900px;
  height: 700px;
  border-radius: 12px;
  overflow: hidden;
`;

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
`;
