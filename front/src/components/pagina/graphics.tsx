import { useState } from "react";
import styled from "styled-components";
import Graficsmodels from "./graphicsmodel";
import NavbarPI from "../perfil/NavbarPI";
import Footer from "../pagina/Footer";

export default function Grafics(){

  const [selectedStation, setSelectedStation] = useState<
    "station1" | "station2" | "station3" | ""
  >("");

  const [selectedChart, setSelectedChart] = useState<
    "maxVel" | "dirVel" | "vel" | "onda" | "nivel"
  >("maxVel");

  return (
    <Container>
      <NavbarPI />
      <Content>
        <Sidebar>
          <SelectGroup>
           
            <Label>Tipo de Gráfico</Label>
            <Select
              value={selectedChart}
              onChange={(e) =>
                setSelectedChart(
                  e.target.value as
                    | "maxVel"
                    | "dirVel"
                    | "vel"
                    | "onda"
                    | "nivel"
                )
              }
            >
              <option value="maxVel">Velocidade Máxima do Vento</option>
              <option value="dirVel">Direção do Vento</option>
              <option value="vel">Velocidade do Vento</option>
              
            </Select>
             {selectedStation && (
                <StationTitle>
                  {selectedStation === "station1"
                    ? "Estação 1"
                    : selectedStation === "station2"
                    ? "Estação 2"
                    : "Estação 3"
                  }
                </StationTitle>
              )}
          </SelectGroup>
        </Sidebar>
        <GraphArea>
          <Graficsmodels chartType={selectedChart} station={selectedStation} />
        </GraphArea>
      </Content>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.backgroundGradient};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.backgroundGradient};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: row;
  padding: 2rem;
  gap: 2rem;
  justify-content: space-between;
`;

const GraphArea = styled.div`
  flex: 3;
`;

const Sidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StationTitle = styled.h2`
  margin-top: 1rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-weight: bold;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const Select = styled.select`
  padding: 0.8rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.widgetBackground};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: #21eb79;
    box-shadow: 0 0 0 2px rgba(92, 246, 202, 0.3);
  }
`;
