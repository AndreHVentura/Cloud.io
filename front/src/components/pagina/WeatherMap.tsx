import { MapContainer, TileLayer } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from "react";

// Definindo a interface para os dados climáticos retornados pela API
interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  temperature_2m_max: number; // Pode ser usado para umidade, mas vou deixar como exemplo.
}

export default function WeatherMap() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Coordenadas de exemplo (São Paulo)
  const latitude = -23.55;
  const longitude = -46.63;

  // Função para buscar dados meteorológicos da Open-Meteo
  const fetchWeatherData = useCallback(async () => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await response.json();
    setWeatherData(data.current_weather); // Armazenar o clima atual
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeatherData(); // Chama a função de buscar dados ao carregar o componente
  }, [fetchWeatherData]);

  return (
    <MapWrapper>
      <MapContainer center={[latitude, longitude]} zoom={6} scrollWheelZoom={false}>
        {/* Camada base (OpenStreetMap) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Camada de nuvens (OpenWeatherMap) */}
        <TileLayer
          url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=b7afd51f4e7a7f74af3d665aef0dfb57"
        />
        {/* Camada de precipitação (OpenWeatherMap) */}
        <TileLayer
          url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=b7afd51f4e7a7f74af3d665aef0dfb57"
        />
        {/* Camada de radar de chuva (OpenWeatherMap) */}
        <TileLayer
          url="https://tile.openweathermap.org/map/rain_new/{z}/{x}/{y}.png?appid=b7afd51f4e7a7f74af3d665aef0dfb57"
        />
      </MapContainer>

      {/* Exibindo os dados do clima */}
      {weatherData && (
        <WeatherInfo>
          <h3>Clima Atual em São Paulo</h3>
          <p>Temperatura: {weatherData.temperature}°C</p>
          <p>Vento: {weatherData.windspeed} km/h</p>
          <p>Direção do Vento: {weatherData.winddirection}°</p>
          <p>Máxima de Temperatura: {weatherData.temperature_2m_max}°C</p>
        </WeatherInfo>
      )}
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  height: 500px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 8px;
  width: 300px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  font-family: Arial, sans-serif;
  h3 {
    margin-top: 0;
  }
  p {
    margin: 5px 0;
  }
`;
