import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { useEffect, useCallback } from "react";

// Interface para os dados do clima
export interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  temperature_2m_max: number;
  humidity: number;
  pressure: number;
  solarRadiation: number;
}

interface WeatherMapProps {
  onDataFetched: (data: WeatherData) => void;
}

export default function WeatherMap({ onDataFetched }: WeatherMapProps) {
  const latitude = -20.615;
  const longitude = -46.05;

  const capitolioCoords: [number, number] = [-20.615, -46.05];
  const canionsCoords: [number, number] = [-20.650346, -46.265993];

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current_weather=true` +
          `&hourly=relative_humidity_2m,pressure_msl,shortwave_radiation` +
          `&daily=temperature_2m_max` +
          `&timezone=auto`
      );
      const data = await response.json();

      const now = new Date();
      const localHour = now.toISOString().slice(0, 13) + ":00";
      const timeIndex = data.hourly.time.indexOf(localHour);
      const index = timeIndex !== -1 ? timeIndex : 0;

      const weatherData: WeatherData = {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddirection: data.current_weather.winddirection,
        temperature_2m_max: data.daily.temperature_2m_max[0],
        humidity: data.hourly.relative_humidity_2m[index],
        pressure: data.hourly.pressure_msl[index],
        solarRadiation: data.hourly.shortwave_radiation[index],
      };

      onDataFetched(weatherData);
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
    }
  }, [latitude, longitude, onDataFetched]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return (
    <MapWrapper>
      <MapContainer center={[latitude, longitude]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=b7afd51f4e7a7f74af3d665aef0dfb57"
        />
        <TileLayer
          url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=b7afd51f4e7a7f74af3d665aef0dfb57"
        />
        <TileLayer
          url="https://tile.openweathermap.org/map/rain_new/{z}/{x}/{y}.png?appid=b7afd51f4e7a7f74af3d665aef0dfb57"
        />

        <Marker position={capitolioCoords}>
          <Popup>Capitólio, Minas Gerais</Popup>
        </Marker>

        <Marker position={canionsCoords}>
          <Popup>Cânions de Furnas (Capitólio / São José da Barra)</Popup>
        </Marker>
      </MapContainer>
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
