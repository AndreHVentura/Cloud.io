import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import styled from "styled-components";
import NavbarPI from "../perfil/NavbarPI"; // ajuste o caminho conforme seu projeto

export default function AlertsP() {
  const [selectedStation, setSelectedStation] = useState<"station1" | "station2" | "station3">("station1");

  const positions = {
    station1: [-21.039668, -46.060912] as LatLngTuple,
    station2: [-20.733301, -45.925631] as LatLngTuple,
    station3: [-20.792253, -45.702784] as LatLngTuple,
  };

  return (
    <>
      <NavbarPI background="#0e2843" />
      <AlertsMain>
        <ButtonGroup>
          <StationButton onClick={() => setSelectedStation("station1")}>
            Estação 1
          </StationButton>
          <StationButton onClick={() => setSelectedStation("station2")}>
            Estação 2
          </StationButton>
          <StationButton onClick={() => setSelectedStation("station3")}>
            Estação 3
          </StationButton>
        </ButtonGroup>
        <AlertsMapDiv>
          <StyledMapContainer
            center={positions[selectedStation]}
            zoom={12} // zoom inicial ajustado
            minZoom={12} // zoom mínimo ajustado para a região
            maxZoom={14} // zoom máximo ajustado para não ficar tão distante
            maxBounds={[
              [-21.2, -46.3], // canto sudoeste
              [-20.6, -45.5], // canto nordeste
            ]}
            maxBoundsViscosity={1.0} // força o limite de movimentação
          >
            <MapUpdater position={positions[selectedStation]} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={positions.station1}>
              <Popup>Estação 1</Popup>
            </Marker>
            <Circle
              center={positions.station1}
              radius={10000}
              pathOptions={{ fillColor: "orange", color: "orange" }}
            />

            <Marker position={positions.station2}>
              <Popup>Estação 2</Popup>
            </Marker>
            <Circle
              center={positions.station2}
              radius={10000}
              pathOptions={{ fillColor: "lime", color: "lime" }}
            />

            <Marker position={positions.station3}>
              <Popup>Estação 3</Popup>
            </Marker>
            <Circle
              center={positions.station3}
              radius={10000}
              pathOptions={{ fillColor: "red", color: "red" }}
            />
          </StyledMapContainer>
        </AlertsMapDiv>
      </AlertsMain>
    </>
  );
}

function MapUpdater({ position }: { position: LatLngTuple }) {
  const map = useMap(); // Aqui você pode acessar o mapa com o hook useMap
  useEffect(() => {
    // Quando a posição for alterada, fazemos o flyTo para a nova posição
    map.flyTo(position, 12, { duration: 1.5 });
  }, [position, map]);
  
  useEffect(() => {
    // Configura o limite máximo do mapa
    map.setMaxBounds([
      [-21.2, -46.3], // canto sudoeste
      [-20.6, -45.5], // canto nordeste
    ]);
  }, [map]); // Isso vai ser executado quando o mapa for carregado

  return null;
}

const AlertsMain = styled.main`
  height: calc(100vh - 4rem);
  padding: 2rem;
  background-color: #0e2843;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const AlertsMapDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const StyledMapContainer = styled(MapContainer)`
  height: 600px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const StationButton = styled.button`
  background-color: #8b5cf6;
  color: white;
  border: 2px solid #6d28d9;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: #6d28d9;
    transform: scale(1.05);
  }
`;
