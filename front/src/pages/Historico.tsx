import { useState } from "react";
import NavBar from "../components/Navbar";
import Topbar from "../components/Topbar";
import styled from "styled-components";
import { ButtonGroup, Container, StyledTable } from "../styles/historico";

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
        <Container>
      <ButtonGroup>
        <button id="e1">Estação 1</button>
        <button id="e2">Estação 2</button>
        <button id="e3">Estação 3</button>
        <button id="filter">Filtro</button>
      </ButtonGroup>

      <StyledTable>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Temp_C</th>
            <th>Hum_%</th>
            <th>Press_Bar</th>
            <th>TempCabine_C</th>
            <th>Charge</th>
            <th>SR_Wm2</th>
            <th>WindPeak_ms</th>
            <th>WindSpeed_Avg</th>
            <th>WindDir_Inst</th>
            <th>WindDir_Avg</th>
            <th>Wave_height</th>
            <th>Data</th>
        {/* <th>Hora</th>
            <th>Temperatura (°C)</th>
            <th>Umidade (%)</th>
            <th>Pressão (Bar)</th>
            <th>Temp. da Cabine (°C)</th>
            <th>Carga</th>
            <th>Radiação Solar (W/m²)</th>
            <th>Pico de Vento (m/s)</th>
            <th>Vel. Média do Vento (m/s)</th>
            <th>Dir. Inst. do Vento</th>
            <th>Dir. Média do Vento</th>
            <th>Altura da Onda</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td id="Date"></td>
            <td id="Time"></td>
            <td id="Temp_C"></td>
            <td id="Hum_%"></td>
            <td id="Press_Bar"></td>
            <td id="TempCabine_C"></td>
            <td id="Charge"></td>
            <td id="SR_Wm2"></td>
            <td id="WindPeak_ms"></td>
            <td id="WindSpeed_Avg"></td>
            <td id="WindDir_Inst"></td>
            <td id="WindDir_Avg"></td>
            <td id="Wave_height"></td> */}
          </tr>
        </tbody>
      </StyledTable>
    </Container>
        </>
    )
}
