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
import { useThemeCustom } from "../../contexts/ThemeContext";

export default function AlertsP() {
  const [selectedStation] = useState<"station1">("station1");

  const positions = {
    station1: [-21.039668, -46.060912] as LatLngTuple,
  };

  // Estado para os alertas de cada estação (cores e tipo)
  const [alerts, setAlerts] = useState({
    station1: { type: "Sem alertas", color: "green" },
  });

  // Função que simula a criação de alertas aleatórios, incluindo "Sem alertas"
  const generateAlert = () => {
    const alertTypes = [
      { type: "Sem alertas", color: "green" },
      { type: "Ventos médios", color: "yellow" },
      { type: "Ventos fortes", color: "red" },
      { type: "Ondas médias", color: "yellow" },
      { type: "Ondas grandes", color: "red" },
    ];
    return alertTypes[Math.floor(Math.random() * alertTypes.length)];
  };

  // Atualizar alertas individualmente a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlerts = {
        station1: generateAlert(),
      };

      setAlerts(newAlerts); // Atualiza os alertas individualmente
    }, 10 * 60 * 1000); // Atualiza a cada 10 minutos

    return () => clearInterval(interval); // Limpar intervalo quando o componente for desmontado
  }, []); // O efeito roda uma vez quando o componente é montado

  // Ícone de alerta
  const alertIcon = new Icon({
    iconUrl: "/icons/alert-icon.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  return (
    <>
      <Container>
        <NavbarPI />
        <AlertsMain>
          <LeftColumn>
            <StationSelector value={selectedStation} onChange={() => {}}>
              <StationOption value="station1">Estação Lago de Furnas</StationOption>
            </StationSelector>

            {/* Caixa de Alerta para a Estação 1 */}
            <AlertBox>
              <strong>Alertas na região:</strong>
              <br />
              {alerts.station1.type}
            </AlertBox>
          </LeftColumn>

          <AlertsMapDiv>
            <StyledMapContainer
              center={positions[selectedStation]}
              zoom={9}
              minZoom={8}
              maxZoom={16}
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

              {/* Adicionando os Markers e Círculos para cada estação com cores e alertas individualizados */}
              <Marker position={positions.station1} icon={alertIcon}>
                <Popup>Estação 1 - {alerts.station1.type}</Popup>
              </Marker>
              <Circle
                center={positions.station1}
                radius={80000}
                pathOptions={{ fillColor: alerts.station1.color, color: alerts.station1.color }}
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
    map.flyTo(position, 9, { duration: 1.5 });
  }, [position, map]);

  useEffect(() => {
    map.setMaxBounds([
      [-21.5, -46.5],
      [-20.4, -45.2],
    ]);
  }, [map]);

  return null;
}

const Container = styled.div`
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.backgroundGradient};
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 250px;
`;

const AlertBox = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.widgetBackground};
  border-radius: 12px;
  padding: 1.5rem;
  color: ${({ theme }) => theme.text};
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
  background-color: ${({ theme }) => theme.body};
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
  background-color: ${({ theme }) => theme.widgetBackground};
  border: 2px solid #21eb79;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #21eb79;
  }
`;

const StationOption = styled.option`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;
