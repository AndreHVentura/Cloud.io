//MOSTRAR CARGA DE BATERIA DO SENSOR
import styled from "styled-components";

export default function TempWidget() {
  return (
    <Card>
      <Title>Bateria</Title>
      <Value>13%</Value>
    </Card>
  );
}

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const Value = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #222;
`;