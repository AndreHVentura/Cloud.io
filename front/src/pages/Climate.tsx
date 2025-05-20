
import TempWidget from "../components/widgets/TempWidget";
import HumWidget from "../components/widgets/HumWidget";
import PressWidget from "../components/widgets/PressWidget";
import SolarRadiationWidget from "../components/widgets/SolarRadiationWidget";
import WeatherMap from "../components/pagina/WeatherMap";
import styled from "styled-components";
import NavbarPI from "../components/perfil/NavbarPI";

export default function Climate({ background = "navblue" }) {

  return (
    <Container>
      <NavbarPI />
      <Main>
        <MainDiv>
          <WidgetsContainer>
            <TempWidget />
            <HumWidget />
            <PressWidget />
            <SolarRadiationWidget />
          </WidgetsContainer>
          <WeatherMap />
        </MainDiv>
      </Main>
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

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;