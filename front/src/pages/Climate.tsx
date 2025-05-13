import React, { useState, } from "react";
import TempWidget from "../components/widgets/TempWidget";
import HumWidget from "../components/widgets/HumWidget";
import PressWidget from "../components/widgets/PressWidget";
import TempCabineWidget from "../components/widgets/TempCabineWidget";
import ChargeWidget from "../components/widgets/ChargeWidget";
import SolarRadiationWidget from "../components/widgets/SolarRadiationWidget";
import styled from "styled-components";
import { navigate } from "ionicons/icons";
import { NavLink } from "react-router-dom";
import Logo_minimalista from "../logo/Logo_minimalista.png";

export default function Climate({ background = "navblue" }) {

  return (
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
      <Main>
        <MainDiv>
          <WidgetsContainer>
            <TempWidget />
            <HumWidget />
            <PressWidget />
            <TempCabineWidget />
            <ChargeWidget />
            <SolarRadiationWidget />
          </WidgetsContainer>
        </MainDiv>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  background: linear-gradient(135deg, #0e0e1a, #1f1f2e);
  color: white;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;


const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: whitesmoke;
`;

const MainDiv = styled.div`
  max-width: 1200px;
  width: 100%;
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

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;