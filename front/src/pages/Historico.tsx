import { useState } from "react";
import NavBar from "../components/Navbar";
import Topbar from "../components/Topbar";

export default function Historico(){
    const [isActive, setIsActive] = useState<string>("close");
      const toggle = () => {
        setIsActive(prev => prev === "close" ? "open" : "close");
      };
    return(
        <>
        <NavBar state={isActive} />
        <Topbar helper={toggle} />
        {/* <>Graficos com registros meterologicos do dia ,com filtro para registros passados</> */}
        <br></br>
        <button id="e1">Estação 1</button>
        <button id="e2">Estação 2</button>
        <button id="e3">Estação 3</button>
        <button id="filter">Filtro</button>
        <div id="Date">Date</div>
        <div id="Time">Time</div>
        <div id="Temp_C">Temp_C</div>
        <div id="Hum_%">Hum_%</div>
        <div id="Press_Bar">Press_Bar</div>
        <div id="TempCabine_C">TempCabine_C</div>
        <div id="Charge">Charge</div>
        <div id="SR_Wm2">SR_Wm2</div>
        <div id="WindPeak_ms">WindPeak_ms</div>
        <div id="WindSpeed_Avg">WindSpeed_Avg</div>
        <div id="WindDir_Inst">WindDir_Inst</div>
        <div id="WindDir_Avg">WindDir_Avg</div>
        <div id="Wave_height">Wave_height</div>
        </>
    )
}