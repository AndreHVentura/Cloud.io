import React, { useState } from "react";
import TempWidget from "../components/widgets/TempWidget";
import HumWidget from "../components/widgets/HumWidget";
import PressWidget from "../components/widgets/PressWidget";
import TempCabineWidget from "../components/widgets/TempCabineWidget";
import ChargeWidget from "../components/widgets/ChargeWidget";
import SolarRadiationWidget from "../components/widgets/SolarRadiationWidget";
import styled from "styled-components";
import NavBar from "../components/perfil/Navbar";
import TopBar from "../components/perfil/Topbar";


export default function Dados() {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => setIsNavOpen(!isNavOpen);

    return (
        <>
            <NavBar isOpen={isNavOpen} />
            <TopBar helper={toggleNav} isNavOpen={isNavOpen} />
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
        </>
    );
}

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

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;