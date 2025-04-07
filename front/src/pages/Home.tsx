import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BsFillHouseFill, BsBellFill, BsCalendarFill, BsFillGearFill } from "react-icons/bs"

export default function Home() {
  return (
    <NavBar />
  );
};

function NavBar() {
    return (
      <Nav>
        <Ul>

          <li>
            <NavLink to="/">
              <BsFillHouseFill />
              <span>Início</span>
            </NavLink>  
          </li>
          <li>
            <NavLink to="/">
              <BsBellFill />
              <span>Alertas</span>
            </NavLink>    
          </li>
          <li>
            <NavLink to="/">
              <BsCalendarFill />
              <span>Histórico</span>
            </NavLink>  
          </li>
          <li>
            <NavLink to="/">
              <BsFillGearFill />
              <span>Configurações</span>
            </NavLink>  
          </li>

        </Ul>
      </Nav>
    );
}

const Nav = styled.nav`
  width: 5rem;
  height: 100vh;
  position: fixed;
  background-color: rgb(25,38,53); 
  transition: width 200ms ease;

  &:hover {
    width: 15rem;
  }

  &:hover span {
    display: block;
  }
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
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
    height: 5rem;
    text-decoration: none;
    color: white;
    filter: grayscale(100%) opacity(0.7);
    transition: 400ms
  }

  & a:hover {
    filter: grayscale(0%) opacity(1);
    background-color: rgb(11, 17, 24);
    color: white;
  } 

  & span {
    display: none;
    margin-left: 1rem;
  }

  & svg {
    color: skyblue;
    height: 1.5rem; 
    width: 1.5rem;
    min-width: 3rem;
    margin: 0 1rem;
  }
`;
// rgb(53,74,97)
