import styled from "styled-components";
import ReservoirLevelChart from "../../graficos/ReservoirlevelChart";
import WeatherDashboard from "../WeatherDashboard";

export default function Grafics(){
    return(
    <Container>
      <Navbar>
        <Logo>Logo Cloud.io</Logo>
        <NavGroup>
          <NavLinks>
            <NavLink href="/grafic">Gráficos</NavLink>
            <NavLink href="#">Alertas</NavLink>
            <NavLink href="#">Clima</NavLink>
          </NavLinks>

          <AuthButtons>
            <SignIn>Login</SignIn>
            <SignUp>Cadastrar</SignUp>
          </AuthButtons>
        </NavGroup>
      </Navbar>
      <ButtonGroup>
        <StationButton>Estação 1</StationButton>
        <StationButton>Estação 2</StationButton>
        <StationButton>Estação 3</StationButton>
      </ButtonGroup>
      <div><WeatherDashboard/></div>
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

const NavGroup = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SignIn = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const SignUp = styled.button`
  background: transparent;
  border: 1px solid white;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: white;
    color: #0e0e1a;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    color: #8b5cf6;
  }
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
