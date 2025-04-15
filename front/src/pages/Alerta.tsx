import { useState } from "react";
import NavBar from "../components/Navbar";
import TopBar from "../components/Topbar";
import AlertsContent from "../components/AlertsContent";

export default function Alerta() {
  const [isActive, setIsActive] = useState<string>("close");
  const toggle = () => {
    setIsActive(prev => prev === "close" ? "open" : "close");
  };

  return (
    <>
      <NavBar state={isActive} />
      <TopBar helper={toggle} />
      <AlertsContent />
    </>
  );  
};
