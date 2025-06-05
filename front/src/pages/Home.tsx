import { useState } from "react";
import NavBar from "../components/perfil/Navbar";
import TopBar from "../components/perfil/Topbar";
import HomeContent from "../components/perfil/HomeContent";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
      <>
        <NavBar isOpen={isNavOpen} />
        <TopBar helper={toggleNav} isNavOpen={isNavOpen} />
        <HomeContent />
      </>
  );
}
