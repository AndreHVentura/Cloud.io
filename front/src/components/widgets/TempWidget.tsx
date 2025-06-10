//MOSTRAR TEMPERATURA AMBIENTE EM GRAUS CELCIUS
import styled from "styled-components";

export default function TempWidget() {
  return (
    <Card>
      <Title>Temperatura</Title>
      <Value>26°C</Value>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ theme }) => theme.widgetBackground};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const Value = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;