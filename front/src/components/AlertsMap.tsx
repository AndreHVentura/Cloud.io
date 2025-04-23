import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import styled from "styled-components";

export default function AlertsMap() {
  const position: LatLngTuple = [-21.039668, -46.0609127];

  return(
    <StyledMapContainer center={position} zoom={11}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        Estação #
      </Popup>
    </Marker>
    </StyledMapContainer>
  );
};

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
`;

