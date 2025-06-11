import { motion, AnimatePresence } from "framer-motion"
import { NavLink } from "react-router-dom"
import { Icons, IonIcon } from "./Icons"
import styled from "styled-components"

export default function NavBar({ isOpen }: { isOpen: boolean }) {
  const sidebar = {
    open: {
      clipPath: `circle(150% at 40px 40px)`,
      transition: {
        type: "spring",
        mass: 10,
        damping: 20
      }
    },
    closed: {
      clipPath: "circle(0px at 40px 40px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }

  const item = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0,
      x: -50,
      transition: { duration: 0.2 } 
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Background
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <NavContainer
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div 
          className="sidebar"
          variants={sidebar}
        />
        
        <AnimatePresence>
          {isOpen && (
            <NavContent>
              <motion.div variants={item}>
                <NavLink to="/clima">
                  <IonStyledIcon icon={Icons.partlySunny} />
                  <span>Clima</span>
                </NavLink>
              </motion.div>
              <motion.div variants={item}>
                <NavLink to="/grafico">
                  <IonStyledIcon icon={Icons.statsChart} />
                  <span>Gráficos</span>
                </NavLink>
              </motion.div>

              <motion.div variants={item}>
                <NavLink to="/alerts">
                  <IonStyledIcon icon={Icons.warning} />
                  <span>Alertas</span>
                </NavLink>
              </motion.div>

              <motion.div variants={item}>
                <NavLink to="/history">
                  <IonStyledIcon icon={Icons.time} />
                  <span>Histórico</span>
                </NavLink>
              </motion.div>

            </NavContent>
          )}
        </AnimatePresence>
      </NavContainer>
    </>
  )
}

const Background = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  z-index: 2;

  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #1f1f2e;
  }
`

const NavContent = styled.div`
  position: relative;
  padding: 3rem 1rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-bottom: 0.5rem;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`

const IonStyledIcon = styled(IonIcon)`
  font-size: 1.5em;
  margin-left: 0em;
  margin-right: 1rem;
`;
