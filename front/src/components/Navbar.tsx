import styled from "styled-components";
import { NavbarProps } from "../types/types";
import { NavLink } from "react-router-dom";
import { IonIcon } from "./Icons";
import { Icons } from "./Icons";

export default function NavBar({ state }: NavbarProps) {
    return (
      <Nav className={state}>
        <Ul>
        <li>
            <NavLink to="/home">
              <IonIcon icon={Icons.home} />
              <span>Início</span>
            </NavLink>  
          </li>
          <li>
            <NavLink to="/alerts">
              <IonIcon icon={Icons.warning} />
              <span>Alertas</span>
            </NavLink>    
          </li>
          <li>
            <NavLink to="/history">
              <IonIcon icon={Icons.time} />
              <span>Histórico</span>
            </NavLink>  
          </li>
          <li>
            <NavLink to="/settings">
              <IonIcon icon={Icons.settingsSharp} />
              <span>Configurações</span>
            </NavLink>  
          </li>
          
          {/* Novos itens na parte inferior */}
          <BottomLinks>
            <li>
              <NavLink to="/about">
                <IonIcon icon={Icons.informationCircle} />
                <span>Sobre</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout">
                <IonIcon icon={Icons.logOut} />
                <span>Sair</span>
              </NavLink>
            </li>
          </BottomLinks>
        </Ul>
      </Nav>
    );
}

const Nav = styled.nav`
  padding-top: 3rem;
  height: 100vh;
  position: fixed;
  background-color: rgb(26, 26, 26); 
  transition: width 200ms ease;
  z-index: 2;
  
  &.open {
    width: 15rem;
  }
  &.close {
    width: 0;
    pointer-events: none;

    ul {
      display: none;
    }
  }
`;

const Ul = styled.ul`
  list-style: none;
  padding: 3%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  & li {
    width: 100%;
  }
  & a {
    display: flex;
    align-items: center;
    height: 3rem;
    text-decoration: none;
    color: white;
    filter: grayscale(50%) opacity(0.7);
    transition: 400ms
  }
  & a:hover {
    filter: grayscale(0%) opacity(1);
    background-color: rgb(33, 54, 77);
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: white;
  } 
  & span {
    margin-left: 1rem;
  }
  & svg {
    height: 3rem; 
    width: 3rem;
    min-width: 3rem;
    margin: 0 1rem;
  }
`;

const BottomLinks = styled.div`
  margin-top: auto;
  width: 100%;
  padding-bottom: 3rem;
`;