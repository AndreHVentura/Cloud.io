import { useState } from "react";
import NavBar from "../components/Navbar";
import Topbar from "../components/Topbar";
import MainContent from "../components/Maincontent";

export default function Home() {
  const [isActive, setIsActive] = useState<string>("close");
  const toggle = () => {
    if(isActive === "close") {
      setIsActive("open")
    } else {
      setIsActive("close")
    }
  }

  return (
    <>
      <NavBar state={isActive}/>
      <Topbar helper={toggle}/>
      <MainContent />
    </>
  );
};
