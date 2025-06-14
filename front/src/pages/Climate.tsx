import { useEffect, useState } from "react";
import styled from "styled-components";
import TempWidget from "../components/widgets/TempWidget";
import HumWidget from "../components/widgets/HumWidget";
import PressWidget from "../components/widgets/PressWidget";
import SolarRadiationWidget from "../components/widgets/SolarRadiationWidget";
import WeatherMap from "../components/pagina/WeatherMap";
import NavbarPI from "../components/perfil/NavbarPI";
import Footer from "../components/pagina/Footer";
import { WeatherData } from "../types/WeatherData"; 

export default function Climate() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true&hourly=relative_humidity_2m,pressure_msl,shortwave_radiation&daily=temperature_2m_max&timezone=auto`)
      .then(res => res.json())
      .then(data => {
        setWeatherData({
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
          winddirection: data.current_weather.winddirection,
          temperature_2m_max: data.daily.temperature_2m_max[0],
          humidity: data.hourly.relative_humidity_2m[0],
          pressure: data.hourly.pressure_msl[0],
          solarRadiation: data.hourly.shortwave_radiation[0],
        });
      })
      .catch((err) => console.error("Erro ao buscar dados do clima:", err));
  }, []);

  return (
    <Container>
      <NavbarPI />
      <Main>
        <MainDiv>
<<<<<<< HEAD
=======
          <ClimaSearch />
>>>>>>> e527a6ab682fe02ae8d3f308fd09eb148f03687e
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
  grid-template-columns: repeat(2, 1fr); // 2 colunas
  gap: 1rem;
  flex: 1;
`;