import React from 'react';
import styled from 'styled-components';
import WindPeakChart from './WindpeakChart';
import WindSpeedChart from './WindspeedChart';
import WindDirChart from './WindDirChart';
import WaveHeightChart from './WaveheightChart';

const WeatherDashboard = () => {
  return (
    <Wrapper>
      <ChartRow>
        <ChartCard>
          <ChartTitle>Velocidade Máxima do Vento</ChartTitle>
          <WindPeakChart />
        </ChartCard>
        <ChartCard>
          <ChartTitle>Direção do Vento</ChartTitle>
          <WindDirChart />
        </ChartCard>
      </ChartRow>
      <ChartRow>
        <ChartCard>
          <ChartTitle>Velocidade do Vento</ChartTitle>
          <WindSpeedChart />
        </ChartCard>
        <ChartCard>
          <ChartTitle>Altura das ondas</ChartTitle>
          <WaveHeightChart />
        </ChartCard>
      </ChartRow>
    </Wrapper>
  );
};

export default WeatherDashboard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ChartRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 1400px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ChartCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1 1 48%;
  min-width: 700px;
  max-width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
`;