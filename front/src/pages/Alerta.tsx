import { useState } from "react";
import NavBar from "../components/Navbar";
import TopBar from "../components/Topbar";
import AlertsContent from "../components/AlertsContent";

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