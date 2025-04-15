import styled from "styled-components";
import { TopbarProps } from "../types/types";
import { Link } from "react-router-dom";

export default function TopBar({ helper }: TopbarProps) {
    return(
      <Upperdiv>
        <Link to="/settings">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
        </Link>  
        <P>Usuário</P>
        <ToggleDiv>
          <Button onClick={helper}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
          </Button>  
        </ToggleDiv>
      </Upperdiv>
    );
  }
  
const Upperdiv = styled.div`
  background-color: rgb(25,38,53); 
  height: 3rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
  color: white;
  padding: 0 1rem;
  position: relative;
  z-index: 3;

  & svg {
    height: 1.5rem;
    width: 1.5rem;
    min-width: 3rem;
  }
`;

const P = styled.p`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: rgb(25,38,53);
  border: none;
  cursor: pointer; 
  padding: 0.3rem 0;

  &:hover {
    background-color: rgb(45,58,73)
  }
`;

const ToggleDiv = styled.div`
  margin-right: auto;
  border-right: solid white;
  padding-right: 1rem;
`;
