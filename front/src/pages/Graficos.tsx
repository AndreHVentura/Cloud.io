import { useState } from "react";
import NavBar from "../components/perfil/Navbar";
import TopBar from "../components/perfil/Topbar";
import GraficsContent from "../components/perfil/GraficoContent";

export default function Grafico() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
      <>
        <NavBar isOpen={isNavOpen} />
        <TopBar helper={toggleNav} isNavOpen={isNavOpen} />
        <GraficsContent />
      </>
  );
}
