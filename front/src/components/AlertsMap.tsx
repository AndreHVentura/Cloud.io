import { MapContainer, TileLayer, Popup, Marker, Circle } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import styled from "styled-components";

export default function AlertsMap() {
  const position_one: LatLngTuple = [-21.039668, -46.060912];
  const position_two: LatLngTuple = [-20.733301, -45.925631];
  const position_three: LatLngTuple = [-20.792253, -45.702784];

  const colorSafe = { fillColor: "lime", color: "lime" };
  const colorWarn = { fillColor: "orange", color: "orange" };
  const colorDanger = { fillColor: "red", color: "red" };

  return(
    <StyledMapContainer center={position_one} zoom={11}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      <Marker position={position_one}>
        <Popup>
          Estação 1
        </Popup>
      </Marker>
      <Circle center={position_one} radius={10000} pathOptions={colorWarn}/>
      <Marker position={position_two}>
        <Popup>
          Estação 2
        </Popup>
      </Marker>
      <Circle center={position_two} radius={10000} pathOptions={colorDanger}/>
      <Marker position={position_three}>
        <Popup>
          Estação 3
        </Popup>
      </Marker>
      <Circle center={position_three} radius={10000} pathOptions={colorSafe}/>
    </StyledMapContainer>
  );
};

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
`;

