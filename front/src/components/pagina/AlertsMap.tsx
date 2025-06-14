import { MapContainer, TileLayer, Popup, Marker, Circle } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import styled from "styled-components";

export default function AlertsMap({ windAvgSpeed }: {windAvgSpeed: number}) {
  const position_one: LatLngTuple = [-21.039668, -46.060912];

  const colorSafe = { fillColor: "lime", color: "lime" };
  const colorWarn = { fillColor: "orange", color: "orange" };
  const colorDanger = { fillColor: "red", color: "red" };

  let currentColor;

  if(windAvgSpeed > 17.00) {
    currentColor = colorDanger;
  } else if(windAvgSpeed > 10.00) {
    currentColor = colorWarn;
  } else {
    currentColor = colorSafe;
  }

  return(
    <StyledMapContainer center={position_one} zoom={9}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      <Marker position={position_one} >
        <Popup>
          Estação 1
        </Popup>
      </Marker>
      <Circle center={position_one} radius={80000} pathOptions={currentColor}/>
    </StyledMapContainer>
  );
};

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
`;

