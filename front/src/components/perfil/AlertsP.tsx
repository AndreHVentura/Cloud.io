import styled from "styled-components";
import AlertsMap from "../pagina/AlertsMap";
import { useNavigate } from "react-router-dom";
// import AlertsMap from "./AlertsMap";

export default function AlertsP() {
  const navigate = useNavigate();
  return(
    <Container>
      <Navbar>
        <Logo>Logo Cloud.io</Logo>
        <NavGroup>
          <NavLinks>
            <NavLink href="/grafic">Gráficos</NavLink>
            <NavLink href="/alert">Alertas</NavLink>
            <NavLink href="#">Clima</NavLink>
          </NavLinks>

          <AuthButtons>
            <SignIn  onClick={() => navigate("/login")}>Login</SignIn>
            <SignUp onClick={() => navigate("/cadastro")}>Cadastrar</SignUp>
          </AuthButtons>
        </NavGroup>
      </Navbar>
    <AlertsMain>
      <AlertsFilterDiv>meteorológica</AlertsFilterDiv>
      <AlertsMessages>Dados da estação dentro do raio de atividade</AlertsMessages>
      <AlertsMapDiv>
        <AlertsMap />
      </AlertsMapDiv>
    </AlertsMain>
    </Container>
  );
};

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
  width: 35%;
  height: 46%;

  @media (max-width: 735px) {
    width: auto;
  }
`;

const AlertsMessages = styled(AlertsBaseDiv)`
  width: 35%;
  height: 46%;

  @media (max-width: 735px) {
    width: auto;
  }
`;
