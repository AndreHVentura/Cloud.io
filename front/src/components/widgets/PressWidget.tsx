import styled from "styled-components";

type Props = {
  weatherData: { pressure: number } | null;
};

export default function PressWidget({ weatherData }: Props) {
  return (
    <Card>
      <Title>Pressão Atmosférica</Title>
      <Value>{weatherData ? `${weatherData.pressure} hPa` : "Carregando..."}</Value>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ theme }) => theme.widgetBackground};
  color: ${({ theme }) => theme.text};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const Value = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;
