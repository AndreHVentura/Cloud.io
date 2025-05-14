import { useEffect, useRef, useState } from 'react';
import { IonIcon } from './Icons';
import { Icons } from "./Icons";
import styled from "styled-components";

export default function Notificacao() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function clickOutside(event) {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    }
  }, [isOpen, dropdownRef]);

  return (
    <>
      <DropdownBtn onClick={() => setIsOpen(prevState => !prevState)}>
        <IonIcon icon={Icons.notificationsCircleSharp}/>
      </DropdownBtn> 
      <DropdownMenu className={isOpen ? "show" : "hide"} ref={dropdownRef}>
        <p>Alerta de ventos fortes</p>
      </DropdownMenu>
    </>
  );
};

const DropdownBtn = styled.button`
  display: inline-block;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;

  & ion-icon {
    display: block;
    width: 2rem;
    height: 2rem;
    color: white;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  background-color: white;
  min-width: 150px;
  min-height: 200px;
  padding: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;

  &.hide {display: none;}
  &.show {display: block;}

  & p {color: black;}
`;