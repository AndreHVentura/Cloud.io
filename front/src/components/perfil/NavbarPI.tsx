import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ImgLogo from "../../logo/icone-nuvem.png"

export default function NavbarPI() {
  return (
    <Navbar>
      <img src={ImgLogo} alt="logo" width={"45rem"} height={"45rem"}/>
      <NavGroup>
        <NavLinks>
          <PagISNavLink to="/graphic">Gráficos</PagISNavLink>
          <PagISNavLink to="/alert">Alertas</PagISNavLink>
          <PagISNavLink to="/climate">Clima</PagISNavLink>
        </NavLinks>

        <AuthButtons>
          <BotaoLogin to="/login">Login</BotaoLogin>
          <BotaoCadastro to="/cadastro">Cadastrar</BotaoCadastro>
        </AuthButtons>
      </NavGroup>
    </Navbar>
  );
};

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  width: 100%;
  height: 4rem;
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
    color: #8b5cf6;
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
    color: #8b5cf6
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