import { useEffect, useRef, useState } from "react";
import { IonIcon } from "./Icons";
import { Icons } from "./Icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
  import { useAuth } from "../../contexts/AuthContext"; 

export default function UsuarioDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownBtn = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();


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

  return (
    <>
      <DropdownBtn
        onClick={() => setIsOpen((prevState) => !prevState)}
        ref={dropdownBtn}
      >
        <IonIcon icon={Icons.personCircleSharp} />
        <span>{user?.nome}</span> {/* ou user?.name, depende do que você está armazenando */}
      </DropdownBtn>
      <DropdownMenu className={isOpen ? "show" : "hide"} ref={dropdownRef}>
        <MenuItem>
          <IonIcon icon={Icons.home} /> <span>Meu Perfil</span>
        </MenuItem>
        <MenuItem onClick={() => navigate("/settings")}>
          <IonIcon icon={Icons.settingsSharp} /> <span>Configurações</span>
        </MenuItem>
        <MenuItem>
          <IonIcon icon={Icons.logOut} /> <span>Sair</span>
        </MenuItem>
      </DropdownMenu>
    </>
  );
}

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
  botton: 100px;
  right: 3rem;
  top: 2.7rem;
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
