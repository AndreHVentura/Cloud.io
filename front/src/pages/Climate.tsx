
import styled from "styled-components";
import TempWidget from "../components/widgets/TempWidget";
import HumWidget from "../components/widgets/HumWidget";
import PressWidget from "../components/widgets/PressWidget";
import SolarRadiationWidget from "../components/widgets/SolarRadiationWidget";
import ClimaSearch from "../components/pagina/ClimaSearch";
import WeatherMap from "../components/pagina/WeatherMap";
import NavbarPI from "../components/perfil/NavbarPI";
import Footer from "../components/pagina/Footer";

export default function Climate() {

  return (
    <Container>
      <NavbarPI />
      <Main>
        <MainDiv>
            <ClimaSearch />
          <ContentRow>
            <WidgetsContainer>
              <TempWidget />
              <HumWidget />
              <PressWidget />
              <SolarRadiationWidget />
            </WidgetsContainer>
            <MapContainer>
              <WeatherMap />
            </MapContainer>
          </ContentRow>
        </MainDiv>
      </Main>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  color: white;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #0e0e1a, #1f1f2e);
`;

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 4rem;
  background-color: whitesmoke;
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
  grid-template-columns: repeat(2, 1fr); // 2 colunas
  gap: 1rem;
  flex: 1;
`;