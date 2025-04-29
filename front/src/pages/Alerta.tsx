import { useState } from "react";
import NavBar from "../components/perfil/Navbar";
import TopBar from "../components/perfil/Topbar";
import AlertsContent from "../components/perfil/AlertsContent";

export default function Alerta() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => setIsNavOpen(!isNavOpen);

    return (
        <>
            <NavBar isOpen={isNavOpen} />
            <TopBar helper={toggleNav} isNavOpen={isNavOpen} />
            <AlertsContent />
        </>
    );
}