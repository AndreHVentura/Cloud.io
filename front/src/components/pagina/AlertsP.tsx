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
import Footer from "../pagina/Footer";
import NavbarPI from "../perfil/NavbarPI";

export default function AlertsP() {
  const [selectedStation, setSelectedStation] = useState<
    "station1" | "station2" | "station3"
  >("station1");

  const positions = {
    station1: [-21.039668, -46.060912] as LatLngTuple,
    station2: [-20.733301, -45.925631] as LatLngTuple,
    station3: [-20.792253, -45.702784] as LatLngTuple,
  };

  return (
    <>
<<<<<<< HEAD
      <Container>
        <NavbarPI />
        <AlertsMain>
          <LeftColumn>
            <StationSelector
              value={selectedStation}
              onChange={(e) =>
                setSelectedStation( e.target.value as "station1" | "station2" | "station3" )
              }>
              <StationOption value="station1">Estação 1</StationOption>
              <StationOption value="station2">Estação 2</StationOption>
              <StationOption value="station3">Estação 3</StationOption>
            </StationSelector>
            <AlertBox>
              <strong>Alerta estação 1:</strong>
              <br />
              Ventos fortes
            </AlertBox>
          </LeftColumn>
=======
      
    <Container>
    <NavbarPI background="#0e0e1a" />
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
>>>>>>> e2b6b80d25bdf67cc0e1d5068e88a92d2eef60e9

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
        <Footer />
      </Container>
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

const Navbar = styled.nav<{ background?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  width: 98%;
  height: 4rem;
  background-color: ${({ background }) => background || "transparent"};
`;

const Container = styled.div`
  color: white;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #0e0e1a, #1f1f2e);
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 250px;
`;

const AlertBox = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  color: #1f1f2e;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  max-width: 300px;
  height: fit-content;
`;

const AlertsMain = styled.main`
  height: calc(100vh - 4rem);
  padding: 2rem;
  background-color: whitesmoke;
  display: flex;
  flex-direction: row; /* <-- Linha horizontal */
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
`;

const AlertsMapDiv = styled.div`
  flex: 1;
  height: 600px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const StyledMapContainer = styled(MapContainer)`
  height: 600px;
  width: 100%;
`;

const StationSelector = styled.select`
  background-color: white;
  border: 2px solid #6d28d9;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  color: #1f1f2e;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #8b5cf6;
  }
`;

const StationOption = styled.option`
  font-size: 1rem;
  color: #1f1f2e;
`;
