import { MapContainer, TileLayer } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

export default function WeatherMap() {
  return (
    <MapWrapper>
      <MapContainer center={[-23.55, -46.63]} zoom={6} scrollWheelZoom={false}>
        {/* Camada base */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Camada de nuvens (OpenWeatherMap) */}
        <TileLayer
          url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=SUA_API_KEY"
        />
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