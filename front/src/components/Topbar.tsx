import styled from "styled-components";
import { TopbarProps } from "../types/types";
import { IonIcon } from "./Icons";
import { Icons } from "./Icons";

export default function TopBar({ helper, isNavOpen }: TopbarProps & { isNavOpen: boolean }) {
  return(
    <Upperdiv>
      <NotificationIcon>
        <IonIcon icon={Icons.notificationsCircleSharp} />
      </NotificationIcon>
      <IonIcon icon={Icons.personCircleSharp} />
      <P>Usuário</P>
      <ToggleDiv>
        <Button onClick={helper}>
          <IonIcon icon={isNavOpen ? Icons.close : Icons.menu} />
        </Button>  
      </ToggleDiv>
    </Upperdiv>
  );
}
  
const Upperdiv = styled.div`
  background-color: rgb(26, 26, 26); 
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
    height: 3rem;
    width: 3rem;
    min-width: 3rem;
  }
`;

const P = styled.p`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: rgb(25,38,53);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 3em ;
  height: 3em ;
  border: none;
  cursor: pointer; 
  padding: 0.3rem 0;
  color: white;

  &:hover {
    background-color: rgb(45,58,73);
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const ToggleDiv = styled.div`
  margin-right: auto;
  border-right: solid white;
  padding-right: 1rem;
`;

const NotificationIcon = styled.div`
  margin-left: 1rem;
`;