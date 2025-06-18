import styled from "styled-components";
import AlertsMap from "../pagina/AlertsMap";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";

export default function AlertsContent() {
  type AlertaDeVento = {
    wind: number;
    data: string;
    msg?: string;
  }

  const [arrayDados, setArrayDados] = useState<AlertaDeVento[]>([]);
  const {wind, timestamp, message} = useContext(AlertContext);

  useEffect(() => {
      if(wind < 10) {
        return;
      } else {
        const ventoAtual = {
          wind: wind,
          data: timestamp,
          msg: message
        }

        setArrayDados(a => [ventoAtual, ...a.slice(0,4)]);
      }
  }, [wind, timestamp, message]);

  function limparArray() {
    setArrayDados([]);
  }

  return(
    <AlertsMain>
      <LeftColumn>
        <AlertsFilterDiv>
          <h2>Estação da represa de Furnas</h2>
        </AlertsFilterDiv>
        <AlertsMessages>
          <h3>ALERTAS</h3>
          <button onClick={limparArray}>Limpar</button>
          {
            arrayDados.map((elem, i) => {
              return <DivMessage key={i}>
                  <p><b>{elem.msg}</b> - Velocidade do vento: {elem.wind} m/s</p>
                  <p>Horário do alerta: {elem.data}</p>
                </DivMessage>
            })
          }
        </AlertsMessages>
      </LeftColumn>
      <AlertsMapDiv>
        <AlertsMap windAvgSpeed={wind}/>
      </AlertsMapDiv>
    </AlertsMain>
  );
};

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  width: 35%;

  @media (max-width: 735px) {
    width: 100%;
  }
`;

const AlertsMain = styled.main`
  height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 735px) {
    flex-direction: column;
  }
`;

const AlertsBaseDiv = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.widgetBackground};
  margin: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const AlertsMapDiv = styled(AlertsBaseDiv)`
  position: relative;
  z-index: 1;
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
  justify-content: center;
  width: 30vw;
  height: 10vh;

  @media (max-width: 735px) {
    width: auto;
  }
`;

const AlertsMessages = styled(AlertsBaseDiv)`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 28vw;
  height: 25vh;
  padding: 1rem;
  gap: 1rem;
  
h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    margin-bottom: 0.5rem;
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 0.4rem;
    background-color: #21eb79;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #18d66b;
    }
  }

  /* Scrollbar suave */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }

  @media (max-width: 735px) {
    width: 90%;
  }
`;

const DivMessage = styled.div`
  width: 100%;
  background-color: #e3f2fd;
  padding: 1rem;
  border-left: 5px solid #2196f3;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  p {
    margin: 0.2rem 0;
    font-size: 0.95rem;
  }

  b {
    color: #0d47a1;
  }
`;