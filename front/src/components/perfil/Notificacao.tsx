import { useContext, useEffect, useRef, useState } from "react";
import { IonIcon } from "./Icons";
import { Icons } from "./Icons";
import styled from "styled-components";
import { AlertContext } from "../../contexts/AlertContext";

export default function Notificacao() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownBtn = useRef<HTMLButtonElement>(null);

  const {wind, hasNotif, setHasNotif} = useContext(AlertContext);

  useEffect(() => {
    function clickOutside(event: MouseEvent) {
      if (
        dropdownBtn.current &&
        !dropdownBtn.current.contains(event.target as Node)
      ) {
        if (
          isOpen &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen]);

  function updateState() {
    setIsOpen((prevState) => !prevState);
    if (!isOpen) {
      setHasNotif(false);
    }
  }
  
  return (
    <>
      <DropdownBtn
        onClick={updateState}
        ref={dropdownBtn}
      >
        <IonIcon icon={Icons.notificationsCircleSharp} />
        <RedDot className={hasNotif ? "show" : "hide"}>1</RedDot>
      </DropdownBtn>
      <DropdownMenu className={isOpen ? "show" : "hide"} ref={dropdownRef}>
        <MenuItem>
          {
            wind >= 17
            ? <><IonIcon icon={Icons.warning} /><span>Alerta de ventos fortes</span></>
            : wind >= 10
              ? <><IonIcon icon={Icons.warning} /><span>Ventos de média intensidade</span></>
              : <span>Tudo bem por enquanto</span>
          }
        </MenuItem>
      </DropdownMenu>
    </>
  );
}

const RedDot = styled.span`
  &.show {
    position: absolute;
    top: 5px;
    right: 7px;
    padding: 1px 5px;
    border-radius: 50%;
    background: red;
  }

  &.hide {
    display: none;
  }
`;

const DropdownBtn = styled.button`
  display: inline-block;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  & ion-icon {
    display: block;
    width: 2rem;
    height: 2rem;
    color: white;
  }

  &:hover ion-icon {
    color: #aaa; /* Cor ao passar o mouse */
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  background-color: #333; /* Fundo escuro */
  min-width: 200px;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease-out;

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &.hide {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #444; /* Cor de fundo ao passar o mouse */
  }

  ion-icon {
    margin-right: 10px;
    font-size: 1.2rem;
  }

  span {
    font-size: 1rem;
  }
`;
