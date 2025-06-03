import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AccessibilityMenu from "../pagina/AccessibilityMenu";
import Logo_minimalista from "../../logo/Logo_minimalista.png";

export default function NavbarPI({ background = "transparent" }) {
  return (
    <Navbar style={{ backgroundColor: background }}>
      <img src={Logo_minimalista} alt="logo" width={"150px"} height={"150px"} />
      <NavGroup>
        <NavLinks>
          <AccessibilityMenu />
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
  );
}

// Styled components
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0rem;
  width: 100%;
  height: 4rem;
  background-color: inherit; /* Herda da prop inline */
`;

const NavGroup = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const PagISNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    color: #57C785;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
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
    color: #57C785;
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
    color: #57C785;
  }
`;
