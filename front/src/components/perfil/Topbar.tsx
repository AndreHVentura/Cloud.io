import styled from "styled-components";
import { motion } from "framer-motion";
import { IonIcon } from './Icons';
import { Icons } from "./Icons";
import Notificacao from "./Notificacao";
import UsuarioDropdown from "./UsuarioDropdown"; // Importar o componente que criamos
import { useAuth } from "../../contexts/AuthContext";

const Path = (props: any) => (
  <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="white"
      strokeLinecap="round"
      {...props}
  />
);

export default function TopBar({ helper, isNavOpen }: { helper: () => void, isNavOpen: boolean }) {
  const { user } = useAuth();

  return(
      <Upperdiv>
          <NotificationIcon>
            <Notificacao />
          </NotificationIcon>
          <UsuarioDropdown /> {/* Adicionar o dropdown do usuário */}
          <P>{user?.name}</P>
          <ToggleDiv>
            <MenuToggle toggle={helper} isOpen={isNavOpen} />
          </ToggleDiv>
      </Upperdiv>
  );
}

const MenuToggle = ({ toggle, isOpen }: { toggle: () => void, isOpen: boolean }) => (
  <Button onClick={toggle}>
      <svg width="2em" height="2em" viewBox="0 0 23 23">
          <Path
              variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" }
              }}
              animate={isOpen ? "open" : "closed"}
          />
          <Path
              d="M 2 9.423 L 20 9.423"
              variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
              }}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.1 }}
          />
          <Path
              variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" }
              }}
              animate={isOpen ? "open" : "closed"}
          />
      </svg>
  </Button>
);

const Upperdiv = styled.div`
  background-color: #191919; 
  height: 3rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
  color: white;
  padding: 0 1rem;
  position: relative;
  z-index: 3;
`;

const IonStyledIcon = styled(IonIcon)`
  font-size: 2rem;
  margin-left: 1rem;
  margin-right: 0.5rem;
`;

const P = styled.p`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: #191919;
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
    background-color: #373739;
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
  padding-top: 4px;
  margin-left: 1rem;
`;
