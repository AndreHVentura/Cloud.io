import styled from "styled-components";
import AlertsMap from "../pagina/AlertsMap";
import { useEffect, useState } from "react";
import Footer from "../pagina/Footer";
import NavbarPI from "../perfil/NavbarPI";


export default function AlertsContent() {
  type AlertaDeVento = {
    wind: number;
    data: string;
    msg: string;
  }

  const [windData, setWindData] = useState(0);
  const [arrayDados, setArrayDados] = useState<AlertaDeVento[]>([]);

  useEffect(() => {
    async function fetchData() {
      const dado = await fetch("http://localhost:5000/api/sensors?page=1&limit=1");
      const json = await dado.json();
      
      let windAvgSpeed = json.data[0].wind_avg
      let timestamp = json.data[0].reading_time

      setWindData(windAvgSpeed);

      if(windAvgSpeed < 10) return;

      let newMessage = "";
      if(windAvgSpeed >= 17.00) {
        newMessage = "É perigoso navegar";
      } else if(windAvgSpeed >= 10.00) {
        newMessage = "Cuidado ao navegar";
      }

      const ventoAtual = {
        wind: windAvgSpeed,
        data: timestamp,
        msg: newMessage
      }

      setArrayDados(a => [ventoAtual, ...a.slice(0,4)]);
    }

    fetchData()

    const intervalId = setInterval(() => {
      fetchData();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  function limparArray() {
    setArrayDados([]);
  }

  return (
    <>
      <Container>
        <NavbarPI />
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
                <AlertsMap windAvgSpeed={windData}/>
              </AlertsMapDiv>
            </AlertsMain>
        <Footer />
      </Container>
    </>
  );
}


const Container = styled.div`
  height: 100vh;
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

const AlertsBaseDiv = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.widgetBackground};
  margin: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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