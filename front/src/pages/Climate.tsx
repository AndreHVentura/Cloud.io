import React, { useState } from "react";
import TempWidget from "../components/widgets/TempWidget";
import HumWidget from "../components/widgets/HumWidget";
import PressWidget from "../components/widgets/PressWidget";
import TempCabineWidget from "../components/widgets/TempCabineWidget";
import ChargeWidget from "../components/widgets/ChargeWidget";
import SolarRadiationWidget from "../components/widgets/SolarRadiationWidget";
import styled from "styled-components";
import { navigate } from "ionicons/icons";
import { useNavigate } from "react-router-dom";

export default function Climate() {

  const navigate = useNavigate()

  return (
    <Container>
      <Navbar>
        <Logo>Logo Cloud.io</Logo>
        <NavGroup>
          <NavLinks>
            <NavLink href="/graphic">Gráficos</NavLink>
            <NavLink href="/alert">Alertas</NavLink>
            <NavLink href="/climate">Clima</NavLink>
          </NavLinks>

          <AuthButtons>
            <SignIn onClick={() => navigate("/login")}>Login</SignIn>
            <SignUp onClick={() => navigate("/cadastro")}>Cadastrar</SignUp>
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
  
  &:hover {
    color: #8b5cf6;
  }
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

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;