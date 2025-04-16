import { useState } from "react";
import NavBar from "../components/Navbar";
import TopBar from "../components/Topbar";
import HomeContent from "../components/HomeContent";

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
