import styled from "styled-components";
import Graficsmodels from "./graphicsmodel";
import NavbarPI from "../perfil/NavbarPI";


export default function Grafics({ background = "navblue" }){
  
    return(
    <Container>
      <NavbarPI />
      <ButtonGroup>
        <StationButton>Estação 1</StationButton>
        <StationButton>Estação 2</StationButton>
        <StationButton>Estação 3</StationButton>
      </ButtonGroup>
      <div><Graficsmodels/></div>
      {/* <div><ReservoirLevelChart/></div> */}
    </Container>
    );
}
const Container = styled.div`
  background: linear-gradient(135deg, #0e0e1a, #1f1f2e);
  color: white;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  gap: 2rem;
`;

const StationButton = styled.button`
  background-color: #8b5cf6;
  color: white;
  border: 2px solid #6d28d9;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: #6d28d9;
    transform: scale(1.05);
  }
`;
