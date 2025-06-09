import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import { LatLngTuple, Icon } from "leaflet";
import styled from "styled-components";
import Footer from "../pagina/Footer";
import NavbarPI from "../perfil/NavbarPI";

export default function AlertsP() {
  const [selectedStation, setSelectedStation] = useState<"station1" | "station2" | "station3">("station1");

  const positions = {
    station1: [-21.039668, -46.060912] as LatLngTuple,
    station2: [-20.733301, -45.925631] as LatLngTuple,
    station3: [-20.792253, -45.702784] as LatLngTuple,
  };

  // Ícone de alerta
  const alertIcon = new Icon({
    iconUrl: "/icons/alert-icon.svg", // Usando caminho local
    iconSize: [30, 30], // Tamanho do ícone
    iconAnchor: [15, 30], // Posição de ancoragem
    popupAnchor: [0, -30], // Posição do popup
  });

  return (
    <>
      <Container>
        <NavbarPI />
        <AlertsMain>
          <LeftColumn>
            <StationSelector
              value={selectedStation}
              onChange={(e) =>
                setSelectedStation(e.target.value as "station1" | "station2" | "station3")
              }
            >
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

          <AlertsMapDiv>
            <StyledMapContainer
              center={positions[selectedStation]}
              zoom={12}
              minZoom={12}
              maxZoom={14}
              maxBounds={[
                [-21.2, -46.3],
                [-20.6, -45.5],
              ]}
              maxBoundsViscosity={1.0}
            >
              <MapUpdater position={positions[selectedStation]} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Adicionando os Markers com ícone de alerta */}
              <Marker position={positions.station1} icon={alertIcon}>
                <Popup>Estação 1 - Alerta de Ventos fortes</Popup>
              </Marker>
              <Circle
                center={positions.station1}
                radius={10000}
                pathOptions={{ fillColor: "orange", color: "orange" }}
              />

              <Marker position={positions.station2} icon={alertIcon}>
                <Popup>Estação 2 - Alerta de Ventos fortes</Popup>
              </Marker>
              <Circle
                center={positions.station2}
                radius={10000}
                pathOptions={{ fillColor: "orange", color: "orange" }}
              />

              <Marker position={positions.station3} icon={alertIcon}>
                <Popup>Estação 3 - Alerta de Ventos fortes</Popup>
              </Marker>
              <Circle
                center={positions.station3}
                radius={10000}
                pathOptions={{ fillColor: "orange", color: "orange" }}
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
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 12, { duration: 1.5 });
  }, [position, map]);

  useEffect(() => {
    map.setMaxBounds([
      [-21.2, -46.3],
      [-20.6, -45.5],
    ]);
  }, [map]);

  return null;
}

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
  flex-direction: row;
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
