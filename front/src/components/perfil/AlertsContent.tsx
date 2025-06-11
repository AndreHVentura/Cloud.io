import styled from "styled-components";
import AlertsMap from "../pagina/AlertsMap";
import { useEffect, useState } from "react";
// import AlertsMap from "./AlertsMap";

export default function AlertsContent() {
  const [windData, setWindData] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const dado = await fetch("http://localhost:5000/api/sensors?page=1&limit=1");
      const json = await dado.json();
      
      setWindData(json.data[0].wind_avg);
    }

    fetchData()

    const intervalId = setInterval(() => {
      fetchData();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

 
  let message;
  if(windData > 17.00) {
    message = "É perigoso navegar";
  } else if(windData > 10.00) {
    message = "Cuidado ao navegar";
  } else {
    message = "É seguro navegar";
  }

  return(
    <AlertsMain>
      <AlertsFilterDiv>
        <DivMessage>
          Estação da represa de Furnas
        </DivMessage>
      </AlertsFilterDiv>
      <AlertsMessages>
        <h3>Mensagens de alerta</h3>
        <DivMessage>
          <p><b>{message}</b> - Velocidade do vento: {windData} m/s</p>
          <p>Horário do alerta: 12:00</p>
        </DivMessage>
      </AlertsMessages>
      <AlertsMapDiv>
        <AlertsMap windAvgSpeed={windData}/>
      </AlertsMapDiv>
    </AlertsMain>
  );
};

const AlertsMain = styled.main`
  height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column wrap;
  background-color: #f8f9fa;

   @media (max-width: 735px) {
    flex-flow: column-reverse nowrap;
  }
`;

const AlertsBaseDiv = styled.div`
  color: black;
  background-color: white;
  margin: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const AlertsMapDiv = styled(AlertsBaseDiv)`
  width: 60%;
  height: 100%;

  @media (max-width: 735px) {
    width: 100%;
  }
`;

const AlertsFilterDiv = styled(AlertsBaseDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  height: 46%;

  @media (max-width: 735px) {
    width: auto;
  }
`;

const AlertsMessages = styled(AlertsBaseDiv)`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  height: 46%;

  @media (max-width: 735px) {
    width: auto;
  }
`;

const DivMessage = styled.div`
  margin-top: 0.5rem;
  background-color: aliceblue;
  padding: 0.3rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;