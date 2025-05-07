import { useState } from 'react';
import { IonIcon } from './Icons';
import { Icons } from "./Icons";
import styled from "styled-components";

export default function Notificacao() {
  const [isOpen, setIsOpen] = useState(false)
  function showDropdown() {
    setIsOpen(prevState => !prevState);
  }

  return (
    <>
      <button onClick={showDropdown}>
        <IonIcon icon={Icons.notificationsCircleSharp}/>
      </button> 
      <DropdownMenu className={isOpen ? "show" : "hide"}>
        <p>Alerta de ventos fortes</p>
      </DropdownMenu>
    </>
  );
};

const DropdownMenu = styled.div`
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  &.hide {display: none;}
  &.show {display: block;}
`;