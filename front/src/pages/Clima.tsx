import { useState } from "react";
import NavBar from "../components/perfil/Navbar";
import TopBar from "../components/perfil/Topbar";
import ClimaContent from "../components/perfil/ClimaContent";

export default function Clima() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
      <>
        <NavBar isOpen={isNavOpen} />
        <TopBar helper={toggleNav} isNavOpen={isNavOpen} />
        <ClimaContent />
      </>
  );
}
