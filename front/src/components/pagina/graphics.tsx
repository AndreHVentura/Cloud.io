import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Graficsmodels from "./graphicsmodel";
import Logo_minimalista from "../../logo/Logo_minimalista.png";

export default function Grafics({ background = "navblue" }){
  
    return(
    <Container>
      <Navbar style={{ backgroundColor: background }}>
        <img src={Logo_minimalista} alt="logo" width={"200px"} height={"200px"} />
        <NavGroup>
          <NavLinks>
            <PagISNavLink to="/homepage">Início</PagISNavLink>
            <PagISNavLink to="/climate">Clima</PagISNavLink>
            <PagISNavLink to="/alert">Alertas</PagISNavLink>
            <PagISNavLink to="/graphic">Gráficos</PagISNavLink>
          </NavLinks>

          <AuthButtons>
            <BotaoLogin to="/login">Login</BotaoLogin>
            <BotaoCadastro to="/cadastro">Cadastrar</BotaoCadastro>
          </AuthButtons>
        </NavGroup>
      </Navbar>
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

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
`;

const PagISNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    color: #8b5cf6;
  }
`;

const BotaoLogin = styled(NavLink)`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  padding-top: 8px;
  transition: 0.3s;

  &:hover {
    color: #8b5cf6;
  }
`;

const BotaoCadastro = styled(NavLink)`
  background: transparent;
  border: 1px solid white;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;

  &:hover {
    background: white;
    color: #0e0e1a;
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;


const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
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
