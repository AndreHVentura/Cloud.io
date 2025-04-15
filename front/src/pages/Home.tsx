import { useState } from "react";
import NavBar from "../components/Navbar";
import TopBar from "../components/Topbar";
import HomeContent from "../components/HomeContent";

export default function Home() {
  const [isActive, setIsActive] = useState<string>("close");
  const toggle = () => {
    setIsActive(prev => prev === "close" ? "open" : "close");
  };

  return (
    <>
      <NavBar state={isActive} />
      <TopBar helper={toggle} />
      <HomeContent />
    </>
  );
}
